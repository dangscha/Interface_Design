let planets: any;
let firstPlanet: HTMLImageElement;
let secondPlanet: HTMLImageElement;
let firstSelected: Boolean = false;
let secondSelected: Boolean = false;

function main(): void { //Definieren von Variablen, um Zugriff zu erhalten

    planets = document.getElementsByClassName("planet");

    for (let i: number = 0; i < planets.length; i++) {

        let planet: HTMLImageElement = planets[i];
        planet.addEventListener("click", selectPlanet);
    }
}
//lul
function selectPlanet(_event: MouseEvent): void { //Funktion zum Anklicken von Planeten
    if (secondSelected != true) {

        console.log(_event, _event.target);
        for (let i: number = 0; i < planets.length; i++) { //For-Schleife dient dazu, dass Planeten ihre Sättigung verlieren

            let planet: HTMLImageElement = planets[i];
            planet.classList.add("grey");
        }

        if (secondSelected != true && firstSelected == true) {
            secondPlanet = <HTMLImageElement>_event.target;
            secondSelected = true;

            movePlanets();
        }

        if (secondSelected == true) {
            secondPlanet.classList.remove("grey"); //Angeklickter Planet bekommt wieder Farbe
        }

        if (firstSelected != true) {
            firstPlanet = <HTMLImageElement>_event.target;
            firstSelected = true;
        }

        if (firstSelected == true) {
            firstPlanet.classList.remove("grey"); //Angeklickter Planet bekommt wieder Farbe

        }
    }

    function movePlanets(): void {
        let choose = document.getElementById("choosePlanet");

        //planetsDiv.style.cssText = "animation-name: move-planetsDiv;";
        let remove: HTMLImageElement[] = [];
        for (let i: number = 0; i < planets.length; i++) {

            let planet: HTMLImageElement = planets[i];
            if (planet != firstPlanet && planet != secondPlanet) {
                remove.push(planet);
            }
        }

        for (let i: number = 0; i < remove.length; i++) {

            let planet: HTMLImageElement = remove[i];
            if (planet != firstPlanet && planet != secondPlanet) {
                planet.parentNode.removeChild(planet);
                
            }
        }

        choose.style.display = "flex";
    }

}

window.addEventListener("load", main);