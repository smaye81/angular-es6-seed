System.register("../modules/home/home-controller", [], function() {
  "use strict";
  var __moduleName = "../modules/home/home-controller";
  function HomeController(HomeService) {
    this.HomeService = HomeService;
  }
  HomeController.prototype.sayHello = function() {
    var $__0 = this;
    this.HomeService.getGreeting(this.name).then((function(greeting) {
      return $__0.greeting = greeting;
    }));
  };
  var HomeController = ['HomeService', HomeController];
  return {get HomeController() {
      return HomeController;
    }};
});
System.register("../modules/home/home-service", [], function() {
  "use strict";
  var __moduleName = "../modules/home/home-service";
  function HomeService($q) {
    this.getGreeting = function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "Noname McDefault";
      return $q((function(resolve) {
        return resolve("Hello, " + name + ".  Welcome to Angular in ES6!!");
      }));
    };
  }
  var HomeService = ['$q', HomeService];
  return {get HomeService() {
      return HomeService;
    }};
});
System.register("../modules/home/home", [], function() {
  "use strict";
  var __moduleName = "../modules/home/home";
  var homeModule = angular.module("Home", []);
  var HomeController = System.get("../modules/home/home-controller").HomeController;
  var HomeService = System.get("../modules/home/home-service").HomeService;
  homeModule.controller("HomeCtrl", HomeController);
  homeModule.service("HomeService", HomeService);
  return {get homeModule() {
      return homeModule;
    }};
});
System.register("../router", [], function() {
  "use strict";
  var __moduleName = "../router";
  function Router($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state('home', {
      url: "/home",
      controller: "HomeCtrl as homeCtrl",
      templateUrl: "modules/home/home.html"
    }).state('details', {
      url: "/details",
      controller: "DetailsCtrl as detailsCtrl",
      templateUrl: "modules/home/details.html"
    });
  }
  var Router = ['$stateProvider', '$urlRouterProvider', Router];
  return {get Router() {
      return Router;
    }};
});
System.register("../app", [], function() {
  "use strict";
  var __moduleName = "../app";
  var homeModule = System.get("../modules/home/home").homeModule;
  var Router = System.get("../router").Router;
  var appModule = angular.module("App", ["ui.router", homeModule.name]);
  appModule.config(Router);
  return {};
});
System.get("../app" + '');
