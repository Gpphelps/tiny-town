
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

    return newChildren;
}


export function mergeGeometry(obj){
    
    let geometries = []
    obj.children.forEach((mesh,index) => {
        let meshGeo = mesh.geometry;
        let meshPos = mesh.position;
        let meshRot = mesh.rotation;
        let meshColor = mesh.material.color;

        // meshRot = meshRot.setFromVector3(new THREE.Vector3(0,0,0),'XYZ')
        // console.log(meshRot)
        // meshGeo.translate(meshPos.x+1,meshPos.y+1,meshPos.z+1)

        let signs = {
            w: 1,
            x: 1,
            y: 1,
            w: 1,
        }


        let quart = new THREE.Quaternion();
        quart.setFromEuler(meshRot);

        if(quart.w < 0){
            signs.w = -1
        }
        if(quart.x < 0){
            signs.x = -1
        }
        if(quart.y < 0){
            signs.y = -1
        }
        if(quart.z < 0){
            signs.z = -1
        }



        // quart.w = Math.abs(quart.w)
        // quart.x = Math.abs(quart.x)
        // quart.y = Math.abs(quart.y)
        // quart.z = Math.abs(quart.z)

        quart.w = 0
        quart.x = 0.707
        quart.y = 0
        quart.z = -0.707



        quart.set(quart.w,quart.x,quart.y,quart.z);

        meshRot.setFromQuaternion(quart)

        // meshRot.set(meshRot.x,meshRot.y,meshRot.z)


        let movedPos = []
        let vertexColors = []
        for(let i=0;i<meshGeo.attributes.position.array.length;i+=3){
            let x = meshGeo.attributes.position.array[i]
            let y = meshGeo.attributes.position.array[i+1]
            let z = meshGeo.attributes.position.array[i+2]


            let point = [x,y,z];

            //scaling
            point[0] = point[0] * mesh.scale.x
            point[1] = point[1] * mesh.scale.y
            point[2] = point[2] * mesh.scale.z

            //rotating

            point = math.multiply(point,rotatorX(meshRot.x));
            point = math.multiply(point,rotatorY(meshRot.y));
            point = math.multiply(point,rotatorZ(meshRot.z));
            // point = math.multiply(point,rotatorX(meshRot.x));
            // point = math.multiply(point,rotatorY(meshRot.y));


            let rotatedX = point[0]
            let rotatedY = point[1]
            let rotatedZ = point[2]

            vertexColors.push(meshColor.r)
            vertexColors.push(meshColor.g)
            vertexColors.push(meshColor.b)

            //moving
            let newX = (rotatedX) + meshPos.x 
            let newY = (rotatedY) + meshPos.y
            let newZ = (rotatedZ) + meshPos.z
            // let newX = (rotatedX) + index
            // let newY = (rotatedY)
            // let newZ = (rotatedZ)
   
            movedPos.push(newX)
            movedPos.push(newY)
            movedPos.push(newZ)

        }

        meshGeo.attributes.position.array.set(movedPos)
        meshGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(vertexColors),3));

        geometries.push(mesh.geometry)
    })

    let merged = BufferGeometryUtils.mergeBufferGeometries(geometries, false)

    let newMesh = new THREE.Mesh(merged, new THREE.MeshPhongMaterial({vertexColors: true}));

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


export function copyToNewMesh(mesh){

    let obj = new THREE.Mesh()
    obj.geometry = mesh.geometry;
    obj.material = mesh.material;


    return obj
}






