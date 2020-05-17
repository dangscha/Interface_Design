let planets: any;
let firstPlanet: HTMLImageElement;
let secondPlanet: HTMLImageElement;
let firstSelected: Boolean = false;
let secondSelected: Boolean = false;

function main(): void { //Definieren von Variablen, um Zugriff zu erhalten

    planets = document.getElementsByClassName("planet");

    for (let i: number = 0; i < planets.length; i++) {

        let planet: HTMLImageElement = planets[i]
        planet.addEventListener("click", selectPlanet);
    }
}
//test
function selectPlanet(_event: MouseEvent): void { //Funktion zum Anklicken von Planeten
    if (secondSelected != true) {

        console.log(_event, _event.target);
        for (let i: number = 0; i < planets.length; i++) { //For-Schleife dient dazu, dass Planeten ihre Sättigung verlieren

            let planet: HTMLImageElement = planets[i];
            planet.classList.add("grey");
        }
       
        if (secondSelected != true && firstSelected == true) {
            secondPlanet = <HTMLImageElement>_event.target
            secondSelected = true;
        }

        if (secondSelected == true) {
            secondPlanet.classList.remove("grey"); //Angeklickter Planet bekommt wieder Farbe
        }

        if (firstSelected != true) {
            firstPlanet = <HTMLImageElement>_event.target
            firstSelected = true;
        }

        if (firstSelected == true) {
            firstPlanet.classList.remove("grey"); //Angeklickter Planet bekommt wieder Farbe

        }

    }

}

window.addEventListener("load", main)