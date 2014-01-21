'use strict';

angular.module('TriMenuApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/br', {
        templateUrl: 'views/br.html',
        controller: 'BrCtrl'
      })
      .when('/hohome', {
        templateUrl: 'views/hohome.html',
        controller: 'HohomeCtrl'
      })
      .when('/RotationTest', {
        templateUrl: 'views/rotationtest.html',
        controller: 'RotationtestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
