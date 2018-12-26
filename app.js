var app = angular.module('myApp', ["ngRoute"]);

app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: "home.html",
            controller: "myCtrl"
        })
        .otherwise({
            redirectTo: '/'
        });

});