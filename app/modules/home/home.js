import HomeController from "./home-controller";
import HomeService from "./home-service";

var homeModule = angular.module("Home", []);

homeModule.controller("HomeCtrl", HomeController);
homeModule.service("HomeService", HomeService);

export default homeModule;
