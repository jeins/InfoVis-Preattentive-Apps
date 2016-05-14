'use strict';

angular.module('infoVisU2App')
    .controller('CtrlHome', CtrlHome);

CtrlHome.$inject = ['$scope'];
function CtrlHome($scope){
    $scope.hallo = "HelloWorld";
    $scope.key = function($event){
        if ($event.keyCode == 39)
            $scope.$broadcast('pressed-key', 'right');
        else if ($event.keyCode == 37)
            $scope.$broadcast('pressed-key', 'left');
    }
}
