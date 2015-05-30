import homeModule from './modules/home/home';
import Config from './config';

var appModule = angular.module("App", ["ui.router", homeModule.name]);

appModule.config(Config);

