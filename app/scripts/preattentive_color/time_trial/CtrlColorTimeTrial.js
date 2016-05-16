'use strict';

angular.module('infoVisU2App')
    .controller('CtrlColorTimeTrial', CtrlColorTimeTrial);

CtrlColorTimeTrial.$inject = ['$scope', '$log', '$timeout'];
function CtrlColorTimeTrial($scope, $log, $timeout){
    var self = this;
    self.init = init;

    init();

    function init(){
        self.distance = 25;
        self.level = [];
        self.boxLevel = ["30%", "60%", "100%"];
        self.currLevel = 1;

        $scope.$on('canvas-size', function (event, result) {
            getLevel(result);
            
            self.maxPosX = self.level[self.currLevel].maxPosX - (self.distance*2);
            self.maxPosY = self.level[self.currLevel].maxPosY - (self.distance*2);
            self.box = self.boxLevel[self.currLevel];
            self.shapePosition = generateShape(self.maxPosX, self.maxPosY);

            $log.info(self.level);
            $log.info("Max Size X=%s & Y=%s", self.maxPosX, self.maxPosY);
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
    
    function generateShape(maxPosX, maxPosY){
        var shapePosition = [];
        var randomX = Math.ceil(Math.random() * (maxPosX/self.distance)) * self.distance;
        var randomY = Math.ceil(Math.random() * (maxPosY/self.distance)) * self.distance;
        var randomAnswer = Math.ceil(Math.random() * 2); $log.info("Answer: " + randomAnswer);
        for(var i=0; i<maxPosX; i+=self.distance){
            for(var j=0; j<maxPosY; j+=self.distance){
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

    function getLevel(result){
            var maxPosX = result[0];
            var maxPosY = result[1];

            self.level.push({"maxPosX": Math.ceil((30*maxPosX)/100), "maxPosY": Math.ceil((30*maxPosY)/100)});
            self.level.push({"maxPosX": Math.ceil((60*maxPosX)/100), "maxPosY": Math.ceil((60*maxPosY)/100)});
            self.level.push({"maxPosX": ((100*maxPosX)/100), "maxPosY": ((100*maxPosY)/100)});
    }
}
