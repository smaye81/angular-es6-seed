"use strict";

System.register([], function (_export) {
    var HomeService;
    function HomeService($q) {

        this.getGreeting = function () {
            var name = arguments[0] === undefined ? "Noname McDefault" : arguments[0];

            return $q(function (resolve) {
                return resolve("Hello, " + name + ".  Welcome to Angular in ES6!!");
            });
        };
    }

    return {
        setters: [],
        execute: function () {
            HomeService = _export("HomeService", ["$q", HomeService]);
        }
    };
});