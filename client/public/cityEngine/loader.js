import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';
import * as index from './index.js'


export const imported = {}



export async function init(){
    // await objLoader('./cityEngine/Objects/Roads/road-pholder-straight.obj', 'road2Way')
    // await mtlLoader('./cityEngine/Objects/Roads/road-pholder-straight.mtl', 'road2WayMat')
    // await objLoader('./cityEngine/Objects/Roads/road-pholder-3way.obj', 'road3Way')
    // await mtlLoader('./cityEngine/Objects/Roads/road-pholder-3way.mtl', 'road3WayMat')
    // await objLoader('./cityEngine/Objects/Roads/road-pholder-4way.obj', 'road4Way')
    // await mtlLoader('./cityEngine/Objects/Roads/road-pholder-4way.mtl', 'road4WayMat')
    // await objLoader('./cityEngine/Objects/Roads/road-pholder-corner.obj', 'roadCorner')
    // await mtlLoader('./cityEngine/Objects/Roads/road-pholder-corner.mtl', 'roadCornerMat')


    await gltfLoader('./cityEngine/Objects/Office/officebuilding.glb', 'officeGround')
    await gltfLoader('./cityEngine/Objects/Office/officebuildingmidsection.glb', 'officeMid')
    await gltfLoader('./cityEngine/Objects/Office/officeroof.glb', 'officeRoof')

    await gltfLoader('./cityEngine/Objects/Commercial/onebyoneshop.glb', 'commercialGround')
    await gltfLoader('./cityEngine/Objects/Commercial/shopmid.glb', 'commercialMid')
    await gltfLoader('./cityEngine/Objects/Commercial/shoproof.glb', 'commercialRoof')

    await gltfLoader('./cityEngine/Objects/Roads/road2way.glb','road2Way')
    await gltfLoader('./cityEngine/Objects/Roads/road3way.glb','road3Way')
    await gltfLoader('./cityEngine/Objects/Roads/road4way.glb','road4Way')
    await gltfLoader('./cityEngine/Objects/Roads/roadCorner.glb','roadCorner')

    await gltfLoader('./cityEngine/Objects/Park/park-1x1-01.glb','park1x1One')
}




function gltfLoader(filePath, targetVar){
    const loader = new GLTFLoader();
    loader.load(filePath, (gltf) => {
        
        const object = gltf.scene;
        // index.scene.add(object);
        object.children.forEach((child,index) => {
            child.defaultMaterial = child.material;
        })
        object.path = filePath
        object.children = object.children.filter(child => child.type != "Object3D")
        imported[targetVar] = object;
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