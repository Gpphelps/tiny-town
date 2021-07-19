
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

    let baseColor

    obj.children.forEach((mesh,index) => {
        let geometry = mesh.geometry;
        
        if(geometry.attributes.color){
            delete geometry.attributes.color;
        }
        // console.log(mesh)
        let matrix = new THREE.Matrix4();
        let position = new THREE.Vector3();
        let rotation = new THREE.Euler();
        let quaternion = new THREE.Quaternion();
        let scale = new THREE.Vector3();

        position.x = mesh.position.x;
        position.y = mesh.position.y;
        position.z = mesh.position.z;

        quaternion.setFromEuler( mesh.rotation, false);

        scale.x = mesh.scale.x;
        scale.y = mesh.scale.y;
        scale.z = mesh.scale.z;

        matrix.compose( position, quaternion, scale);

        let vertexColors = []

        for(var i=0;i<geometry.attributes.position.count;i++){
                vertexColors.push(mesh.material.color.r)
                vertexColors.push(mesh.material.color.g)
                vertexColors.push(mesh.material.color.b)
        }

        if(index == 0){
            baseColor = mesh.material.color;
        }

        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(vertexColors),3));


        geometry.applyMatrix4(matrix);
        geometries.push(geometry);
    })

    let merged = BufferGeometryUtils.mergeBufferGeometries(geometries, false)

    let newMesh = new THREE.Mesh(merged, new THREE.MeshPhongMaterial({vertexColors: true, side: THREE.DoubleSide}));
    newMesh.material.receiveShadow = false;
    // newMesh.material.baseOriginalColor = baseColor;

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
        if(inArray.deleteable == false){
            return
        }
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
    // console.log(mesh)
    let obj = new THREE.Mesh()
    obj.geometry = mesh.geometry;
    obj.material = mesh.material;


    return obj
}



export const exporter = {
    edgeRoadBoolean(value){
        document.querySelector('#edgeRoadBoolean').value = value;
    },
    blockData(data){
        document.querySelector('#saveText').value = data;
    },
    adjacentRoads(data){
        console.log(data)
        localStorage.setItem('plusXRoads',data.pxData)
        localStorage.setItem('minusXRoads',data.mxData)
        localStorage.setItem('plusZRoads',data.pzData)
        localStorage.setItem('minusZRoads',data.mzData)
    }
}



export function whichPlot(selectedObjectCoords,allPlots){
    let selectedPlot;

    let x = selectedObjectCoords.x;
    let z = selectedObjectCoords.z;

    allPlots.forEach(plot => {
        if(x >= plot.position.x && x < plot.position.x + plot.dimmensions.x){
            if(z >= plot.position.z && z < plot.position.z + plot.dimmensions.z){
                selectedPlot = plot;
            }
        }
    })

    if(selectedPlot){
        return selectedPlot;
    } else {
        return null;
    }
}

export function plotsAround(selectedPlot,allPlots){

    console.log(selectedPlot)

    let plotPos = selectedPlot.position;
    let pd = selectedPlot.dimmensions;

    let plusX = whichPlot({x:plotPos.x+pd.x,z:plotPos.z},allPlots);
    let minusX = whichPlot({x:plotPos.x-pd.x,z:plotPos.z},allPlots);
    let plusZ = whichPlot({x:plotPos.x,z:plotPos.z+pd.z},allPlots);
    let minusZ = whichPlot({x:plotPos.x,z:plotPos.z-pd.z},allPlots);

    return {
        plusX: plusX,
        minusX: minusX,
        plusZ: plusZ,
        minusZ: minusZ,
    }



}

export function findAndStoreAdjacentRoads(surroundingPlots){
    console.log(surroundingPlots)
    let plusXRoads = null;
    let minusXRoads = null;
    let plusZRoads = null;
    let minusZRoads = null;

    if(surroundingPlots.plusX){
        plusXRoads = surroundingPlots.plusX.checkEdgesForRoads().leftArray;
    }
    if(surroundingPlots.minusX){
        minusXRoads = surroundingPlots.minusX.checkEdgesForRoads().Array;
    }
    if(surroundingPlots.plusZ){
        plusZRoads = surroundingPlots.plusZ.checkEdgesForRoads().topArray;
    }
    if(surroundingPlots.minusZ){
        minusZRoads = surroundingPlots.minusZ.checkEdgesForRoads().bottomArray;
    }
    console.log(minusZRoads)

    let pxData = []
    let mxData = []
    let pzData = []
    let mzData = []

    if(plusXRoads){
        plusXRoads.forEach(road => {
            pxData.push(road.relativePos)
        })
    }
    if(minusXRoads){
        minusXRoads.forEach(road => {
            mxData.push(road.relativePos)
        })
    }
    if(plusZRoads){
        plusZRoads.forEach(road => {
            pzData.push(road.relativePos)
        })
    }
    if(minusZRoads){
        minusZRoads.forEach(road => {
            mzData.push(road.relativePos);
        })
    }


    pxData = JSON.stringify(pxData)
    mxData = JSON.stringify(mxData)
    pzData = JSON.stringify(pzData)
    mzData = JSON.stringify(mzData)

    let data = {
        pxData,
        mxData,
        pzData,
        mzData
    }
    

    exporter.adjacentRoads(data)
}






