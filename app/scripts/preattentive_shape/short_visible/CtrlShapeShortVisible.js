'use strict';

angular.module('infoVisU2App')
    .controller('CtrlShapeShortVisible', CtrlShapeShortVisible);

CtrlShapeShortVisible.$inject = ['$scope', '$log', '$interval'];
function CtrlShapeShortVisible($scope, $log, $interval){
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
        self.message = ["Where is the square?", "Now with more distractors...", "Added even more disctractors..."];
        self.saveGameInfo = [];
        self.canvasColor = "white";
        self.hideTheShape = false;

        $scope.$on('canvas-size', function (event, result) {
            getLevel(result);
            generateShape();
            $log.info(self.level);
        });

        $scope.$on('pressed-key', function(event, result){
            $log.info("Key Pressed: " + result + " " +self.answer);
            if(self.isGameStart){
                if((result == "right" && self.answer == "present") || (result == "left" && self.answer == "absent")){
                    $log.info("Answer Correct!");
                    displayAnswer("Correct!");
                    self.saveGameInfo.push({"level": self.currLevel, "answer": "Correct"});
                    self.canvasColor = "green";
                } else {
                    displayAnswer("Ups, Wrong!");
                    $log.info("Answer Wrong!");
                    self.saveGameInfo.push({"level": self.currLevel, "answer": "Wrong"});
                    self.canvasColor = "red";
                }

                self.currLevel += 1;

                if(self.currLevel < 3){
                    generateShape();
                }
                self.hideTheShape = false;
                self.isGameStart = false;
                self.timerCount = "";
            }
        });
    }

    function startGame(){
        self.isCounterStart = true;
        self.canvasColor = "#f5f5f5";
        var c = 10;
        var timer = $interval(function(){
            if(c%10 == 0) self.timerCount = c/10;
            if(c == 50) self.timerCount = "Start";
            if(c == 60){
                timer = stopTimer(timer);
                self.timerCount = "";
                self.isGameStart = true;
                
                displayShape();
                
                $log.info("Current Level: " + self.currLevel);
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
                    $log.info(self.saveGameInfo);
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

    function displayShape(){
        var c = 0;
        var timer = $interval(function(){
            if(c == 0) {
                self.hideTheShape = false;
            }
            if(c == 20){
                self.canvasColor = "white";
                self.hideTheShape = true;
                self.timerCount = "is the square Absent or Present?";
                timer = stopTimer(timer);
            }
            c++;
        }, 10);

        $log.info("Max Size X=%s & Y=%s", self.maxPosX, self.maxPosY);
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
                        shapePosition.push({"shape": "rect", "x": i, "y": j, "color": "#383886"});
                        self.answer = "present";
                    }
                    else {
                        shapePosition.push({"shape": "circle", "x": i, "y": j, "color": "#383886"});
                    }
                } else{
                    shapePosition.push({"shape": "circle", "x": i, "y": j, "color": "#383886"});
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
