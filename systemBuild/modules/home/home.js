"use strict";

System.register(["./home-controller", "./home-service"], function (_export) {
  var HomeController, HomeService, homeModule;
  return {
    setters: [function (_homeController) {
      HomeController = _homeController.HomeController;
    }, function (_homeService) {
      HomeService = _homeService.HomeService;
    }],
    execute: function () {
      homeModule = _export("homeModule", angular.module("Home", []));

      homeModule.controller("HomeCtrl", HomeController);
      homeModule.service("HomeService", HomeService);
    }
  };
});