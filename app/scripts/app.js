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
          .when('/colors/time-trial', {
              templateUrl: 'scripts/preattentive_color/time_trial/view.html',
              controller: 'CtrlColorTimeTrial',
              controllerAs: 'vm'
          })
          .when('/colors/short-visible', {
              templateUrl: 'scripts/preattentive_color/short_visible/view.html',
              controller: 'CtrlColorShortVisible',
              controllerAs: 'vm'
          })
          .otherwise({
              redirectTo: '/'
          });
  });
