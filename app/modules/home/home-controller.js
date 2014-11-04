function HomeController(HomeService) {

    this.HomeService = HomeService;
}

HomeController.prototype.sayHello = function () {

    // Note 'this' for greeting is bound to this object using lexical scope
    this.HomeService.getGreeting(this.name).then(greeting => this.greeting = greeting);
};

export var HomeController = ['HomeService', HomeController];