System.register(["./home-controller", "./home-service"], function (_export) {
  var HomeController, HomeService, homeModule;
  return {
    setters: [function (_homeController) {
      HomeController = _homeController["default"];
    }, function (_homeService) {
      HomeService = _homeService["default"];
    }],
    execute: function () {
      "use strict";

      homeModule = angular.module("Home", []);

      _export("homeModule", homeModule);

      homeModule.controller("HomeCtrl", HomeController);
      homeModule.service("HomeService", HomeService);
    }
  };
});