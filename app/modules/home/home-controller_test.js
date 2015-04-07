// Describe the Context for your tests
describe('Home Controller Tests', function () {

    var sut;

    beforeEach(function () {
        module(homeModule.name);
    });

    beforeEach(function () {

        module(function ($provide) {
            $provide.value("HomeService", {
                getLocation : jasmine.createSpy("HomeService getLocation")
            });

            $provide.value("$state", {});
        })
    });

    beforeEach(function () {

        inject(function ($controller, _$rootScope_) {
            sut = $controller("HomeCtrl", {
                $scope : _$rootScope_
            })
        })
    });

    it('should be defined', function () {
        expect(sut).toBeDefined();
    })
});