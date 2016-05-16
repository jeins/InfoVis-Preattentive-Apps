'use strict';

angular.module('infoVisU2App')
    .directive('drtvCanvas', drtvCanvas);

drtvCanvas.$inject = ['$timeout'];
function drtvCanvas($timeout){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.ready(function () {
                var height,
                    width;
                $timeout(function () {
                    height = element[0].offsetHeight;
                    width = element[0].offsetWidth;
                    scope.$broadcast("canvas-size", [width, height]);
                });
            });
        }
    }
}
