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
                .state("portal", {
                    controller: "portalCtrl",
                    url: "/",
                    templateUrl: "dist/partials/portal.html",
                    cache: false
                });

            // This initializes our provider
            return { $get: function() {} };
        }]);

    angular.module("ambiance").controller("portalCtrl",  [
        "$rootScope",
        "$state",
        "$timeout",
        "$scope",
        "API",
        function($rootScope,$state,$timeout, $scope, API){
            // default globals
            $rootScope.title = 'Ambiance';
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