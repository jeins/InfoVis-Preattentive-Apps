'use strict';

angular.module('infoVisU2App')
    .controller('CtrlColorTimeTrial', CtrlColorTimeTrial);

CtrlColorTimeTrial.$inject = ['$scope', '$log', '$interval'];
function CtrlColorTimeTrial($scope, $log, $interval){
    var self = this;
    self.init = init;
    self.startGame = startGame;

    init();

    function init(){
        self.distance = 25;
        self.level = [];
        self.boxLevel = ["30%", "60%", "100%"];
        self.currLevel = 0;
        self.isGameStart = false;
        self.isCounterStart = false;
        self.isGameEnd = false;
        self.timeStart = 0;
        self.timeStop = 0;
        self.message = ["Where is the red circle?", "Now with more distractors...", "Added even more disctractors..."];
        self.saveGameInfo = [];
        self.canvasColor = "white";

        $scope.$on('canvas-size', function (event, result) {
            getLevel(result);
            generateShape();
            $log.info(self.level);
        });
        
        $scope.$on('pressed-key', function(event, result){
            $log.info("Key Pressed: " + result + " " +self.answer);
            if(self.isGameStart){
                self.timeStop = new Date().getTime();
                var execTime = self.timeStop - self.timeStart;

                if((result == "right" && self.answer == "present") || (result == "left" && self.answer == "absent")){
                    $log.info("Answer Correct!");
                    displayAnswer("Correct! Execute Time: " + execTime + " ms");
                    self.saveGameInfo.push({"level": self.currLevel, "answer": "Correct", "execTime": execTime});
                    self.canvasColor = "green";
                } else {
                    displayAnswer("Ups, Wrong! Execute Time: " + execTime + " ms");
                    $log.info("Answer Wrong!");
                    self.saveGameInfo.push({"level": self.currLevel, "answer": "Wrong", "execTime": execTime});
                    self.canvasColor = "red";
                }
                self.isGameStart = false;
                self.timerCount = "";
                self.currLevel += 1;

                if(self.currLevel < 3){
                    generateShape();
                }
            }
        });
    }

    function startGame(){
        self.isCounterStart = true;
        var c = 10;
        var timer = $interval(function(){
            if(c%10 == 0) self.timerCount = c/10;
            if(c == 50) self.timerCount = "Start";
            if(c == 60){
                self.timerCount = "";
                timer = stopTimer(timer);
                self.isGameStart = true;
                self.timeStart = new Date().getTime();
            }
            c++;
        }, 60);
    }

    function displayAnswer(answer){
        var c = 10;
        var timer = $interval(function(){
            self.timerCount = answer;
            if(c == 60){
                self.canvasColor = "white";
                timer = stopTimer(timer);
                self.timerCount = "";
                self.isCounterStart = false;
                if(self.currLevel > 2){
                    self.isGameEnd = true;
                }
            }
            c++;
        }, 60);
    }

    function stopTimer(timer){
        if(angular.isDefined(timer)){
            $interval.cancel(timer);
            return undefined;
        }
    }
    
    function generateShape(){
        self.maxPosX = self.level[self.currLevel].maxPosX - (self.distance*2);
        self.maxPosY = self.level[self.currLevel].maxPosY - (self.distance*2);
        self.box = self.boxLevel[self.currLevel];

        var shapePosition = [];
        var randomX = Math.ceil(Math.random() * (self.maxPosX/self.distance)) * self.distance;
        var randomY = Math.ceil(Math.random() * (self.maxPosY/self.distance)) * self.distance;
        var randomAnswer = Math.ceil(Math.random() * 2); $log.info("Answer: " + randomAnswer);
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
        self.shapePosition = shapePosition;
    }

    function getLevel(result){
        var maxPosX = result[0];
        var maxPosY = result[1];

        self.level.push({"maxPosX": Math.ceil((30*maxPosX)/100), "maxPosY": Math.ceil((30*maxPosY)/100)});
        self.level.push({"maxPosX": Math.ceil((60*maxPosX)/100), "maxPosY": Math.ceil((60*maxPosY)/100)});
        self.level.push({"maxPosX": ((100*maxPosX)/100), "maxPosY": ((100*maxPosY)/100)});
    }
}
