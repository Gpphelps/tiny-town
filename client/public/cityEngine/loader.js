import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';
import * as index from './index.js'


export const imported = {}



export async function init(){
    await objLoader('./cityEngine/Objects/Roads/road-pholder-straight.obj', 'road2Way')
    await mtlLoader('./cityEngine/Objects/Roads/road-pholder-straight.mtl', 'road2WayMat')
    await objLoader('./cityEngine/Objects/Roads/road-pholder-3way.obj', 'road3Way')
    await mtlLoader('./cityEngine/Objects/Roads/road-pholder-3way.mtl', 'road3WayMat')
    await objLoader('./cityEngine/Objects/Roads/road-pholder-4way.obj', 'road4Way')
    await mtlLoader('./cityEngine/Objects/Roads/road-pholder-4way.mtl', 'road4WayMat')
    await objLoader('./cityEngine/Objects/Roads/road-pholder-corner.obj', 'roadCorner')
    await mtlLoader('./cityEngine/Objects/Roads/road-pholder-corner.mtl', 'roadCornerMat')


    await objLoader('./cityEngine/Objects/Residential/residential-basic-ground.obj', 'residentialBasicGround')
    await mtlLoader('./cityEngine/Objects/Residential/residential-basic-ground.mtl', 'residentialBasicGroundMat')
    await objLoader('./cityEngine/Objects/Residential/residential-basic-floor.obj', 'residentialBasicFloor')
    await mtlLoader('./cityEngine/Objects/Residential/residential-basic-floor.mtl', 'residentialBasicFloorMat')
    await objLoader('./cityEngine/Objects/Residential/residential-basic-roof.obj', 'residentialBasicRoof')
    await mtlLoader('./cityEngine/Objects/Residential/residential-basic-roof.mtl', 'residentialBasicRoofMat')

    await gltfLoader('./cityEngine/Objects/Residential/residential-basic-ground.glb', 'gltfTest')

}




function gltfLoader(filePath, targetVar){
    const loader = new GLTFLoader();
    loader.load(filePath, (gltf) => {
        
        const object = gltf.scene;
        imported[targetVar] = object;

        // index.scene.add(object)
        // object.position.set(0,3,0)
    })
}

function objLoader(filePath, targetVar){
    const loader = new OBJLoader();
    loader.load(filePath, (obj) => {
        imported[targetVar] = obj.children[0]
    })
}

function mtlLoader(filePath, targetVar){
    const loader = new MTLLoader();
    loader.load(filePath, (mtl) => {
        mtl.preload()
        imported[targetVar] = mtl.materials.roadmat
    })
}