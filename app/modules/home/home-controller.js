
class HomeController {

    constructor(HomeService){
        this.HomeService = HomeService;
    }

    sayHello(){
        this.HomeService.getGreeting(this.name).then(greeting => this.greeting = greeting);
    }

}

HomeController.$inject = ['HomeService'];

export default HomeController;