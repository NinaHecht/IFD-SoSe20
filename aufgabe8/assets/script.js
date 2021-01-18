const video = document.getElementById('360_video');
var mailContent= "";

var Artyom = new Artyom();
var firststart=true;

function startContinuousArtyom() {
    Artyom.fatality();
    setTimeout(function () {
        Artyom.initialize({
            lang: "de-DE",
            continuous: true,
            listen: true,
            interimResults: false,
            debug: true,
        }).then(function () {
            console.log('started');
            Artyom.addCommands(play);
            Artyom.addCommands(mail);
            if(firststart){
                video.play();
                firststart = false;
            }
        });
    }, 250);
}

function mailWindow() {
    Artyom.emptyCommands();
    Artyom.addCommands(play);
    document.getElementById('mail').setAttribute('visible', 'true');

    Artyom.redirectRecognizedTextOutput(function(recognized,isFinal){
        if(isFinal){
            console.log("Final recognized text: " + recognized);
            document.getElementById('content').setAttribute('value', recognized);
            Artyom.fatality();
            startContinuousArtyom();
            Artyom.addCommands(mail);
        }
    });
}

startContinuousArtyom();

var play = [
    {
        smart:true, 
        indexes:["* play", "play *"],
        action:function(i,wildcard){
            console.log("play");
            video.play();
            document.getElementById('play').setAttribute('visible', 'true');
            setTimeout(function(){document.getElementById('play').setAttribute('visible', 'false');}, 3000)
        }
    },
    {
        indexes:["play"],
        action:function(){
            console.log("play");
            video.play();
            document.getElementById('play').setAttribute('visible', 'true');
            setTimeout(function(){document.getElementById('play').setAttribute('visible', 'false');}, 3000)
        }
    },
    {
        smart:true, 
        indexes:["* pause", "pause *"],
        action:function(i,wildcard){
            console.log("pause");
            video.pause();
            document.getElementById('pause').setAttribute('visible', 'true');
            setTimeout(function(){document.getElementById('pause').setAttribute('visible', 'false');}, 3000)
        }
    },
    {
        indexes:["pause"],
        action:function(){
            console.log("pause");
            video.pause();
            document.getElementById('pause').setAttribute('visible', 'true');
            setTimeout(function(){document.getElementById('pause').setAttribute('visible', 'false');}, 3000)
        }
    }
]; 

var mail = [
    {
        smart:true, 
        indexes:["* E-Mail", "E-Mail *", "* Mail", "Mail *"],
        action:function(i,wildcard){
            console.log("mail");
            mailWindow();
        }
    },
    {
        indexes:["E-Mail", "Mail"],
        action:function(){
            console.log("mail");
            mailWindow();
        }
    },
    {
        indexes:["Send", "Send E-Mail", "Send Mail", "Senden", "Absenden"],
        action:function(){
            console.log("send");
            document.getElementById('content').setAttribute('value', '');
            document.getElementById('mail').setAttribute('visible', 'false');
        }
    }
];