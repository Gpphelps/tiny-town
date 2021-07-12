import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import oc from './orbit.js';
import * as ts from './tools.js';
import * as cls from './classes.js';
import * as editor from './editor.js';
import * as city from './city.js'
import * as load from './loader.js';


// [=--- RUNTIME SPECIFIC VARIABLES AND THE SORT ---=]

//placeholder for setting the mode that it operates in

let runMode;

export let scene;
export let camera;
export let renderer;
export let controls;


let generalSettings = {
    vertOrbit: false,
}

function init(){

    if(document.location.pathname == '/login' || document.location.pathname == '/signup'){
        return;
    }

    runMode = document.querySelector('#runModeProxy').textContent;
    // [=--- MAIN INITIALIZING STUFF ---=]

    // initializing basic necesarry scene stuff
    scene = new THREE.Scene();

    const color = 0x94e8ff;
    const near = 10;
    const far = 100;
    scene.fog = new THREE.Fog(color,near,far)

    // export const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

    let windowRatio = window.innerWidth/window.innerHeight;
    camera = new THREE.OrthographicCamera(-10*windowRatio,10*windowRatio,10,-10,-100,500);

    camera.position.set(10,12,10)
    camera.lookAt(5,0,5);
    camera.zoom = 2


    const light = new THREE.DirectionalLight(0xffffff,0.6);
    light.position.set(4,20,8);
    light.castShadow = true;
    light.shadow.camera = new THREE.OrthographicCamera( -10, 10, 10, -10, 0.1, 50 );
    light.shadow.radius = 0.4
    light.shadowDarkness = 0.8
    scene.add(light);

    const ambientLight = new THREE.AmbientLight( 0xffffff )
    ambientLight.intensity = 0.6
    scene.add(ambientLight)



    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x94e8ff);
    renderer.shadowMap.enabled = true;


    document.querySelector('#canvCont').appendChild( renderer.domElement );

    const OrbitControls = oc(THREE)
    controls = new OrbitControls(camera, renderer.domElement)
    controls.keyPanSpeed = 20
    controls.target.set(5,2,5);

    controls.maxZoom = 8;
    controls.minZoom = 0.1;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.1
    controls.maxPolarAngle = Math.PI/2.1

    if(!generalSettings.vertOrbit){
        let vertAngle = controls.getPolarAngle()
        controls.minPolarAngle = vertAngle
        controls.maxPolarAngle = vertAngle
    }


    runByMode()
    animate()
}

//initializing script that loads all necesarry 3d files


//initialzing array of all plots
    //--will be just 1 plot in editor, fills up in big city
export const plots = []


//depending on mode of page switches between editor and map scripts
async function runByMode(){

    load.init()
    
    //JUST A PLACEHOLDER FUNCTINO, JUST WAITS 2 SECONDS
    //NEED TO MAKE THE ACTUAL LOADER WORK WITH A PROMISE
    await ts.wait()

    if(runMode == 'editor'){
        editor.init()
    } else if (runMode == 'city'){
        city.init()
    }

}




export const log = () => {
    console.log('yes!!!')
}




function animate() {
	requestAnimationFrame( animate );

    controls.update()

    //rotates popup menu
    
    if(document.querySelector('#newPlotPopUp') && document.querySelector('#newPlotPopUp').style.display == 'flex'){
        let popup = document.querySelector('#newPlotPopUp');

        let horizontal = controls.getAzimuthalAngle();


        popup.style.transform = `rotate(${horizontal*(180/Math.PI)}deg)`



    }

	renderer.render( scene, camera );
}


init()




//REALLY CRAPPY SOLUTION TO FIND REACT WINDOW CHANGES

const checkLocationChange = () => {
    let lastRun = document.location.pathname;

    setInterval(function(){
        let currentLocation = document.location.pathname;
        if(currentLocation != lastRun){
            console.log('changed')
            init()
        }
        lastRun = currentLocation
    },100)
}

checkLocationChange()

