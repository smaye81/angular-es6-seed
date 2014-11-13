function HomeController(HomeService) {

    this.HomeService = HomeService;

    this.forOfGenerator = function* () {

        yield "abc";
        yield 123;
        yield ["1", "2", "3"];
        yield {"one" : 1, "two" : 2};
    };

    // Generator function
    this.run = function* (x) {
        "use strict";

        // x is whatever was passed to run initially at this point
        // the yield statement will yield out the value of x + 1 to the first it.next

        // Whatever is passed into the next it.next will replace this yield statement and
        //  get multiplied by 2 and set to y

        // Code stops here after the first call to it.next() and resumes upon the second call to it.next()
        var y = 2 * (yield (x + 1));


        // Yields out the value of y / 3 as the return value to the second it.next

        // Whatever is passed into the next it.next will replace this yield statement and
        //  get set to z

        // Code stops here after the second call to it.next() and resumes upon the third call to it.next()
        var z = yield (y / 3);


        // Will return the computed values of x, y, and z (the statements for yield do not change the values)
        //  In other words, x + 1 did not increment the function-local value of x by 1
        return (x + y + z);
    }
}

HomeController.prototype.sayHello = function () {

    // Note 'this' for greeting is bound to this object using lexical scope
    this.HomeService.getGreeting(this.name).then(greeting => this.greeting = greeting);
};

HomeController.prototype.forOf = function () {

    // Prints out the yielded value of each yield statement
    //  Note that we can't use this when you need to pass a value back since there is no exposed next()
    for (let v of this.forOfGenerator()) {
        console.log(v);
    }
};

HomeController.prototype.generator  = function () {

    var it = this.run(7);

    var one = it.next();

    console.log("First call to it.next() should return 8: " + one.value);

    var two = it.next(3);

    console.log("Second call to it.next() should return 2: " + two.value);

    var three = it.next(8);

    console.log("Third call to it.next() should return 21: " + three.value);
};

export var HomeController = ['HomeService', HomeController];