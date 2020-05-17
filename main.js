"use strict";
let planets;
let firstPlanet;
let secondPlanet;
let firstSelected = false;
let secondSelected = false;
function main() {
    planets = document.getElementsByClassName("planet");
    for (let i = 0; i < planets.length; i++) {
        let planet = planets[i];
        planet.addEventListener("click", selectPlanet);
    }
}
function selectPlanet(_event) {
    if (secondSelected != true) {
        console.log(_event, _event.target);
        for (let i = 0; i < planets.length; i++) { //For-Schleife dient dazu, dass Planeten ihre Sättigung verlieren
            let planet = planets[i];
            planet.classList.add("grey");
        }
        if (secondSelected != true && firstSelected == true) {
            secondPlanet = _event.target;
            secondSelected = true;
        }
        if (secondSelected == true) {
            secondPlanet.classList.remove("grey"); //Angeklickter Planet bekommt wieder Farbe
        }
        if (firstSelected != true) {
            firstPlanet = _event.target;
            firstSelected = true;
        }
        if (firstSelected == true) {
            firstPlanet.classList.remove("grey"); //Angeklickter Planet bekommt wieder Farbe
        }
    }
}
window.addEventListener("load", main);
//# sourceMappingURL=main.js.map