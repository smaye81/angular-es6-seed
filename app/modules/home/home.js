export var homeModule = angular.module("Home", []);

import HomeController from "./home-controller";
import HomeService from "./home-service";

homeModule.controller("HomeCtrl", HomeController);
homeModule.service("HomeService", HomeService);
