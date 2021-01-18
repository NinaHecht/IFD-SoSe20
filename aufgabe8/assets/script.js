const video = document.getElementById('360_video');
function pause () {
    console.log('pause');
    video.pause();
}
function play(){
    console.log('play');
    video.play();
}

var Artyom = new Artyom();

function startContinuousArtyom() {
    Artyom.fatality();
    setTimeout(function () {
        Artyom.initialize({
            lang: "de-DE",
            continuous: true,
            listen: true,
            interimResults: false,
            // debug: true,
        }).then(function () {
            console.log('started');
            Artyom.addCommands(commands);
        });
    }, 250);
}

startContinuousArtyom();

var commands = [
    {
        smart:true, 
        indexes:["* play", "play *"],
        action:function(i,wildcard){
            console.log("play");
            play();
        }
    },
    {
        indexes:["play"],
        action:function(){
            console.log("play");
            play();
        }
    },
    {
        smart:true, 
        indexes:["* pause", "pause *"],
        action:function(i,wildcard){
            console.log("pause");
            pause();
        }
    },
    {
        indexes:["pause"],
        action:function(){
            console.log("pause");
            pause();
        }
    }
];