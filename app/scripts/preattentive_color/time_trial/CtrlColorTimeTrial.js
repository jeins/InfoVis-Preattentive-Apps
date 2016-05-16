'use strict';

angular.module('infoVisU2App')
    .controller('CtrlColorTimeTrial', CtrlColorTimeTrial);

CtrlColorTimeTrial.$inject = ['$scope', '$log'];
function CtrlColorTimeTrial($scope, $log){
    var self = this;
    self.init = init;

    init();

    function init(){
        self.distance = 25;
        $scope.$on('canvas-size', function (event, result) {
            self.maxPosX = result[0]-(self.distance*2);
            self.maxPosY = result[1]-(self.distance*2);
            self.shapePosition = generateShape();
        });
        
        $scope.$on('pressed-key', function(event, result){
            $log.info("Key Pressed: " + result + " " +self.answer);
            if((result == "right" && self.answer == "present") || (result == "left" && self.answer == "absent")){
                $log.info("Answer Correct!")
            } else {
                $log.info("Answer Wrong!")
            }
        });
    }
    
    function generateShape(){
        var shapePosition = [];
        var randomX = Math.ceil(Math.random() * (self.maxPosX/self.distance)) * self.distance;
        var randomY = Math.ceil(Math.random() * (self.maxPosY/self.distance)) * self.distance;
        var randomAnswer = Math.ceil(Math.random() * 2); console.log(randomAnswer);
        for(var i=0; i<self.maxPosX; i+=self.distance){
            for(var j=0; j<self.maxPosY; j+=self.distance){
                if(randomAnswer == 1){
                    if(i == randomX && j == randomY) {
                        shapePosition.push({"shape": "circle", "x": i, "y": j, "color": "red"});
                        self.answer = "present";
                    }
                    else {
                        shapePosition.push({"shape": "circle", "x": i, "y": j, "color": "green"});
                    }
                } else{
                    shapePosition.push({"shape": "circle", "x": i, "y": j, "color": "green"});
                    self.answer = "absent";
                }
            }
        }
        return shapePosition;
    }
}
