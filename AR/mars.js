let container;
let camera;
let controls;
let renderer;
let scene;


function init() {

    container = document.querySelector('#scene-container');

    scene = new THREE.Scene();

    createCamera();
    createControls();
    createLights();
    loadModels();
    createRenderer();


    renderer.setAnimationLoop(() => {

        update();
        render();

    });

}

function createCamera() {

    camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 100000);
    camera.position.set(0, 25, 1700);

}

function createControls() {

    controls = new THREE.OrbitControls(camera, container);
    controls.enablePan = false;
    controls.enableZoom= false;
    controls.autoRotate= true;
    controls.autoRotateSpeed= 0.5;

}

function createLights() {

    const ambientLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 3);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(0, 10, 30);

    const mainLight2 = new THREE.DirectionalLight(0xffffff, 1);
    mainLight2.position.set(0, 10, -30);

    scene.add(ambientLight, mainLight, mainLight2);

}

function loadModels() {

    const loader = new THREE.GLTFLoader().setPath('../AR/Model/');

    // A reusable function to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = (gltf, position) => {

        const model = gltf.scene;//changed from gltf.scene.children[0]
        model.position.copy(position);
        model.receiveShadow = true;
        model.castShadow = true;
        scene.add(model);
    };
    // the loader will report the loading progress to this function
    const onProgress = () => {
    };

    // the loader will send any error messages to this function, and we'll log them to to console
    const onError = (errorMessage) => {
        console.log(errorMessage);
    };

    // load the first model. Each model is loaded asynchronously,
    const objPosition = new THREE.Vector3(0, 0, 0);
    loader.load('Mars_1_6792.glb', gltf => onLoad(gltf, objPosition), onProgress, onError);

}

function createRenderer() {

    // create a WebGLRenderer and set its width and height
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;

    renderer.physicallyCorrectLights = true;

    container.appendChild(renderer.domElement);

}

function update() {

}

function render() {
    renderer.render(scene, camera);
    controls.update();
}

function onWindowResize() {

    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
init();
