window.addEventListener("load", function(){
    document.getElementById("start").addEventListener("click", function(){

        document.getElementById("start").remove();
        
        var Intranet = new Artyom();
        var firstLevel = true;
        var initialised = false;
        
        function startContinuousArtyom() {
            Intranet.fatality();
            setTimeout(function () {
                Intranet.initialize({
                    lang: "de-DE",
                    continuous: true,
                    listen: true,
                    interimResults: false,
                    debug: true,
                    obeyKeyword: "Hallo Intranet"
                }).then(function () {
                    console.log("Ready!");
                    firstLevel = true;
                    Intranet.addCommands(initialCommand);
                    if (!initialised) {
                        document.getElementById("main").innerHTML = 'Beginne die Unterhaltung mit <br><br> "Hallo Intranet"';
                    }
                });
            }, 250);
        }
        
        startContinuousArtyom();

        Intranet.when("NOT_COMMAND_MATCHED", function(){
            Intranet.say("Ich konnte dich leider nicht verstehen. Wiederhole deine Anfrage bitte.");
        });

    
        var initialCommand = [
            {
                indexes:["Hallo Intranet", "Hallo Internet"],
                action:function(i){
                    var hour = new Date().getHours();
                    var time;
                    if (hour >= 0 && hour <= 12){
                        time = " Morgen ";
                    }else if (hour >= 13 && hour <= 17){
                        time = " Mittag ";
                    }else if (hour >= 18 && hour <= 24){
                        time = " Abend ";
                    }
                    Intranet.say("Guten "+time+" Nina, Wie kann ich dir helfen?");
        
                    Intranet.addCommands(firstLevelCommands);
                    initialised = true;

                    document.getElementById("main").innerHTML = 'Du kannst folgende Befehle testen <br><br> "In welchem Raum findet {Veranstaltung} statt?" <br> "Stelle einen Timer für {X} Minuten." <br> "Wann habe ich heute meine erste Veranstaltung?" <br> "Eine kurze Zusammenfassung bitte." <br><br> Beende das Gespräch mit <br><br> "Danke" oder "Danke Intranet"';
                }
            }
        ];

        var firstLevelCommands = [
            {
                smart:true, 
                indexes:["* danke", "danke *"],
                action:function(i,wildcard){
                    console.log("Gespräch beendet");
                    Intranet.emptyCommands();
                    startContinuousArtyom();
                }
            },
            {
                indexes:["danke"],
                action:function(i){
                    console.log("Gespräch beendet");
                    Intranet.emptyCommands();
                    startContinuousArtyom();
                }
            },
            {
                smart:true, 
                indexes:["In welchem Raum findet * statt", "Wo findet * statt", "In welchem Alfaview Raum findet * statt"],
                action:function(i,wildcard){
                    if (firstLevel) {
                        var raum = [4, 7, 10, 12, 14, 17].random();
                        Intranet.say(wildcard + "findet im Alfaview Raum " +raum+ " von Digitale Medien statt.");
                    } else {
                        Intranet.say("Möchtest du das Thema wechseln oder sollen wir unsere aktuelle Unterhaltung fortführen?");
                    }
                }
            },
            {
                smart:true, 
                indexes:["Stelle einen Timer für * Minuten", "stell einen Timer für * Minuten"],
                action:function(i,wildcard){
                    if (firstLevel) {
                        Intranet.say("Timer für " + wildcard + " Minuten wurde gestellt.");
                    } else {
                        Intranet.say("Möchtest du das Thema wechseln oder sollen wir unsere aktuelle Unterhaltung fortführen?");
                    }
                }
            },
            {
                indexes:["Wann habe ich heute meine erste Veranstaltung", "Wann hab ich heute meine erste Veranstaltung"],
                action:function(i){
                    if (firstLevel) {
                        var hour = [8, 9, 10, 11, 14, 15, 16].random();
                        var minute = [00, 15, 30, 45].random();
                        var veranstaltung = ["Interface Design", "Website Prototyping", "Projekt Teil 2", "Streaming Anwendungen", "Marketing Automation", "Fachdidaktisches Praktikum"].random();
                        if (minute != 00) {
                            Intranet.say("Die Veranstaltung " +veranstaltung+ " beginnt um " +hour+ " Uhr " +minute+ ".");
                        }else{
                            Intranet.say("Die Veranstaltung " +veranstaltung+ " beginnt um " +hour+ " Uhr.");
                        }
                    } else {
                        Intranet.say("Möchtest du das Thema wechseln oder sollen wir unsere aktuelle Unterhaltung fortführen?");
                    }
                }
            },
            {
                indexes:["Eine kurze Zusammenfassung bitte"],
                action:function(i){
                    firstLevel = false;
                    Intranet.addCommands(zusammenfassungCommands);
                    Intranet.say("Du hast 2 neue Nachrichten, es wurde eine neue Datei hochgeladen und du hast heute eine Veranstaltung.");

                    document.getElementById("main").innerHTML = 'Du kannst folgende Befehle testen <br><br> "Mehr zu den/der Nachricht(en) bitte." <br> "Mehr zu den/der Datei(en) bitte" <br> "Mehr zu den/der Veranstaltung(en) bitte" <br><br> Verlasse die Zusammenfassung mit einem der folgenden Befehle <br><br> "In welchem Raum findet {Veranstaltung} statt?" <br> "Stelle einen Timer für {X} Minuten." <br> "Wann habe ich heute meine erste Veranstaltung?" <br> "Eine kurze Zusammenfassung bitte." <br> "Ich möchte das Thema wechseln." <br><br> Beende das Gespräch mit <br><br> "Danke" oder "Danke Intranet"';
                }
            }
        ];

        var zusammenfassungCommands = [
            {
                indexes:["Mehr zu den Nachrichten bitte", "Mehr zu der Nachricht bitte"],
                action:function(i){
                    Intranet.say("Professor Hottong hat eine Nachricht in der Veranstaltung Streaming Anwendungen zum Thema Streaming Camp findet Online statt geschrieben und Professor Schneider hat in der Veranstaltung Fachdidaktisches Praktikum eine Nachricht zum Thema neue Besprechungstermine geschrieben.");
                }
            },
            {
                indexes:["Mehr zu den Dateien bitte", "Mehr zu der Datei bitte"],
                action:function(i){
                    Intranet.say("Professor Hottong hat in der Veranstaltung Streaming Anwendungen die Datei Skript Teil 2 hochgeladen.");
                }
            },
            {
                indexes:["Mehr zu den Veranstaltungen bitte", "Mehr zu der Veranstaltung bitte"],
                action:function(i){
                    Intranet.say("Streaming Anwendungen bei Professor Hottong findet heute von 9 Uhr 45 bis 13 Uhr 15 statt.");
                }
            },
            {
                indexes:["Ja ich möchte das Thema wechseln", "Ich möchte das Thema wechseln"],
                action:function(i){
                    Intranet.say("Okay, wie kann ich dir weiterhelfen?");
                    firstLevel = true;
                    Intranet.emptyCommands();
                    startContinuousArtyom();
                    Intranet.addCommands(firstLevelCommands);
                    document.getElementById("main").innerHTML = 'Du kannst folgende Befehle testen <br><br> "In welchem Raum findet {Veranstaltung} statt?" <br> "Stelle einen Timer für {X} Minuten." <br> "Wann habe ich heute meine erste Veranstaltung?" <br> "Eine kurze Zusammenfassung bitte." <br><br> Beende das Gespräch mit <br><br> "Danke" oder "Danke Intranet"';
                }
            }
        ]

        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        }
    });
});
//# sourceMappingURL=playgroud-artyom-script.js.map