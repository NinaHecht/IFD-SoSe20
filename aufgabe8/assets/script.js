const video = document.getElementById('360_video');
var mailContent= "";

var Artyom = new Artyom();

function startContinuousArtyom() {
    Artyom.fatality();
    setTimeout(function () {
        Artyom.initialize({
            lang: "en-GB",
            continuous: true,
            listen: true,
            interimResults: false,
            debug: true,
        }).then(function () {
            console.log('started');
            Artyom.addCommands(commands);
        });
    }, 250);
}

var MailContent = Artyom.newDictation({
    continuous: true, 
    lang: "en-GB",
    onResult:function(text){
        console.log(text);
        if(text){
            mailContent = text;
        }
    },
    onStart:function(){
        console.log("Dictation started by the user");
        document.getElementById('content').setAttribute('value', 'Jetzt diktieren (10sek)');
    },
    onEnd:function(text){
        document.getElementById('content').setAttribute('value', mailContent);
        console.log("Dictation ended");
        startContinuousArtyom();
    }
});

function mailWindow() {
    document.getElementById('mail').setAttribute('visible', 'true');
    Artyom.fatality();
    MailContent.start();
    setTimeout(function(){
        MailContent.stop();
    }, 10000)
}

startContinuousArtyom();

var commands = [
    {
        smart:true, 
        indexes:["* play", "play *"],
        action:function(i,wildcard){
            console.log("play");
            video.play();
        }
    },
    {
        indexes:["play"],
        action:function(){
            console.log("play");
            video.play();
        }
    },
    {
        smart:true, 
        indexes:["* pause", "pause *"],
        action:function(i,wildcard){
            console.log("pause");
            video.pause();
        }
    },
    {
        indexes:["pause"],
        action:function(){
            console.log("pause");
            video.pause();
        }
    },
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
        indexes:["Send", "Send E-Mail", "Send Mail"],
        action:function(){
            console.log("send");
            document.getElementById('content').setAttribute('value', '');
            document.getElementById('mail').setAttribute('visible', 'false');
        }
    }
];