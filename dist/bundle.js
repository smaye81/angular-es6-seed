"format register";
(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function dedupe(deps) {
    var newDeps = [];
    for (var i = 0, l = deps.length; i < l; i++)
      if (indexOf.call(newDeps, deps[i]) == -1)
        newDeps.push(deps[i])
    return newDeps;
  }

  function register(name, deps, declare, execute) {
    if (typeof name != 'string')
      throw "System.register provided no module name";
    
    var entry;

    // dynamic
    if (typeof declare == 'boolean') {
      entry = {
        declarative: false,
        deps: deps,
        execute: execute,
        executingRequire: declare
      };
    }
    else {
      // ES6 declarative
      entry = {
        declarative: true,
        deps: deps,
        declare: declare
      };
    }

    entry.name = name;
    
    // we never overwrite an existing define
    if (!defined[name])
      defined[name] = entry; 

    entry.deps = dedupe(entry.deps);

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }

  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      
      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;
      
      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {
        
        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;
      exports[name] = value;

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          var importerIndex = indexOf.call(importerModule.dependencies, module);
          importerModule.setters[importerIndex](exports);
        }
      }

      module.locked = false;
      return value;
    });
    
    module.setters = declaration.setters;
    module.execute = declaration.execute;

    if (!module.setters || !module.execute)
      throw new TypeError("Invalid System.register form for " + entry.name);

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = { 'default': depEntry.module.exports, __useDefault: true };
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);
    
      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);
    
    if (output)
      module.exports = output;
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    var module = entry.declarative ? entry.module.exports : { 'default': entry.module.exports, '__useDefault': true };

    // return the defined module object
    return modules[name] = module;
  };

  return function(main, declare) {

    var System;

    // if there's a system loader, define onto it
    if (typeof System != 'undefined' && System.register) {
      declare(System);
      System['import'](main);
    }
    // otherwise, self execute
    else {
      declare(System = {
        register: register, 
        get: load, 
        set: function(name, module) {
          modules[name] = module; 
        },
        newModule: function(module) {
          return module;
        },
        global: global 
      });
      System.set('@empty', System.newModule({}));
      load(main);
    }
  };

})(typeof window != 'undefined' ? window : global)
/* ('mainModule', function(System) {
  System.register(...);
}); */

('app', function(System) {

System.register("modules/home/home-controller", [], function(_export) {
  var _createClass,
      _classCallCheck,
      HomeController;
  return {
    setters: [],
    execute: function() {
      "use strict";
      _createClass = (function() {
        function defineProperties(target, props) {
          for (var key in props) {
            var prop = props[key];
            prop.configurable = true;
            if (prop.value)
              prop.writable = true;
          }
          Object.defineProperties(target, props);
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      HomeController = (function() {
        function HomeController(HomeService) {
          _classCallCheck(this, HomeController);
          this.HomeService = HomeService;
        }
        _createClass(HomeController, {
          forOfGenerator: {value: regeneratorRuntime.mark(function forOfGenerator() {
              return regeneratorRuntime.wrap(function forOfGenerator$(context$2$0) {
                while (1)
                  switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                      context$2$0.next = 2;
                      return "abc";
                    case 2:
                      context$2$0.next = 4;
                      return 123;
                    case 4:
                      context$2$0.next = 6;
                      return ["1", "2", "3"];
                    case 6:
                      context$2$0.next = 8;
                      return {
                        one: 1,
                        two: 2
                      };
                    case 8:
                    case "end":
                      return context$2$0.stop();
                  }
              }, forOfGenerator, this);
            })},
          run: {value: regeneratorRuntime.mark(function run(x) {
              var y,
                  z;
              return regeneratorRuntime.wrap(function run$(context$2$0) {
                while (1)
                  switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                      context$2$0.next = 2;
                      return x + 1;
                    case 2:
                      context$2$0.t0 = context$2$0.sent;
                      y = 2 * context$2$0.t0;
                      context$2$0.next = 6;
                      return y / 3;
                    case 6:
                      z = context$2$0.sent;
                      return context$2$0.abrupt("return", x + y + z);
                    case 8:
                    case "end":
                      return context$2$0.stop();
                  }
              }, run, this);
            })},
          sayHello: {value: function sayHello() {
              var _this = this;
              "use strict";
              this.HomeService.getGreeting(this.name).then(function(greeting) {
                return _this.greeting = greeting;
              });
            }},
          forOf: {value: function forOf() {
              "use strict";
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;
              try {
                for (var _iterator = this.forOfGenerator()[Symbol.iterator](),
                    _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var v = _step.value;
                  console.log(v);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }},
          generator: {value: function generator() {
              "use strict";
              var it = this.run(7);
              var one = it.next();
              console.log("First call to it.next() should return 8: " + one.value);
              var two = it.next(3);
              console.log("Second call to it.next() should return 2: " + two.value);
              var three = it.next(8);
              console.log("Third call to it.next() should return 21: " + three.value);
            }}
        });
        return HomeController;
      })();
      HomeController.$inject = ["HomeService"];
      _export("default", HomeController);
    }
  };
});

System.register("modules/home/home-service", [], function(_export) {
  var _createClass,
      _classCallCheck,
      HomeService;
  return {
    setters: [],
    execute: function() {
      "use strict";
      _createClass = (function() {
        function defineProperties(target, props) {
          for (var key in props) {
            var prop = props[key];
            prop.configurable = true;
            if (prop.value)
              prop.writable = true;
          }
          Object.defineProperties(target, props);
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      HomeService = (function() {
        function HomeService($q) {
          _classCallCheck(this, HomeService);
          this.$q = $q;
        }
        _createClass(HomeService, {getGreeting: {value: function getGreeting() {
              var name = arguments[0] === undefined ? "Noname McDefault" : arguments[0];
              return this.$q(function(resolve) {
                return resolve("Hello, " + name + ".  Welcome to Angular in ES6!!");
              });
            }}});
        return HomeService;
      })();
      HomeService.$inject = ["$q"];
      _export("default", HomeService);
    }
  };
});

System.register("router", [], function(_export) {
  var Router;
  function Router($stateProvider, $urlRouterProvider) {
    "use strict";
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state("home", {
      url: "/home",
      controller: "HomeCtrl as homeCtrl",
      templateUrl: "modules/home/home.html"
    }).state("details", {
      url: "/details",
      controller: "DetailsCtrl as detailsCtrl",
      templateUrl: "modules/home/details.html"
    });
  }
  return {
    setters: [],
    execute: function() {
      "use strict";
      Router.$inject = ["$stateProvider", "$urlRouterProvider"];
      Router = Router;
      _export("Router", Router);
    }
  };
});

System.register("modules/home/home", ["modules/home/home-controller", "modules/home/home-service"], function(_export) {
  var HomeController,
      HomeService,
      homeModule;
  return {
    setters: [function(_homeController) {
      HomeController = _homeController["default"];
    }, function(_homeService) {
      HomeService = _homeService["default"];
    }],
    execute: function() {
      "use strict";
      homeModule = angular.module("Home", []);
      homeModule.controller("HomeCtrl", HomeController);
      homeModule.service("HomeService", HomeService);
      _export("default", homeModule);
    }
  };
});

System.register("app", ["modules/home/home", "router"], function(_export) {
  var homeModule,
      Router,
      appModule;
  return {
    setters: [function(_modulesHomeHome) {
      homeModule = _modulesHomeHome["default"];
    }, function(_router) {
      Router = _router.Router;
    }],
    execute: function() {
      "use strict";
      appModule = angular.module("App", ["ui.router", homeModule.name]);
      appModule.config(Router);
    }
  };
});

});