export function HomeController(HomeService) {

    this.location = HomeService.getLocation();
}
