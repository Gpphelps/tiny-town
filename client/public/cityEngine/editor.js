import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';

import { Plot } from './classes.js';
import * as index from './index.js'
import * as ts from './tools.js';
import * as cls from './classes.js'

let editPlot;


//tracks currently selected options from user, kinda like dif states
const process = {
    clickOperation: 'place-commercial',
    defaultHoverMaterial: new THREE.MeshBasicMaterial({color:'yellow', opacity:0.7,transparent:true}),
    hoverMaterial: new THREE.MeshBasicMaterial({color:'yellow', opacity:0.7,transparent:true})
}


const userInput = {
    toolModeButton(e){
        console.log(e.target);
        process.clickOperation = e.target.value;
        if(e.target.dataset.highlight){
            console.log('yuh')
            console.log(e.target.dataset.highlight)
            process.hoverMaterial.color = JSON.parse(e.target.dataset.highlight)
        } else {
            process.hoverMaterial.color = process.defaultHoverMaterial.color
        }
    },
}



//initialzes editor things like the single plot and base
export function init(){
    editPlot = new Plot(0,0,0)
    index.plots.push(editPlot)
    editPlot.buildBase()

    document.querySelector('canvas').addEventListener('mousemove',userHover)
    document.querySelector('canvas').addEventListener('mouseup',userClick)

    initUi()
}


export let blockExportElem;

//RESPONSIBLE FOR PUTTING EVERYTHING INTO REACT CONTAINERS
function initUi(){
    let cont = document.querySelector('#userTools')
    console.log(cont)

    blockExportElem = document.querySelector('#saveText');
    console.log(blockExportElem)

    //code responsible for creating tool buttons programmatically so they can be put into a container created by react
    let buttonTemplates = [
        {
            name: 'Road',
            value: 'place-road',
        },
        {
            name: 'Residential',
            value: 'place-residential',

        },
        {
            name: 'Buisness',
            value: 'place-office'
        },
        {
            name: 'Commercial',
            value: 'place-commercial'
        },
        {
            name: 'Delete',
            value: 'delete-block',
            highlight: '{"r":1,"g":0,"b":0}'

        }

    ]
    buttonTemplates.forEach(button => {
        let elem = document.createElement('button');
        elem.textContent = button.name;
        elem.value = button.value;
        if(button.highlight){
            elem.dataset.highlight = button.highlight
        }

        elem.classList.add('toolButton')
        cont.appendChild(elem)
    })


    let buttons = document.querySelectorAll('.toolButton');
    buttons.forEach(button => button.addEventListener('mousedown', userInput.toolModeButton))

}






let currentHover;

//tracks which mesh in the scene (if any) the cursor is over
//assigns an intersect object with distance and face info
//access intersected mesh with currentHover.object
function userHover(e){

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2()

    mouse.x = (e.clientX/window.innerWidth) * 2 -1;
    mouse.y = -(e.clientY/window.innerHeight) * 2 +1;
    raycaster.setFromCamera(mouse,index.camera);
    let intersects = raycaster.intersectObject(index.scene,true)
    

    //checks to see if the object being currently intersected is not the current hover established last time the function was run
    //if it isnt, ie it isnt being hovered anymore, default material is set
    if(currentHover && intersects[0] != currentHover){
        if(currentHover.object.children.length == 0){
            currentHover.object.material = currentHover.object.defaultMaterial
        } else {
            currentHover.object.children.forEach(child => {
                child.material = child.defaultMaterial;
            })
        }
    }

    if(!intersects[0]){
        currentHover = null;
        return;
    }

    currentHover = intersects[0]

    //if selected object is actually part of a larger block group selects the group object
    if(currentHover.object.parent.blockType){
        currentHover.object = currentHover.object.parent;
    }


    //GLTF objects don't have material themselves but their children do
    //if object has children it gives children the hover material, else if just gives the entire object the hover material
    if(intersects.length > 0){
        if(intersects[0].object.children.length == 0){
            intersects[0].object.material = process.hoverMaterial
        } else {
            intersects[0].object.children.forEach(child => {
                child.material = process.hoverMaterial
            })
        }

    }
}

//tracks user clicks and depending on process mode will act accordingly
function userClick(e){
    if(!currentHover){
        return;
    }

    //cant place things on top of roads so nothing happens on click
    if(currentHover.object.blockType == 'road'){
        return
    }

    const hoverPos = currentHover.object.position

    let place = {x:hoverPos.x,y:hoverPos.y+1,z:hoverPos.z}
    if(process.clickOperation == 'place-road'){
        let newRoad = new cls.Road(editPlot,place.x,place.y,place.z)
        editPlot.blocks[place.x][place.y][place.z] = newRoad;
        newRoad.addToScene()
        console.log(newRoad)
        newRoad.fitToSurroundings(true)
    } 
    if(process.clickOperation == 'place-residential'){
        let newBlock = new cls.Residential(editPlot,place.x,place.y,place.z)
        editPlot.blocks[place.x][place.y][place.z] = newBlock;
        newBlock.addToScene()
        console.log(newBlock)
        newBlock.fitToSurroundings(true)
    }
    if(process.clickOperation == 'place-office'){
        let newBlock = new cls.Office(editPlot,place.x,place.y,place.z);
        editPlot.blocks[place.x][place.y][place.z] = newBlock;
        newBlock.addToScene()
        console.log(newBlock)
        newBlock.fitToSurroundings(true)
    }
    if(process.clickOperation == 'place-commercial'){
        let newBlock = new cls.Commercial(editPlot,place.x,place.y,place.z);
        editPlot.blocks[place.x][place.y][place.z] = newBlock;
        newBlock.addToScene()
        console.log(newBlock)
        newBlock.fitToSurroundings(true)
    }
    if(process.clickOperation == 'delete-block' && currentHover.object.blockType){
        console.log(currentHover.object)
        // index.scene.remove(currentHover.object)
        let x = currentHover.object.position.x;
        let y = currentHover.object.position.y;
        let z = currentHover.object.position.z;
        ts.deleteAtandUp(x,y,z,editPlot.blocks,editPlot)
        // editPlot.blocks[x][y][z] = [];
    }
    let exportable = exportBlocks(editPlot)
    blockExportElem.value = exportable;

}

//bundles all the placed blocks into a stringified array of objects that react can store with a mutation
function exportBlocks(plot){
    let blocks = plot.blocks;

    let exportArray = []

    class Block {
        constructor(type,x,y,z){
            this.type = type;
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    let dimmensions = editPlot.dimmensions
    for(let x=0;x<dimmensions.x; x++){
        for(let y=0;y<dimmensions.y;y++){
            for(let z=0;z<dimmensions.z;z++){
                let inArray = blocks[x][y][z];
                if(inArray.type){
                    let block = new Block(inArray.type,x,y,z);
                    exportArray.push(block)
                }
            }
        }
    }

    return JSON.stringify(exportArray);
}







//STUFF FOR BUTTONS IN UI, WILL PROBS BE REPLACED BY REACT STUFF

// document.querySelector('#road-mode').addEventListener('mousedown', () => process.clickOperation = 'place-road')
// document.querySelector('#residential-mode').addEventListener('mousedown', () => process.clickOperation = 'place-residential')

