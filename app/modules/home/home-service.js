HomeService.$inject = ['$q'];

function HomeService ($q) {

    "use strict";

    this.getGreeting = function (name = "Noname McDefault") {

        return $q(resolve => resolve(`Hello, ${name}.  Welcome to Angular in ES6!!`));
    };
}

export var HomeService = HomeService;