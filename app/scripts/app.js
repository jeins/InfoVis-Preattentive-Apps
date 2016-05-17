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
  .config(['$routeProvider', '$logProvider', '$provide', function ($routeProvider, $logProvider, $provide) {
      // Setup Logging/Debug
      $logProvider.debugEnabled(false);

      $provide.decorator('$log', function ($delegate) {
          var origInfo = $delegate.info, origLog = $delegate.log,
              origError = $delegate.error, origWarn = $delegate.warn;

          $delegate.info = function () {if ($logProvider.debugEnabled()) origInfo.apply(null, arguments)};
          $delegate.log = function () {if ($logProvider.debugEnabled()) origLog.apply(null, arguments)};
          $delegate.error = function () {if ($logProvider.debugEnabled()) origError.apply(null, arguments)};
          $delegate.warn = function () {if ($logProvider.debugEnabled()) origWarn.apply(null, arguments)};

          return $delegate;
      });
      
      // Route
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
  }]);
