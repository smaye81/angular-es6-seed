
class HomeService {

    constructor($q){
        this.$q = $q;
    }

    getGreeting(name = "Noname McDefault"){
        return this.$q(resolve => resolve(`Hello, ${name}.  Welcome to Angular in ES6!!`));
    }

}

HomeService.$inject = ['$q'];

export default HomeService;