
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
        },2000)
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
        let mesh = new THREE.Mesh(child.geometry,child.material);
        mesh.defaultMaterial = child.material;
        mesh.scale.x = child.scale.x
        mesh.scale.y = child.scale.y
        mesh.scale.z = child.scale.z
        mesh.position.x = child.position.x
        mesh.position.y = child.position.y
        mesh.position.z = child.position.z
        mesh.rotation.x = child.rotation.x
        mesh.rotation.y = child.rotation.y
        mesh.rotation.z = child.rotation.z;
        newChildren.push(mesh)
    })
    return newChildren;
}