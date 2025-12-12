Planering
Ni ska använda er utav Trello för att skapa en planering samt översikt över hur arbetet går. Bjud in samtliga medlemmar + Brandon.DuarteTsegai@nackademin.se till Trello boardet.

Ni ska ha minst följande fem spalter: Backlog, Todo,In progress, Ready for test, Done

Backlog - Börja med att fylla på backloggen med så många kort som möjligt för att tydliggöra vilka ärenden som ska utföras under hela projektets gång.

En wireframe ska tas fram utifrån kravställning som ni utgår ifrån.

Projektmetodik
Projektlängd: 2 sprintar (ca 1 vecka/sprint).

Sprintplanering - Påbörja varje sprint med att dra över/skapa ärenden från Backlog till Todo. Varje Trello-ärende ska ha en huvudansvarig vid utförning.

Återkommande avstämningsmöten (standups)

Ca 5-15 minuter. OBS. Dessa ska dokumenteras! Ni ska ha en samling mötesanteckningar där ni skriver vilken tid ni håller mötet, vilka som deltar, samt vad som sägs under mötets gång. Ni kan ha detta i Trello eller ett Google-dokument.

Retrospektiv - Ni ska hålla ett retrospektiv efter sprint 1, där ni diskuterar vad som gått bra och vad som kan förbättras i arbetet. Detta moment ska dokumenteras. Ni kan ha detta i Trello eller ett Google-dokument.

Git flow - Ni ska använda Github för att dela med er av kod och skapa branches från main där ni främst sitter och arbetar i, och sen mergar in era ändringar i main-branchen med jämna mellanrum.
Testning - Ni ska testa varandras ärenden innan de är färdiga och utförda. Man får ej markera sina egna ärenden som färdiga.

Applikation
Ni ska skapa en applikation som ska underlätta produktivitet i vardagslivet. Användare ska bland annat kunna hålla koll på sina dagliga rutiner, ärenden, och händelser. 

(VG) Det ska krävas att man är inloggad för att kunna använda applikationen.

Inloggning (Endast VG)
Man ska kunna registrera flera olika användare med användarnamn samt lösenord.

Varje användare ska kunna logga in och logga ut ur applikationen.

Vid lyckad inloggning - Ska en användare mötas av en hälsning samt ett slumpat citat från t.ex följande API: https://api.quotable.io/

Varje användare ska ha tillgång till alla sina ärenden, rutiner och händelser den skapat när den loggar in.

Startsida
Visa ut en översikt över applikationen. Följande ska visas ut.
De tre senaste ej utförda ärenden som användaren lagt till. Länk för att navigera till lista med samtliga ärenden.

De tre rutiner med högst antal repetitioner. Länk för att navigera till lista med samtliga rutiner.

De tre nästkommande händelserna. Länk för att navigera till lista med samtliga händelser.


Todos & Activities
Användare ska kunna se en lista med ärenden att utföra, samt skapa nya ärenden. 

Varje ärende ska innehålla följande:

Titel

Beskrivning

Status - om den är utförd eller ej.

Tidsestimat - Hur lång tid ärendet tar att utföra

Kategori - (ha bestämda kategorier man kan välja mellan, till exempel hälsa, hushåll, jobbrelaterat, nöje etc.)

Deadline - Datum som det senast ska vara utfört.


Användaren ska kunna göra följande med varje ärende:


Markera ärendet som slutfört.

Lägga till ärende.

Ta bort ärendet.

Redigera ärendet.


Användare ska kunna filtrera och sortera listan på följande sätt:

Filtrering ska kunna ske så att användare endast ser ärenden baserat på:

Status - Slutförd / Ej utförd

Kategorier - Man ska kunna välja vilken/vilka kategorier som man vill kunna se.

Sortering - ska kunna sorteras baserat på (stigande och fallande):

Deadline

Tidsestimat

Status - Slutförd / Ej utförd

Habits
Användare ska kunna se en lista av valda rutiner som ska kunna spåra framsteg i form av antal repetitioner.


Användaren ska kunna skapa en ny rutin och ta bort existerande rutiner.

Varje rutin ska innehålla följande:

Titel - t.ex “Träning, läsa bok, meditera etc.”

Repetitioner - En siffra på hur många gånger användaren utfört rutinen.

Prioritet - (låg,mellan,hög)

Man ska kunna öka, minska och nollställa repetitioner för varje rutin.

Filtrering - Ska kunna filtreras på prioritet.

Sortering - Ska kunna sorteras på (stigande och fallande):

Repetitioner

Prioritet

Event planner
Användaren ska kunna skapa tidsspecifika händelser. En lista på samtliga händelser ska visas ut.

Varje händelse ska innehålla följande:

Start (datum och tid)

Slut (datum och tid)

Namn på händelse

Det ska vara möjligt att lägga till, ta bort och redigera händelser.

Händelserna ska alltid vara sorterade på vilken som infaller närmast i tid.

Det ska framgå vilka händelser som redan infallit (t.ex genom utgråad text/visas i en separat lista eller liknande)

Filtrering baserat på:

Kommande händelser/Tidigare händelser

Godkänt


Klarar av att jobba med grundläggande DOM-manipulering.

Deltar aktivt i projektet i form av närvaro på avstämningsmöten, aktivitet på Trello.

Kan bidra till ett agilt projekt genom att lösa kod-relaterade problem.

Applikationen ska ha ett enhetligt utseende.

Väl godkänt


Uppfyller samtliga G-krav.

Ingen större bugg i applikationen.

Applikationen har stöd för att registrera och logga in olika användare.

Applikationen använder sig utav localStorage och sessionStorage för att lagra data för varje inloggad användare.

