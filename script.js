/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
    alert("Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.");
    play();
    for(;;) {
        if(confirm("Spila annan leik?")) {
            play();
        }
        else {
            break;
        }
    }
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
    var startTime = new Date().getTime(); // Start time in millisecond
    
    var countRettSvar = 0;
    var ans;
    for(var i=0; i<GAMES_TO_PLAY; i++) {
        ans = ask();
        if(ans === 1) { // ef það er rétt svar þá bæta við 1 í countRettsvar
            ++countRettSvar;
            console.log(countRettSvar);
        }
        if(ans === 3) { // ef leikmaður vill fá hætta við leik
            return;
        }
    }

    var endTime = new Date().getTime(); // End time in millisecond
    var finalTime = (endTime - startTime) / 1000; // get time in second
    var medalRettSvor = countRettSvar / finalTime.toFixed(2); // medal rétt svar
    alert("Þú svaraðir " + countRettSvar + " af 10 dæmum rétt á " + finalTime.toFixed(2) + " sekúndum \nMeðalrétt svör á sekúndu eru " + medalRettSvor.toFixed(2));
    countRettSvar = 0;
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
    var a, b;
    var input;
    var allSigns = generateSigns();

    // Nota 0, 1, 2, 3
    // þ.s 1 er fyrir rétt svar
    //     2 er fyrir villaust svar
    //     3 er fyrir hætta við
    //     0 er fyrir ekkert af þessu 3 fyrir ofan
    if( allSigns === 1 ) { // Plus
        a = randomNumber(1, 100);
        b = randomNumber(1, 100);
        input = prompt("Hvað er " + a + " + " + b + " ?", "");

        if(input === null) {
            alert("Hætt í leik.");
            return 3;
        }
        if(input === "") {
            alert("Vantar tölur");
            input = prompt("Hvað er " + a + " + " + b + " ?", "");
        }
        if(parseInt(input) === (a+b)) {
            console.log("Rétt");
            return 1; // Skila true ef það er rétt
        }
        if(parseInt(input) !== (a+b)) {
            console.log("Villaust");
            return 2;
        }
    }
    if( allSigns === 2 ) { // Minus
        a = randomNumber(1, 100);
        b = randomNumber(1, 100);
        input = prompt("Hvað er " + a + " - " + b + " ?", "");

        if(input === null) {
            alert("Hætt í leik.");
            return 3; // Skila false ef það er ekkert í input
        }
        if(input === "") {
            alert("Vantar tölur");
            input = prompt("Hvað er " + a + " + " + b + " ?", "");
        }
        if(parseInt(input) === (a-b)) {
            console.log("Rétt");
            return 1; // Skila true ef það er rétt
        }
        if(parseInt(input) !== (a-b)) {
            console.log("Villaust");
            return 2;
        }
    }
    if( allSigns === 3 ) { // Multiplication
        a = randomNumber(1, 10);
        b = randomNumber(1, 10);
        input = prompt("Hvað er " + a + " * " + b + " ?", "");

        if(input === null) {
            alert("Hætt í leik.");
            return 3; // Skila false ef það er ekkert í input
        } 
        if(input === "") {
            alert("Vantar tölur");
            input = prompt("Hvað er " + a + " * " + b + " ?", "");
        }
        if(parseInt(input) === (a*b)) {
            console.log("Rétt");
            return 1; // Skila true ef það er rétt
        }
        if(parseInt(input) !== (a*b)) {
            console.log("Villaust");
            return 2;
        }
    }
    if( allSigns === 4 ) { // Division
        a = randomNumber(2, 10);
        b = a * randomNumber(2, 10);
        input = prompt("Hvað er " + b + " / " + a + " ?", "");

        if(input === null) {
            alert("Hætt í leik.");
            return 3; // Skila false ef það er ekkert í input
        }
        if(input === "") {
            alert("Vantar tölur");
            input = prompt("Hvað er " + b + " / " + a + " ?", "");
        }
        if(parseInt(input) === (b/a)) {
            console.log("Rétt");
            return 1; // Skila true ef það er rétt
        }
        if(parseInt(input) !== (b/a)) {
            console.log("Villaust");
            return 2;
        }
    }
    console.log("reach me");
    return 0;
}

function generateSigns() {
    var randomSign = randomNumber(1, 4);
    return randomSign;
}



/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
