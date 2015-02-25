"use strict";

System.register(["./modules/home/home", "./router"], function (_export) {
  var homeModule, Router, appModule;
  return {
    setters: [function (_modulesHomeHome) {
      homeModule = _modulesHomeHome.homeModule;
    }, function (_router) {
      Router = _router.Router;
    }],
    execute: function () {
      appModule = angular.module("App", ["ui.router", homeModule.name]);

      appModule.config(Router);
    }
  };
});