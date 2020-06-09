"use strict";
var IntDes;
(function (IntDes) {
    let galaxy;
    let zoom = 1;
    let top = 0;
    let left = 0;
    let x;
    let y;
    let moveX;
    let moveY;
    let move = false;
    let speed;
    let distance;
    let size;
    let texts;
    let buttons;
    function main() {
        galaxy = document.getElementsByClassName("galaxy")[0];
        texts = document.getElementsByClassName("info");
        document.addEventListener("wheel", zoomTo);
        document.addEventListener("mousedown", (_event) => {
            move = true;
            x = _event.clientX;
            y = _event.clientY;
        });
        document.addEventListener("mousemove", moveGalaxy);
        document.addEventListener("mouseup", () => {
            move = false;
            left += moveX;
            top += moveY;
        });
        speed = document.getElementById("Speed");
        distance = document.getElementById("Distance");
        size = document.getElementById("Size");
        speed.addEventListener("click", setSpeed);
        size.addEventListener("click", setSize);
        distance.addEventListener("click", setDistance);
        buttons = document.getElementsByClassName("myButton");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", showInfo);
        }
    }
    let target = "";
    let lastTarget = "";
    let targetPlanet;
    let targetText;
    let request;
    async function showInfo(_event) {
        lastTarget = target;
        target = _event.target.getAttribute("planet-data");
        if (target != "none") {
            targetPlanet = document.getElementsByClassName("planet--" + target)[0];
            targetText = document.getElementById("text--" + target);
            request = window.requestAnimationFrame(update);
            window.requestAnimationFrame(update);
        }
        else {
            for (let i = 0; i < texts.length; i++) {
                texts[i].style.display = "none";
            }
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = "myButton";
        }
        _event.target.className = "myButton active";
    }
    function update() {
        if (target != "none") {
            let position = targetPlanet.getBoundingClientRect();
            targetText.style.left = position.x + "px";
            targetText.style.top = position.y + "px";
            for (let i = 0; i < texts.length; i++) {
                texts[i].style.display = "none";
            }
            targetText.style.display = "block";
            window.requestAnimationFrame(update);
        }
    }
    function setSpeed(_event) {
        console.log("speed");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        let styleDistance = document.getElementById("distance-style");
        styleSize.rel = "alternate stylesheet";
        styleDistance.rel = "alternate stylesheet";
        styleSpeed.rel = "stylesheet";
    }
    function setSize(_event) {
        console.log("size");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        let styleDistance = document.getElementById("distance-style");
        styleSize.rel = "stylesheet";
        styleDistance.rel = "alternate stylesheet";
        styleSpeed.rel = "alternate stylesheet";
    }
    function setDistance(_event) {
        console.log("distance");
        let styleSize = document.getElementById("size-style");
        let styleSpeed = document.getElementById("speed-style");
        let styleDistance = document.getElementById("distance-style");
        styleSize.rel = "alternate stylesheet";
        styleDistance.rel = "stylesheet";
        styleSpeed.rel = "alternate stylesheet";
    }
    function moveGalaxy(_event) {
        if (move) {
            moveX = -x + _event.clientX;
            galaxy.style.left = left + moveX + "px";
            moveY = -y + _event.clientY;
            galaxy.style.top = top + moveY + "px";
        }
    }
    function zoomTo(_event) {
        if (_event.deltaY < 0 && zoom < 3) {
            zoom += .1;
            galaxy.style.transform = "scale(" + zoom + ")";
        }
        else if (_event.deltaY > 0 && zoom > 0.5) {
            zoom -= .1;
            galaxy.style.transform = "scale(" + zoom + ")";
        }
    }
    window.addEventListener("load", main);
})(IntDes || (IntDes = {}));
//# sourceMappingURL=main.js.map