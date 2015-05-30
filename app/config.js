
class Config {

    constructor($stateProvider, $urlRouterProvider){

        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                controller : "HomeCtrl as homeCtrl",
                templateUrl: "modules/home/home.html"
            })
            .state('details', {
                url: "/details",
                controller : "DetailsCtrl as detailsCtrl",
                templateUrl: "modules/home/details.html"
            });

    }

}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

export default Config;