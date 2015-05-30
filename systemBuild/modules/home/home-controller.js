System.register([], function (_export) {
    var _createClass, _classCallCheck, HomeController;

    return {
        setters: [],
        execute: function () {
            "use strict";

            _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

            HomeController = (function () {
                function HomeController(HomeService) {
                    _classCallCheck(this, HomeController);

                    this.HomeService = HomeService;
                }

                _createClass(HomeController, {
                    forOfGenerator: {
                        value: regeneratorRuntime.mark(function forOfGenerator() {
                            return regeneratorRuntime.wrap(function forOfGenerator$(context$2$0) {
                                while (1) switch (context$2$0.prev = context$2$0.next) {
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
                                        return { one: 1, two: 2 };

                                    case 8:
                                    case "end":
                                        return context$2$0.stop();
                                }
                            }, forOfGenerator, this);
                        })
                    },
                    run: {

                        // Generator function

                        value: regeneratorRuntime.mark(function run(x) {
                            var y, z;
                            return regeneratorRuntime.wrap(function run$(context$2$0) {
                                while (1) switch (context$2$0.prev = context$2$0.next) {
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
                        })
                    },
                    sayHello: {
                        value: function sayHello() {
                            var _this = this;

                            "use strict";

                            // Note 'this' for greeting is bound to this object using lexical scope
                            this.HomeService.getGreeting(this.name).then(function (greeting) {
                                return _this.greeting = greeting;
                            });
                        }
                    },
                    forOf: {
                        value: function forOf() {
                            "use strict";

                            // Prints out the yielded value of each yield statement
                            //  Note that we can't use this when you need to pass a value back since there is no exposed next()
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = this.forOfGenerator()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                        }
                    },
                    generator: {
                        value: function generator() {
                            "use strict";

                            var it = this.run(7);

                            var one = it.next();

                            console.log("First call to it.next() should return 8: " + one.value);

                            var two = it.next(3);

                            console.log("Second call to it.next() should return 2: " + two.value);

                            var three = it.next(8);

                            console.log("Third call to it.next() should return 21: " + three.value);
                        }
                    }
                });

                return HomeController;
            })();

            HomeController.$inject = ["HomeService"];

            _export("default", HomeController);
        }
    };
});

// x is whatever was passed to run initially at this point
// the yield statement will yield out the value of x + 1 to the first it.next

// Whatever is passed into the next it.next will replace this yield statement and
//  get multiplied by 2 and set to y

// Code stops here after the first call to it.next() and resumes upon the second call to it.next()

// Yields out the value of y / 3 as the return value to the second it.next

// Whatever is passed into the next it.next will replace this yield statement and
//  get set to z

// Code stops here after the second call to it.next() and resumes upon the third call to it.next()

// Will return the computed values of x, y, and z (the statements for yield do not change the values)
//  In other words, x + 1 did not increment the function-local value of x by 1