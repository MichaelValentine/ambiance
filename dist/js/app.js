;(function (angular, undefined) {
    angular.module("ambiance", ["ui.router", "ui.bootstrap", "ngCookies"]);


    angular.module("ambiance").config(["$locationProvider", function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
    }]);

    angular.module("ambiance").run([
        "$rootScope",
        "$state",
        "$stateParams",
        "$urlRouter",
        "$http",
        function($rootScope, $state, $stateParams, $urlRouter, $http) {
            var firstTime = true;

            $rootScope.$on("$stateChangeSuccess", function() {
            });
            $rootScope.$on("$stateChangeStart", function(event, to) {
            });

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

        }
    ]);

    angular.module("ambiance").provider("routes", [
        "$stateProvider",
        "$urlMatcherFactoryProvider",
        function($stateProvider, $urlMatcherFactoryProvider) {

            $urlMatcherFactoryProvider.strictMode(false);

            $stateProvider
                .state("splash", {
                    controller: "splashCtrl",
                    url: "/",
                    templateUrl: "dist/partials/splash.html",
                    cache: false
                })
                .state("search", {
                    controller: "searchCtrl",
                    url: "/search",
                    templateUrl: "dist/partials/search.html",
                    cache: false
                })
                .state("search", {
                    controller: "searchCtrl",
                    url: "/search",
                    templateUrl: "dist/partials/search.html",
                    cache: false
                })
                .state("searchby", {
                    controller: "searchCtrl",
                    url: "/search/by",
                    templateUrl: "dist/partials/searchby.html",
                    cache: false
                });

            // This initializes our provider
            return { $get: function() {} };
        }]);

    angular.module("ambiance").controller("splashCtrl",  [
        "$rootScope",
        "$state",
        "$timeout",
        "$scope",
        "API",
        function($rootScope,$state,$timeout, $scope, API){
            // default globals
            $rootScope.title = 'Ambiance';
            $scope.foo="bar";

            $scope.changeState=function(state){
                $state.go(state);
            };
        }
    ]);

    angular.module("ambiance").controller("searchCtrl",  [
        "$rootScope",
        "$state",
        "$timeout",
        "$scope",
        "API",
        function($rootScope,$state,$timeout, $scope, API){
            // default globals
            $rootScope.title = 'Search';

            $scope.changeState=function(state){
                $state.go(state);
            };
        }
    ]);
    angular.module("ambiance").factory("API", [
        "$http",
        function($http) {
            var apiLocation = 'http://localcalhost:49997';
            return {
            };
        }
    ]);
})(window.angular);