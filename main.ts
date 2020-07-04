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

    let texts: HTMLCollectionOf<HTMLDivElement>;
    let buttons: HTMLCollectionOf<HTMLButtonElement>;

    function main(): void { //Definieren von Variablen, um Zugriff zu erhalten

        galaxy = <HTMLDivElement>document.getElementsByClassName("galaxy")[0];

        texts = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName("info");
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

        buttons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("myButton");

        for (let i: number = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", showInfo);
        }

    }

    let target: string = "";
    let lastTarget: string = "";
    let targetPlanet: HTMLDivElement;
    let targetText: HTMLDivElement;

    let request: any;

    async function showInfo(_event: MouseEvent): Promise<void> {
        lastTarget = target;
        target = (<HTMLButtonElement>_event.target).getAttribute("planet-data");
        let deColor: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>galaxy.children[0].children;

        if (target != "none") {
            
            targetPlanet = <HTMLDivElement>document.getElementsByClassName("planet--" + target)[0];
            if (target == "sun") { 
                targetPlanet = <HTMLDivElement>document.getElementsByClassName(target)[0];
            }
            targetText = <HTMLDivElement>document.getElementById("text--" + target);
            request = window.requestAnimationFrame(update);

            for (let i: number = 0; i < deColor.length; i++) {
                deColor[i].classList.add("grey");
            }

            (<HTMLDivElement>targetPlanet.parentNode).classList.remove("grey");
            if (target == "sun") { 
                (<HTMLDivElement>targetPlanet).classList.remove("grey");
            }
            window.requestAnimationFrame(update);


        } else {
            for (let i: number = 0; i < texts.length; i++) {
                texts[i].style.display = "none";
            }

            for (let i: number = 0; i < deColor.length; i++) {
                deColor[i].classList.remove("grey");

            }
        }


        for (let i: number = 0; i < buttons.length; i++) {
            buttons[i].className = "myButton";
        }

        (<HTMLButtonElement>_event.target).className = "myButton active";
        (<HTMLButtonElement>_event.target).className = "myButton active2";

    }

    function update(): void {
        if (target != "none") {
            let position = targetPlanet.getBoundingClientRect();
            targetText.style.left = position.x + "px";
            targetText.style.top = position.y + "px";

            for (let i: number = 0; i < texts.length; i++) {
                texts[i].style.display = "none";
            }
            targetText.style.display = "block";


            window.requestAnimationFrame(update);
        }

    }


    function setSpeed(_event: MouseEvent): void {
        console.log("speed");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        let styleDistance = document.getElementById("distance-style");
        speed.classList.add("active");
        distance.classList.remove("active");
        size.classList.remove("active");
        styleSize.rel = "alternate stylesheet";
        styleDistance.rel = "alternate stylesheet";
        styleSpeed.rel = "stylesheet";

    }

    function setSize(_event: MouseEvent): void {
        console.log("size");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        let styleDistance = document.getElementById("distance-style");
        size.classList.add("active");
        distance.classList.remove("active");
        speed.classList.remove("active");
        styleSize.rel = "stylesheet";
        styleDistance.rel = "alternate stylesheet";
        styleSpeed.rel = "alternate stylesheet";

    }

    function setDistance(_event: MouseEvent): void {
        console.log("distance");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        let styleDistance = document.getElementById("distance-style");
        distance.classList.add("active");
        size.classList.remove("active");
        speed.classList.remove("active");
        styleSize.rel = "alternate stylesheet";
        styleDistance.rel = "stylesheet";
        styleSpeed.rel = "alternate stylesheet";

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