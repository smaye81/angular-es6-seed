"use strict";

System.register([], function (_export) {
    var HomeController;
    function HomeController(HomeService) {

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
                        "use strict";

                        context$2$0.next = 3;
                        return x + 1;

                    case 3:
                        context$2$0.t0 = context$2$0.sent;
                        y = 2 * context$2$0.t0;
                        context$2$0.next = 7;
                        return y / 3;

                    case 7:
                        z = context$2$0.sent;
                        return context$2$0.abrupt("return", x + y + z);

                    case 9:
                    case "end":
                        return context$2$0.stop();
                }
            }, callee$1$1, this);
        });
    }

    return {
        setters: [],
        execute: function () {
            HomeController.prototype.sayHello = function () {
                var _this = this;

                // Note 'this' for greeting is bound to this object using lexical scope
                this.HomeService.getGreeting(this.name).then(function (greeting) {
                    return _this.greeting = greeting;
                });
            };

            HomeController.prototype.forOf = function () {

                // Prints out the yielded value of each yield statement
                //  Note that we can't use this when you need to pass a value back since there is no exposed next()
                for (var _iterator = this.forOfGenerator()[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                    var v = _step.value;

                    console.log(v);
                }
            };

            HomeController.prototype.generator = function () {

                var it = this.run(7);

                var one = it.next();

                console.log("First call to it.next() should return 8: " + one.value);

                var two = it.next(3);

                console.log("Second call to it.next() should return 2: " + two.value);

                var three = it.next(8);

                console.log("Third call to it.next() should return 21: " + three.value);
            };

            HomeController = _export("HomeController", ["HomeService", HomeController]);
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