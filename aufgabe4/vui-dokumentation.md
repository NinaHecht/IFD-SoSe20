# Aufgabe 04 - Dialog Flow eines BI VUI

## Die Bedeutung von BI

Zur Bedeutung von BI - also Business Intelligence - können verschiedene Blickwinkel verschiedene Definitionen hervorbringen. <br>
*"Eine weitere Definition beschreibt die BI aus einer IT-basierten und unternehmensspezifischen Sicht. Nach dieser Definition versteht man unter BI das entscheidungsorientierte Sammeln, Aufbereiten und Darstellen von geschäftsrelevanten Informationen."*
_(Litzel, Nico: Was ist Business Intelligence - BI? https://www.bigdata-insider.de/was-ist-business-intelligence-bi-a-563185/, abgerufen am 10.11.2020)_

## Kompetenzbereich des BI VUI

* Öffnen gezielt angeforderter Ressourcen
* Auslesen gezielt angeforderter Inhalte
* Interpretation der Art des geforderten Inhalts (Link, Dokument, Seite, etc.)
* Bereitstellung von Optionen entsprechend der Art des Inhalts (Vorlesen, Öffnen, Herunterladen, etc.)
* Zusammenfassen aller aktuellen Neuigkeiten
* Durchsuchen eines Bereichs nach einen geforderten Inhalt
* Senden von Mitteilungen
* Setzen von Timern

Hieraus ergeben sich beispielsweise folgende

**Fragen**

* Wo findet Veranstaltung XY statt?
* Wann habe ich heute meine erste Veranstaltung?
* Was gibt es heute in der Mensa?
* ...

**Befehle**

* Öffne den Dateibereich der Veranstaltung XY
* Eine kurze Zusammenfassung
* Stelle einen Timer für X Minuten
* Schreibe eine Nachricht an XY mit dem Betreff X und der Nachricht Y
* Durchsuche die Veranstaltung XY nach Info X
* Öffne das Dokument mit der Info X
* Lade die Datei XY herunter
* Lies die Nachricht Y vor
* ...

## Der Dialog Flow

Mithilfe der zuvor definierten Fragen und Befehle wurden mögliche Dialogkonstrukte gebildet und als Dialog Flow dargestellt.

Unterteilt wurde der Dialog Flow in vier Arten von Dialogfragmenten:

1. Der einleitende Befehl: "Hallo Intranet" (blau)
2. Die User Inputs (grau)
3. Die System Outputs (grün)
4. Der terminierende Befehl: "Danke" (gelb)

Die in Dialog in geschweiften Klammern verwendeten Begriffe sind variable In- / Outputs. 

Bei dem Kernelement - die kurze Zusammenfassung - ist eine Art Kreislauf vorgesehen, bei welchen es möglich ist, jedes der drei Elemente (Veranstaltungen, Nachrichten und Dateien) genauer zu erfragen, ohne sich die Zusammenfassung erneut anhören zu müssen (gekennzeichnet ist dieser durch die gestrichelten Pfeile).

Wurde ein Thema abgehandelt ohne dass der User die Interaktion terminiert, wird er gefragt, ob er sonst noch Hilfe benötigt. Hier stehen ihm nun wieder alle Optionen frei

Konnte der User Input vom VUI nicht interpretiert werden, wird er aufgefordert, seine Frage neu formuliert zu wiederholen. 

Ist ein begonnenes Thema noch nicht abgehandelt und der User stellt eine Frage zu einem anderen Thema, so wird er gefragt ob er das Thema wechseln will oder bei dem aktuellen Thema bleiben.

![Dialog Flow](https://ninahecht.github.io/IFD-WiSe20-21/aufgabe4/dialog-flow.svg)
[Dialog Flow in voller Größe](https://ninahecht.github.io/IFD-WiSe20-21/aufgabe4/dialog-flow.html)