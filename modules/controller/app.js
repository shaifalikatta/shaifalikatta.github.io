


var hbd = angular.module('hbd',['ui.router','oc.lazyLoad', 'firebase']);

//,'ngStorage', 'angularModalService']

hbd.config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.hashPrefix(''); //to remove ! mark after #

    $urlRouterProvider.otherwise('/countdown');

    $stateProvider
        .state('root',{
            abstract:true,
            url:"",
            views: {
                'main': {
                    templateUrl: "modules/views/layout.html",
                    controller:'appCtrl',
                    controllerAs:'app'
                }
            },
            resolve:{
                myController:['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load("modules/controller/app-controller.js");
                }]
            }
        })
        .state('root.countdown',{
            url:"/countdown",
            views: {
                'content': {
                    templateUrl: "../modules/views/countdown.html"
                }
            }
        })
        .state('root.sendWish',{
            url:"/sendWish",
            views: {
                'content': {
                    templateUrl: "../modules/views/send-wish.html"
                }
            }
        })
        .state('root.wishes',{
            url:"/wishes",
            views: {
                'content': {
                    templateUrl: "../modules/views/wishes.html"
                }
            }
        })
    ;
    // use the HTML5 History API
    // $locationProvider.html5Mode(true);

});
