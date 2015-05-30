System.register([], function (_export) {
    var HomeController;

    function HomeController(HomeService) {

        "use strict";

        this.HomeService = HomeService;

        this.forOfGenerator = regeneratorRuntime.mark(function callee$1$0() {
            return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
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
            }, callee$1$0, this);
        });

        // Generator function
        this.run = regeneratorRuntime.mark(function callee$1$1(x) {
            var y, z;
            return regeneratorRuntime.wrap(function callee$1$1$(context$2$0) {
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
            }, callee$1$1, this);
        });
    }

    return {
        setters: [],
        execute: function () {
            "use strict";

            HomeController.$inject = ["HomeService"];HomeController.prototype.sayHello = function () {
                var _this = this;

                "use strict";

                // Note 'this' for greeting is bound to this object using lexical scope
                this.HomeService.getGreeting(this.name).then(function (greeting) {
                    return _this.greeting = greeting;
                });
            };

            HomeController.prototype.forOf = function () {

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
            };

            HomeController.prototype.generator = function () {

                "use strict";

                var it = this.run(7);

                var one = it.next();

                console.log("First call to it.next() should return 8: " + one.value);

                var two = it.next(3);

                console.log("Second call to it.next() should return 2: " + two.value);

                var three = it.next(8);

                console.log("Third call to it.next() should return 21: " + three.value);
            };

            HomeController = HomeController;

            _export("HomeController", HomeController);
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