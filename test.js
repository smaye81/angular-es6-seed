System.register("app/modules/home/home", [], function() {
  "use strict";
  var __moduleName = "app/modules/home/home";
  var homeModule = angular.module("Home", []);
  return {get homeModule() {
      return homeModule;
    }};
});
System.register("app/app", [], function() {
  "use strict";
  var __moduleName = "app/app";
  var homeModule = System.get("app/modules/home/home").homeModule;
  var appModule = angular.module("App", ["ui.router"]);
  return {};
});
System.get("app/app" + '');
