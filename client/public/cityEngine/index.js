import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import oc from './orbit.js';
import * as ts from './tools.js';
import * as cls from './classes.js';
import * as editor from './editor.js';
import * as load from './loader.js';


// [=--- RUNTIME SPECIFIC VARIABLES AND THE SORT ---=]

//placeholder for setting the mode that it operates in
const runMode = 'editor'

// [=--- MAIN INITIALIZING STUFF ---=]

// initializing basic necesarry scene stuff
export const scene = new THREE.Scene();

// export const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

let windowRatio = window.innerWidth/window.innerHeight;
export const camera = new THREE.OrthographicCamera(-5*windowRatio,5*windowRatio,5,-5,0.1,50);

camera.position.set(10,10,10)
camera.lookAt(10,0,5);
// camera.near = 1
// camera.far = 10

const light = new THREE.DirectionalLight(0xffffff,1,100);
light.position.set(4,20,8);
light.castShadow = true;
light.shadow.camera = new THREE.OrthographicCamera( -100, 100, 100, -100, 0.1, 100 );
light.shadow.radius = 0.3
light.shadowDarkness = 0.5
scene.add(light);

const ambientLight = new THREE.AmbientLight( 0xffffff )
ambientLight.intensity = 0.2
scene.add(ambientLight)

export const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x94e8ff);
// renderer.shadowMap.enabled = true;

document.querySelector('#canvCont').appendChild( renderer.domElement );

const OrbitControls = oc(THREE)
const controls = new OrbitControls(camera, renderer.domElement)
controls.keyPanSpeed = 20

//initializing script that loads all necesarry 3d files
load.init()

//initialzing array of all plots
    //--will be just 1 plot in editor, fills up in big city
export const plots = []


//depending on mode of page switches between editor and map scripts
if(runMode == 'editor'){
    editor.init()
}







function animate() {
	requestAnimationFrame( animate );

    controls.update()

	renderer.render( scene, camera );
}
animate();

