System.register([], function (_export) {
    var _createClass, _classCallCheck, HomeService;

    return {
        setters: [],
        execute: function () {
            "use strict";

            _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

            HomeService = (function () {
                function HomeService($q) {
                    _classCallCheck(this, HomeService);

                    this.$q = $q;
                }

                _createClass(HomeService, {
                    getGreeting: {
                        value: function getGreeting() {
                            var name = arguments[0] === undefined ? "Noname McDefault" : arguments[0];

                            return this.$q(function (resolve) {
                                return resolve("Hello, " + name + ".  Welcome to Angular in ES6!!");
                            });
                        }
                    }
                });

                return HomeService;
            })();

            HomeService.$inject = ["$q"];

            _export("default", HomeService);
        }
    };
});