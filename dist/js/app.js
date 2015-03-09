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
                .state("results", {
                    controller: "resultsCtrl",
                    url: "/results",
                    templateUrl: "dist/partials/results.html",
                    cache: false
                })
                .state("rate", {
                    controller: "rateCtrl",
                    url: "/rate",
                    templateUrl: "dist/partials/rate.html",
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
                .state("meet.friend", {
                    controller: "meetCtrl",
                    url: "/friend",
                    templateUrl: "dist/partials/meetFriendList.html",
                    cache: false
                })
                .state("meet.friend.selected", {
                    controller: "meetCtrl",
                    url: "/friend/selected",
                    templateUrl: "dist/partials/meetMeView.html",
                    cache: false
                })
                .state("meet.me.view", {
                    controller: "meetCtrl",
                    url: "/view",
                    templateUrl: "dist/partials/meetMeView.html",
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

            $scope.changeStateWithPrev=function(stateTo, stateFrom){
                $rootScope.previous = stateFrom;
                $state.go(stateTo);
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
            else if($state.is('meet.friend')){
                $scope.invitedList=[{
                    name: "Mike's Birthday!"
                }]
            }
            else if($state.is('meet.friend.selected')){
                $scope.inviteList = ['Bob Burger', 'Sally Sue', 'Michel Valentine', "Yuriy Krushelnytskiy"];
                $scope.formData = {
                    name: "Mike's Bday!",
                    time: "20:00",
                    date: "04/26/1984"
                }
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

            $scope.formInfo = {};

            $scope.options = {
                ambiance:[
                    {value:'Snazzy'},
                    {value:'Quiet'},
                    {value:'Loud'},
                    {value:'Kid-friendly'},
                    {value:'Club vibe'},
                    {value:'Homey'}
                ],
                foodTheme:[
                    {value:'Thai'},
                    {value:'American'},
                    {value:'Chinese'},
                    {value:'Italian'},
                    {value:'Mexican'},
                    {value:'Seafood'},
                    {value:'Grill'}
                ],
                waiter:[
                    {value:'Snarky'},
                    {value:'Peppy'},
                    {value:'Unassuming'},
                    {value:'Attentive'},
                    {value:'Funny'}
                ],
                foodPrice:[
                    {value:'$'},
                    {value:'$$'},
                    {value:'$$$'},
                    {value:'$$$$'},
                    {value:'$$$$$'}
                ],
                drinkPrice:[
                    {value:'$'},
                    {value:'$$'},
                    {value:'$$$'},
                    {value:'$$$$'},
                    {value:'$$$$$'}
                ],
                location:[
                    {value:'Near Me'},
                    {value:'Pearl'},
                    {value:'Northeast'},
                    {value:'Southeast'},
                    {value:'Tigard'},
                    {value:'Beaverton'},
                    {value:'Downtown'}
                ],
                dietary:[
                    {value:'Gluten Free'},
                    {value:'Vegetarian'},
                    {value:'Vegan'},
                    {value:'Non-dairy Milk'}
                ],
                partySize:[
                    {value:'1-2'},
                    {value:'3-5'},
                    {value:'5-10'},
                    {value:'10-20'},
                    {value: '20+'}
                ],
                portionSize:[
                    {value:'Tapas'},
                    {value:'Minute'},
                    {value:'Small'},
                    {value:'Average'},
                    {value:'Large'},
                    {value:'Giant'},
                    {value:'Too Much'}
                ]
            };

            $scope.toggle = function(field, value){
                if(!$scope.formInfo[field]){
                    $scope.formInfo[field] = [value];
                }
                else {
                    if($scope.formInfo[field].indexOf(value) >= 0){
                        $scope.formInfo[field].splice($scope.formInfo[field].indexOf(value),1);
                    }
                    else{
                        $scope.formInfo[field].push(value);
                    }
                }
            };

            $scope.submitForm=function(state){
                $rootScope.previous = "search";
                $rootScope.searchParams = $scope.formInfo;
                $state.go('results');
            };
        }
    ]);

    angular.module("ambiance").controller("rateCtrl",  [
        "$rootScope",
        "$state",
        "$timeout",
        "$scope",
        "API",
        function($rootScope,$state,$timeout, $scope, API){
            // default globals
            $rootScope.title = 'Rate';

            $scope.options = {
                ambiance:[
                    {value:'Snazzy'},
                    {value:'Quiet'},
                    {value:'Loud'},
                    {value:'Kid-friendly'},
                    {value:'Club vibe'},
                    {value:'Homey'}
                ],
                foodTheme:[
                    {value:'Thai'},
                    {value:'American'},
                    {value:'Chinese'},
                    {value:'Italian'},
                    {value:'Mexican'},
                    {value:'Seafood'},
                    {value:'Grill'}
                ],
                waiter:[
                    {value:'Snarky'},
                    {value:'Peppy'},
                    {value:'Unassuming'},
                    {value:'Attentive'},
                    {value:'Funny'}
                ],
                foodPrice:[
                    {value:'$'},
                    {value:'$$'},
                    {value:'$$$'},
                    {value:'$$$$'},
                    {value:'$$$$$'}
                ],
                drinkPrice:[
                    {value:'$'},
                    {value:'$$'},
                    {value:'$$$'},
                    {value:'$$$$'},
                    {value:'$$$$$'}
                ],
                location:[
                    {value:'Near Me'},
                    {value:'Pearl'},
                    {value:'Northeast'},
                    {value:'Southeast'},
                    {value:'Tigard'},
                    {value:'Beaverton'},
                    {value:'Downtown'}
                ],
                dietary:[
                    {value:'Gluten Free'},
                    {value:'Vegetarian'},
                    {value:'Vegan'},
                    {value:'Non-dairy Milk'}
                ],
                partySize:[
                    {value:'1-2'},
                    {value:'3-5'},
                    {value:'5-10'},
                    {value:'10-20'},
                    {value: '20+'}
                ],
                portionSize:[
                    {value:'Tapas'},
                    {value:'Minute'},
                    {value:'Small'},
                    {value:'Average'},
                    {value:'Large'},
                    {value:'Giant'},
                    {value:'Too Much'}
                ]
            };

            $scope.places = [
                {value:"Bob's Burgers"},
                {value:"Suzie's Diner"},
                {value:"Franks Flavors"},
                {value:"Thai Peacock"}
            ];

            $scope.submitForm=function(state){
                console.log($scope.selected.value.length);
                if(typeof $scope.selected !== 'undefined' && $scope.selected.value.length > 0){
                    window.alert("Thank you for your submission!");
                    $state.go('splash');

                }
                else{
                    window.alert("Please choose a location");
                }
            };
        }
    ]);

    angular.module("ambiance").controller("resultsCtrl",  [
        "$rootScope",
        "$state",
        "$timeout",
        "$scope",
        "API",
        function($rootScope,$state,$timeout, $scope, API){
            // default globals
            $rootScope.title = 'Results';

            $scope.all = [
                {
                    name: "Henry's Tavern",
                    favorite: true,
                    lastVisited: "2/4/15",
                    waiters: ['Attentive', 'Funny'],
                    theme: ['American'],
                    ambiance: ['Quiet', 'Homey'],
                    foodPrice: ['$$$'],
                    drinkPrice: ['$$'],
                    location: ['Pearl'],
                    dietary: ['Gluten Free', 'Vegan'],
                    partySize: ['1-2', '3-5'],
                    portionSize: ["Average"]
                },
                {
                    name: "Jake's Crawfish",
                    favorite: false,
                    lastVisited: "N/A",
                    waiters: ['Peppy'],
                    theme: ['Seafood'],
                    ambiance: ['Loud'],
                    foodPrice: ['$$'],
                    drinkPrice: ['$$'],
                    location: ['Downtown'],
                    dietary: ['Non-dairy Milk'],
                    partySize: ['1-2', '3-5', '5-10'],
                    portionSize: ["Large"]
                },
                {
                    name: "Pepes",
                    favorite: true,
                    lastVisited: "10/3/13",
                    waiters: ['Attentive'],
                    theme: ['Mexiacan'],
                    ambiance: ['Homey'],
                    foodPrice: ['$$'],
                    drinkPrice: ['$'],
                    location: ['Tigard'],
                    dietary: ['Vegan', 'Vegetarian'],
                    partySize: ['1-2', '3-5'],
                    portionSize: ["Tapas"]
                },
                {
                    name: "Portland City Grill",
                    favorite: false,
                    lastVisited: "N/A",
                    waiters: ['Attentive', 'Snarky'],
                    theme: ['Grill'],
                    ambiance: ['Quiet', 'Snazzy'],
                    foodPrice: ['$$$$$'],
                    drinkPrice: ['$$$'],
                    location: ['Pearl'],
                    dietary: ['Gluten Free', 'Vegetarian', 'Vegan'],
                    partySize: ['1-2', '3-5'],
                    portionSize: ["Average"]
                },
                {
                    name: "Thai Peacock",
                    favorite: false,
                    lastVisited: "N/A",
                    waiters: ['Attentive', 'Unassuming'],
                    theme: ['Thai'],
                    ambiance: ['Quiet', 'Homey'],
                    foodPrice: ['$$'],
                    drinkPrice: ['$$'],
                    location: ['Downtown'],
                    dietary: ['Gluten Free'],
                    partySize: ['1-2', '3-5'],
                    portionSize: ["Small"]
                },
                {
                    name: "August Moon",
                    favorite: false,
                    lastVisited: "5/9/12",
                    waiters: ['Funny'],
                    theme: ['Chinese'],
                    ambiance: ['Quiet', 'Homey'],
                    foodPrice: ['$$$'],
                    drinkPrice: ['$$'],
                    location: ['Pearl'],
                    dietary: ['Gluten Free'],
                    partySize: ['1-2', '3-5'],
                    portionSize: ["Average"]
                },
                {
                    name: "Pizza Hut",
                    favorite: false,
                    lastVisited: "N/A",
                    waiters: ['Attentive'],
                    theme: ['Pizza'],
                    ambiance: ['Loud'],
                    foodPrice: ['$'],
                    drinkPrice: ['$'],
                    location: ['Downtown'],
                    dietary: ['Gluten Free'],
                    partySize: ['1-2'],
                    portionSize: ["Large"]
                }

            ];

            if($rootScope.previous == "search"){
                var searchParams = $rootScope.searchParams;
                var subList = angular.copy($scope.all);

                arrayIntersect = function(a, b)
                {
                    return jQuery.grep(a, function(i)
                    {
                        return jQuery.inArray(i, b) > -1;
                    });
                };
                for(var key in searchParams){
                    for (var slIndex = (subList.length-1); slIndex >= 0; --slIndex) {
                        if (arrayIntersect(searchParams[key], subList[slIndex][key]).length == 0) {
                            subList.splice(slIndex, 1);
                        }
                    }
                }
                $scope.toDisplay = subList;
                $scope.resultTitle = "Search Results";
            }
            else if($rootScope.previous == "favorites"){
                var subList = angular.copy($scope.all);
                for (var slIndex = (subList.length-1); slIndex >= 0; --slIndex) {
                    if (subList[slIndex].favorite == false) {
                        subList.splice(slIndex, 1);
                    }
                }
                $scope.toDisplay = subList;
                $scope.resultTitle = "Favorites";
            }
            else if($rootScope.previous == "topRated"){
                $scope.toDisplay = angular.copy($scope.all);
                $scope.resultTitle = "topRated";
            }
            else if($rootScope.previous == "supprise"){
                $scope.getRandom = function(){
                    var i = Math.floor((Math.random() * $scope.all.length));
                    $scope.toDisplay = [angular.copy($scope.all[i])];
                };
                $scope.getRandom();
                $scope.resultTitle = "Search Results";
                $scope.showRandom = true;
            }
            else{
                console.log("Error");
            }

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