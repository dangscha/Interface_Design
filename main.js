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
//lul
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
            movePlanets();
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
    function movePlanets() {
        let choose = document.getElementById("choosePlanet");
        //planetsDiv.style.cssText = "animation-name: move-planetsDiv;";
        let remove = [];
        for (let i = 0; i < planets.length; i++) {
            let planet = planets[i];
            if (planet != firstPlanet && planet != secondPlanet) {
                remove.push(planet);
            }
        }
        for (let i = 0; i < remove.length; i++) {
            let planet = remove[i];
            if (planet != firstPlanet && planet != secondPlanet) {
                planet.parentNode.removeChild(planet);
            }
        }
        choose.style.display = "flex";
    }
}
window.addEventListener("load", main);
//# sourceMappingURL=main.js.map