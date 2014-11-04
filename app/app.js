import {homeModule} from './modules/home/home';
import {Router} from './router';

var appModule = angular.module("App", ["ui.router", homeModule.name]);

appModule.config(Router);

