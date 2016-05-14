'use strict';

/**
 * @ngdoc overview
 * @name infoVisU2App
 * @description
 * # infoVisU2App
 *
 * Main module of the application.
 */
angular
  .module('infoVisU2App', [
    'ngAnimate', 'ngAria', 'ngRoute', 'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/home/home.html',
        controller: 'CtrlHome',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
