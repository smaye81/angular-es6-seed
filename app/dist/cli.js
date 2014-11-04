System.register("../modules/home/home-controller", [], function() {
  "use strict";
  var __moduleName = "../modules/home/home-controller";
  function HomeController(HomeService) {
    this.location = HomeService.getLocation();
  }
  return {get HomeController() {
      return HomeController;
    }};
});
System.register("../modules/home/home-service", [], function() {
  "use strict";
  var __moduleName = "../modules/home/home-service";
  function HomeService() {
    this.getLocation = function() {
      return "Angular in ES6";
    };
  }
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
