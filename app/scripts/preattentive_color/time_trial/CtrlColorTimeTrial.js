'use strict';

angular.module('infoVisU2App')
    .controller('CtrlColorTimeTrial', CtrlColorTimeTrial);

CtrlColorTimeTrial.$inject = ['$scope', '$log'];
function CtrlColorTimeTrial($scope, $log){
    var self = this;
    self.init = init;

    init();

    function init(){
        $scope.$on('pressed-key', function(event, result){
           $log.info("Key Pressed: " + result);
        });
    }
}
