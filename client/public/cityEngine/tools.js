
import * as index from './index.js'
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { BufferGeometryUtils } from './bufferGeometryUtils.js'
// import { BufferGeometryUtils } from './node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';
// import * as Buffer from './bufferGeometryUtils.js'

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

export function wait(time){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved')
        },time)
    })
}


//Promise for awaiting react dom changes, does interval until react puts stuff in the textarea
export function domWait(waitingUpon){
    return new Promise(resolve => {
        setInterval(() => {
            let value = waitingUpon.value;

            if(value.length > 10){
                resolve('resolved')
            }

        },10)
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
    let geometries = []
    templateObj.children.forEach(child => {

        if(child.type == "Mesh"){
            let childColor = child.material.color

            //makes new material so that it has it's own material whose color it can change without everyone sharing a material
            let newMat = new THREE.MeshPhongMaterial();
            newMat.color = childColor

            // let newGeo = new THREE.BufferGeometry().fromGeometry(child.geometry)
    
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
            geometries.push(child.geometry)
            newChildren.push(mesh)
        } else if (child.type == "Group"){
            child.children.forEach(child => {
                let childColor = child.material.color

                //makes new material so that it has it's own material whose color it can change without everyone sharing a material
                let newMat = new THREE.MeshPhongMaterial();
                newMat.color = childColor
                newMat.shininess = 1
                newMat.flatShading = false;
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
        }

    })

    // geometries.forEach(geometry => {
    //     if(geometry.attributes.color){
    //         delete geometry.attributes.color
    //     }
    // })

    // let merged = BufferGeometryUtils.mergeBufferGeometries(geometries, true)

    // let newMesh = new THREE.Mesh()

    // newMesh.geometry = merged;
    // newMesh.material = new THREE.MeshPhongMaterial({color:'blue'})
    // console.log(merged)
    // console.log(newChildren)
    // console.log(newMesh)

    // let obj = new THREE.Object3D()
    // obj.add(newMesh)
    return newChildren;
}

export function mergeBuffers(obj){


    const positions = []
    const normals = []
    const uvs = []

    obj.children.forEach(mesh => {
        mesh.geometry.attributes.normal.array.forEach(vertex => normals.push(vertex))
        mesh.geometry.attributes.position.array.forEach(vertex => positions.push(vertex))
        mesh.geometry.attributes.uv.array.forEach(vertex => uvs.push(vertex))
    })


    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));


    let newMesh = new THREE.Mesh()
    newMesh.geometry = geometry;
    newMesh.material = new THREE.MeshPhongMaterial({color: 'red',side: THREE.FrontSide})
    return newMesh
}

export function mergeGeometry(obj){
    
    let geometries = []
    obj.children.forEach(mesh => {
        let meshGeo = mesh.geometry;
        let meshPos = mesh.position;
        let meshRot = mesh.rotation;
        // console.log(mesh)
        let movedPos = []
        for(let i=0;i<meshGeo.attributes.position.array.length;i+=3){
            let x = meshGeo.attributes.position.array[i]
            let y = meshGeo.attributes.position.array[i+1]
            let z = meshGeo.attributes.position.array[i+2]

            // x += mesh.position.x;
            // y += mesh.position.y;
            // z += mesh.position.z;

            let point = [x,y,z];

            point[0] = point[0] * mesh.scale.x
            point[1] = point[1] * mesh.scale.y
            point[2] = point[2] * mesh.scale.z

            point = math.multiply(point,rotatorX(meshRot.x));
            point = math.multiply(point,rotatorY(meshRot.y));
            point = math.multiply(point,rotatorZ(meshRot.z));
            point = math.multiply(point,rotatorX(meshRot.x));
            point = math.multiply(point,rotatorY(meshRot.y));
            // point = math.multiply(point,rotatorZ(meshRot.z));

            let rotatedX = point[0]
            let rotatedY = point[1]
            let rotatedZ = point[2]


            let newX = (rotatedX) + meshPos.x
            let newY = (rotatedY) + meshPos.y
            let newZ = (rotatedZ) + meshPos.z

        
            movedPos.push(newX)
            movedPos.push(newY)
            movedPos.push(newZ)


        }

        meshGeo.attributes.position.array.set(movedPos)

        geometries.push(mesh.geometry)
    })
    console.log(geometries)

    geometries.forEach(geometry => {
        if(geometry.attributes.color){
            delete geometry.attributes.color
        }
    })
    let merged = BufferGeometryUtils.mergeBufferGeometries(geometries, false)
    console.log(merged)

    let newMesh = new THREE.Mesh(merged, new THREE.MeshPhongMaterial({color:'blue'}))

    return newMesh;
}

function rotatorX(angle){
    return [[1, 0, 0], [0, Math.cos(angle), -Math.sin(angle)], [0, Math.sin(angle), Math.cos(angle)]];
}

function rotatorY(angle){
    return [[Math.cos(angle), 0, Math.sin(angle)], [0, 1, 0], [-Math.sin(angle), 0, Math.cos(angle)]]
}

function rotatorZ(angle){
    return [[Math.cos(angle), -Math.sin(angle), 0], [Math.sin(angle), Math.cos(angle), 0], [0, 0, 1]]
}


export function rndmNum(min,max){
    return Math.random() * (max-min) + min;
}
export function rndmInt(min,max){
    return Math.floor(Math.random() * (max-min) + min);
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

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16)/255,
      g: parseInt(result[2], 16)/255,
      b: parseInt(result[3], 16)/255
    } : null;
}





