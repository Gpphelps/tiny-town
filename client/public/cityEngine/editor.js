import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';

import { Plot } from './classes.js';
import * as index from './index.js'
import * as ts from './tools.js';
import * as cls from './classes.js'

let editPlot;


//tracks currently selected options from user, kinda like dif states
const process = {
    clickOperation: 'place-residential',
}


const userInput = {
    toolModeButton(e){
        console.log(e.target);
        process.clickOperation = e.target.value;
    },
}



//initialzes editor things like the single plot and base
export function init(){
    editPlot = new Plot(0,0,0)
    index.plots.push(editPlot)
    editPlot.buildBase()

    document.querySelector('canvas').addEventListener('mousemove',userHover)
    document.querySelector('canvas').addEventListener('mousedown',userClick)

    initUi()
}

function initUi(){
    let cont = document.querySelector('#userTools')
    console.log(cont)


    //code responsible for creating tool buttons programmatically so they can be put into a container created by react
    let buttonTemplates = [
        {
            name: 'Road',
            value: 'place-road'
        },
        {
            name: 'Residential',
            value: 'place-residential'
        }
    ]
    buttonTemplates.forEach(button => {
        let elem = document.createElement('button');
        elem.textContent = button.name;
        elem.value = button.value;
        elem.classList.add('toolButton')
        cont.appendChild(elem)
    })


    let buttons = document.querySelectorAll('.toolButton');
    buttons.forEach(button => button.addEventListener('mousedown', userInput.toolModeButton))

}


document.querySelector('body').addEventListener('keydown',function(e){
    if(e.key != "x"){
        return
    }

    if(process.clickOperation == 'place-residential'){
        process.clickOperation = 'place-road'
    } else {
        process.clickOperation = 'place-residential'
    }
})




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
        currentHover.object.material = currentHover.object.defaultMaterial
    }

    currentHover = intersects[0]
    if(intersects.length > 0){
        intersects[0].object.material = new THREE.MeshPhongMaterial({color:`yellow`})
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
}






//STUFF FOR BUTTONS IN UI, WILL PROBS BE REPLACED BY REACT STUFF

// document.querySelector('#road-mode').addEventListener('mousedown', () => process.clickOperation = 'place-road')
// document.querySelector('#residential-mode').addEventListener('mousedown', () => process.clickOperation = 'place-residential')