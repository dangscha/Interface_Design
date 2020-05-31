namespace IntDes {

    let galaxy: HTMLDivElement;
    let zoom: number = 1;

    let top: number = 0;
    let left: number = 0;
    let x: number;
    let y: number;
    let moveX: number;
    let moveY: number;

    let move: boolean = false;

    let speed: HTMLButtonElement;
    let distance: HTMLButtonElement;
    let size: HTMLButtonElement;

    function main(): void { //Definieren von Variablen, um Zugriff zu erhalten

        galaxy = <HTMLDivElement>document.getElementsByClassName("galaxy")[0];
        document.addEventListener("wheel", zoomTo);

        document.addEventListener("mousedown", (_event): void => {
            move = true;
            x = _event.clientX;
            y = _event.clientY;
        });
        document.addEventListener("mousemove", moveGalaxy);

        document.addEventListener("mouseup", (): void => {
            move = false;
            left += moveX;
            top += moveY;
        });

        speed = <HTMLButtonElement>document.getElementById("Speed");
        distance = <HTMLButtonElement>document.getElementById("Distance");
        size = <HTMLButtonElement>document.getElementById("Size");

        speed.addEventListener("click", setSpeed);
        size.addEventListener("click", setSize);
        distance.addEventListener("click", setDistance);

    }

    function setSpeed(_event: MouseEvent): void {
        console.log("speed");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        styleSpeed.rel = "stylesheet";
        styleSize.rel = "alternate stylesheet";

    }

    function setSize(_event: MouseEvent): void {
        console.log("size");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        styleSize.rel = "stylesheet";
        styleSpeed.rel = "alternate stylesheet";
    }

    function setDistance(_event: MouseEvent): void {
        console.log("distance");

    }

    function moveGalaxy(_event: MouseEvent): void {

        if (move) {
            moveX = -x + _event.clientX;
            galaxy.style.left = left + moveX + "px";

            moveY = -y + _event.clientY;
            galaxy.style.top = top + moveY + "px";
        }
    }

    function zoomTo(_event: WheelEvent): void {
        if (_event.deltaY < 0 && zoom < 3) {

            zoom += .1;
            galaxy.style.transform = "scale(" + zoom + ")";

        } else if (_event.deltaY > 0 && zoom > 0.5) {

            zoom -= .1;
            galaxy.style.transform = "scale(" + zoom + ")";

        }
    }

    window.addEventListener("load", main);
}