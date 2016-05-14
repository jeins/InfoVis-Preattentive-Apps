'use strict';

angular.module('infoVisU2App')
    .controller('CtrlHome', CtrlHome);

CtrlHome.$inject = ['$scope'];
function CtrlHome($scope){
    $scope.hallo = "HelloWorld";
}
