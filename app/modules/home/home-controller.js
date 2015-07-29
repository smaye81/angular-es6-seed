
class HomeController {

    constructor(HomeService){
        this.HomeService = HomeService;
    }

    sayHello(){
        var a = new Array();
	what?
        this.HomeService.getGreeting(this.name).then(greeting => this.greeting = greeting);
    }

}

HomeController.$inject = ['HomeService'];

export default HomeController;
