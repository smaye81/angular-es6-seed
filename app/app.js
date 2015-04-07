import homeModule from './modules/home/home';
import Config from './config';

var appModule = angular.module("DigiBankDevTool", ["ui.router", homeModule.name]);

appModule.config(Config);

