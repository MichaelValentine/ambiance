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

            $rootScope.changeState=function(state){
                $state.go(state);
            };

            $rootScope.friendList = ['Bob Burger', 'Sally Sue', 'Michel Valentine', "Yuriy Krushelnytskiy"];

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
                .state("meet", {
                    controller: "meetCtrl",
                    url: "/meet",
                    templateUrl: "dist/partials/meet.html",
                    cache: false
                })
                .state("meet.me", {
                    controller: "meetCtrl",
                    url: "/me",
                    templateUrl: "dist/partials/meetMeForm.html",
                    cache: false
                })
                .state("meet.me.view", {
                    controller: "meetCtrl",
                    url: "/view",
                    templateUrl: "dist/partials/meetMeView.html",
                    cache: false
                })
                .state("searchby", {
                    controller: "searchByCtrl",
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


    angular.module("ambiance").controller("meetCtrl",  [
        "$rootScope",
        "$state",
        "$timeout",
        "$scope",
        "API",
        function($rootScope,$state,$timeout, $scope, API){
            // default globals
            $rootScope.title = 'Meet Up';

            console.log($state);
            if($state.is('meet.me.view')){
                $scope.inviteList = angular.copy($scope.$parent.inviteList);
                $scope.formData = angular.copy($scope.$parent.formData);
            }
            else if($state.is('meet')){

            }
            else{
                $scope.friendList = angular.copy($rootScope.friendList);
                $scope.inviteList = [];
                $scope.formData = {};
            }


            $scope.importLocation= function(){
                $scope.formData.location = "Henry's Tavern"
            };

            $scope.changeStateWithData = function(state){
                $state.go(state, {location:false});
            };

            $scope.moveToList = function(i){
                $scope.inviteList.push($scope.friendList.splice(i, 1)[0]);
            };

            $scope.removeFromList = function(i){
                $scope.friendList.push($scope.inviteList.splice(i, 1)[0]);
            };

            $scope.validTime = function(){
                return /^([0-1][0-9]|2[0-4]):[0-5][0-9]$/i.test($scope.formData.time);
            };

            $scope.validDate = function(){
                console.log($scope.formData.date);
                return /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/.test($scope.formData.date);
            };

            $scope.changeState=function(state){
                $state.go(state, {location:false});
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