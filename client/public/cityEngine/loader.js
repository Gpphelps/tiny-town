import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';
import * as index from './index.js'
import * as ts from './tools.js'


export const imported = {}
export const importArray = []



export async function init(){

    await gltfLoader('./cityEngine/Objects/Residential/apartment.glb','apartmentGround')
    await gltfLoader('./cityEngine/Objects/Residential/apartmentmid.glb','apartmentMid')
    await gltfLoader('./cityEngine/Objects/Residential/apartmentroof.glb','apartmentRoof')
    await gltfLoader('./cityEngine/Objects/Residential/apartmentbase2.glb','apartmentGroundAltOne')


    await gltfLoader('./cityEngine/Objects/Office/modernofficebase.glb', 'officeGround')
    await gltfLoader('./cityEngine/Objects/Office/modernofficemid.glb', 'officeMid')
    await gltfLoader('./cityEngine/Objects/Office/modofficeroof.glb', 'officeRoof')

    await gltfLoader('./cityEngine/Objects/Commercial/onebyoneshop.glb', 'commercialGround')
    await gltfLoader('./cityEngine/Objects/Commercial/shopmid.glb', 'commercialMid')
    await gltfLoader('./cityEngine/Objects/Commercial/shoproof.glb', 'commercialRoof')
    await gltfLoader('./cityEngine/Objects/Commercial/shopbase2.glb', 'commercialGroundAltOne')

    // await gltfLoader('./cityEngine/Objects/Skyscraper/skyscraperbase.glb', 'skyscraperGround')
    // await gltfLoader('./cityEngine/Objects/Skyscraper/skyscrapermid.glb', 'skyscraperMid')
    // await gltfLoader('./cityEngine/Objects/Skyscraper/skyscraperroof.glb', 'skyscraperRoof')

    await gltfLoader('./cityEngine/Objects/Roads/road2way.glb','road2Way')
    await gltfLoader('./cityEngine/Objects/Roads/road3way.glb','road3Way')
    await gltfLoader('./cityEngine/Objects/Roads/road4way.glb','road4Way')
    await gltfLoader('./cityEngine/Objects/Roads/roadCorner.glb','roadCorner')

    await gltfLoader('./cityEngine/Objects/Flora/tree1.glb','tree1')
    await gltfLoader('./cityEngine/Objects/Flora/tree2.glb','tree2')

}




function gltfLoader(filePath, targetVar, last){
    const loader = new GLTFLoader();
    loader.load(filePath, (gltf) => {
        
        // const object = gltf.scene;
        // object.children.forEach((child,index) => {
        //     child.defaultMaterial = child.material;
        // })
        // object.path = filePath
        // object.children = object.children.filter(child => child.type != "Object3D")

        const object = gltf.scene;
        object.children = object.children.filter(child => child.type != "Object3D")
        // console.log(object)
        // console.log(object)
        let mergedMesh = ts.mergeGeometry(object)
        mergedMesh.path = filePath


        imported[targetVar] = mergedMesh;
        importArray.push(mergedMesh);

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

