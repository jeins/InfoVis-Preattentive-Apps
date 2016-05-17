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
              templateUrl: 'views/home/home.html',
              controller: 'CtrlHome',
              controllerAs: 'vm'
          })
          .when('/colors/time-trial', {
              templateUrl: 'views/preattentive_color/time_trial.html',
              controller: 'CtrlColorTimeTrial',
              controllerAs: 'vm'
          })
          .when('/colors/short-visible', {
              templateUrl: 'views/preattentive_color/short_visible.html',
              controller: 'CtrlColorShortVisible',
              controllerAs: 'vm'
          })
          .when('/shapes/time-trial', {
              templateUrl: 'views/preattentive_shape/time_trial.html',
              controller: 'CtrlShapeTimeTrial',
              controllerAs: 'vm'
          })
          .when('/shapes/short-visible', {
              templateUrl: 'views/preattentive_shape/short_visible.html',
              controller: 'CtrlShapeShortVisible',
              controllerAs: 'vm'
          })
          .when('/conjunction/time-trial', {
              templateUrl: 'views/preattentive_conjunction/time_trial.html',
              controller: 'CtrlConjunctionTimeTrial',
              controllerAs: 'vm'
          })
          .when('/conjunction/short-visible', {
              templateUrl: 'views/preattentive_conjunction/short_visible.html',
              controller: 'CtrlConjunctionShortVisible',
              controllerAs: 'vm'
          })
          .otherwise({
              redirectTo: '/'
          });
  });
