
import * as index from './index.js'
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';


export const plotArrayInit = (targetArray,dimmensions) => {
    for(var x=0;x<dimmensions.x;x++){
        let xArray = []
        for(var y=0;y<dimmensions.y;y++){
            let yArray = []
            for(var z=0;z<dimmensions.z;z++){
                yArray.push([])
            }
            xArray.push(yArray)
        }
        targetArray.push(xArray)
    }

}

export function wait(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved')
        },600)
    })
}

export async function waitASec(){
    const result = await wait();
}

const mouseHover = () => {

}

//takes in template object ie, defaultObj or midObj and returns a new object3D that copies all of it's children
export function newChildren(templateObj){
    let newChildren = []
    templateObj.children.forEach(child => {

        let childColor = child.material.color

        //makes new material so that it has it's own material whose color it can change without everyone sharing a material
        let newMat = new THREE.MeshPhongMaterial();
        newMat.color = childColor

        let mesh = new THREE.Mesh(child.geometry,newMat);
        mesh.defaultMaterial = newMat;
        mesh.scale.x = child.scale.x
        mesh.scale.y = child.scale.y
        mesh.scale.z = child.scale.z
        mesh.position.x = child.position.x
        mesh.position.y = child.position.y
        mesh.position.z = child.position.z
        mesh.rotation.x = child.rotation.x
        mesh.rotation.y = child.rotation.y
        mesh.rotation.z = child.rotation.z;
        // mesh.receiveShadow = true;
        mesh.castShadow = true;
        newChildren.push(mesh)
    })
    return newChildren;
}

export function rndmNum(min,max){
    return Math.random() * (max-min) + min;
}

export function copy(variable){
    let string = JSON.stringify(variable)
    console.log(string)
    console.log(JSON.parse(string))
    return JSON.parse(string)
}

export function deleteAtandUp(x,y,z,array,plot){
    // let at = array[x][y][z];
    // index.scene.remove(at.obj);
    // array[x][y][z] = [];
    for(var y=y; y<plot.dimmensions.y;y++){
        let inArray = array[x][y][z];
        index.scene.remove(inArray.obj);
        array[x][y][z] = [];
    }
}