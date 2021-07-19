import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';

import * as index from './index.js'
import * as ts from './tools.js';
import * as cls from './classes.js'


let plotData;

const allPlots = []

export async function init(){
    
    //waits until react has put the data in the text area
    await ts.domWait(document.querySelector('#plotData'))
    plotData = JSON.parse(document.querySelector('#plotData').value)
    console.log(plotData)
    buildPlots()
    buildWorld()
    document.querySelector('canvas').addEventListener('mousemove',userHover);
    document.querySelector('canvas').addEventListener('dblclick', userDoubleClick);


    //clearing old local storage items
    localStorage.setItem('plusXRoads','[]')
    localStorage.setItem('minusXRoads','[]')
    localStorage.setItem('plusZRoads','[]')
    localStorage.setItem('minusZRoads','[]')

    console.log(index.renderer.info.render)
};



async function buildPlots(){

    let wait = await ts.wait(600)

    let city = plotData.city

    let plots = []


    city.forEach(user => {
        let userPlots = user.plot
        userPlots.forEach(plot => {
            plots.push(plot)
        })
    })

    console.log(plots)
    plots.forEach(plot => {

        let newPlot = new cls.Plot(plot.plot_position_x,0,plot.plot_position_z);

        newPlot.buildBase();
        allPlots.push(newPlot)
        plot.buildings.forEach(building => {

            let newBuilding;
            if(building.type == 'residential'){
                newBuilding = new cls.Residential(newPlot,building.building_position_x,building.building_position_y,building.building_position_z)
                newBuilding.addToScene()
            }
            if(building.type == 'office'){
                newBuilding = new cls.Office(newPlot,building.building_position_x,building.building_position_y,building.building_position_z);
                newBuilding.addToScene()
            }
            if(building.type == 'commercial'){
                newBuilding = new cls.Commercial(newPlot,building.building_position_x,building.building_position_y,building.building_position_z);
                newBuilding.addToScene()
            }
            if(building.type == 'road'){
                newBuilding = new cls.Road(newPlot,building.building_position_x,building.building_position_y,building.building_position_z);
                newBuilding.addToScene()
            }
            if(building.type == 'park'){
                newBuilding = new cls.Park(newPlot,building.building_position_x,building.building_position_y,building.building_position_z);
                newBuilding.addToScene()
            }
            newPlot.blocks[building.building_position_x][building.building_position_y][building.building_position_z] = newBuilding
        })
    })

    allPlots.forEach(plot => {
        for(var x=0;x<plot.dimmensions.x;x++){
            for(var y=0;y<plot.dimmensions.y;y++){
                for(var z=0;z<plot.dimmensions.z;z++){
                    let blockAtIndex = plot.blocks[x][y][z];
                    if(blockAtIndex.type){
                        blockAtIndex.fitToSurroundings(false)
                    }
                }
            }
        }
    })
    console.log(allPlots)
}

function buildWorld(){
    const geometry = new THREE.PlaneGeometry(10000,10000);
    const material = new THREE.MeshStandardMaterial(({color:'rgb(0,90,0)',roughness:1}));
    material.side = THREE.DoubleSide;
    const plane = new THREE.Mesh(geometry,material);

    plane.receiveShadow = true;
    plane.position.y = 0.499
    plane.rotation.x = -Math.PI/2
    index.scene.add(plane)
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
    
    // console.log(intersects[0])
  
}


let selectedPlot;

function userDoubleClick(e){


    //casting ray, making sure it isn't hitting the plane
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2()

    mouse.x = (e.clientX/window.innerWidth) * 2 -1;
    mouse.y = -(e.clientY/window.innerHeight) * 2 +1;
    raycaster.setFromCamera(mouse,index.camera);
    let intersects = raycaster.intersectObject(index.scene,true)

    if(intersects.length == 0 || intersects[0].object.geometry.type == "PlaneGeometry"){
        return
    }

    let object = intersects[0].object
    console.log(object)


    //figuring out which plot is the one that was clicked and getting adjacent roads
    selectedPlot = ts.whichPlot({x:object.position.x,z:object.position.z},allPlots)
    // let plotsAround = ts.plotsAround(selectedPlot,allPlots)
    // console.log(plotsAround)
    // let adjacentRoads = ts.findAndStoreAdjacentRoads(plotsAround)

    //code to take the react popup and make buttons highlight the new plots

    //cloning the popup to remove previous event listeners
    let oldPopup = document.querySelector('#newPlotPopUp')
    let popup = oldPopup.cloneNode(true);
    oldPopup.parentNode.replaceChild(popup,oldPopup)


    popup.style.top = `${e.clientY}px`
    popup.style.left = `${e.clientX}px`
    popup.style.display = 'flex'

    //resetting styling and stuff in the case that it was hidden earlier
    document.querySelectorAll('.plotOption').forEach(button => {
        button.style.backgroundColor = 'rgba(50,50,50,255)';
        button.style.border = '1px solid rgb(30,30,30)';
        button.classList.add('activeOption');
        button.parentElement.setAttribute('href','/editor');
        button.style.color = 'yellow';
    })

    //hiding buttons if there is a plot in their area
    let plotsAround = ts.plotsAround(selectedPlot,allPlots);
    console.log(plotsAround)
    if(plotsAround.plusX != null){
        let button = document.querySelector('#plotPlusX');
        button.style.backgroundColor = 'rgba(0,0,0,0)';
        button.style.color = 'rgba(0,0,0,0)';
        button.style.border = 'none';
        button.classList.remove('activeOption')
        button.parentElement.setAttribute('href','/')
        button.cursor = 'default'
    }
    if(plotsAround.minusX != null){
        let button = document.querySelector('#plotMinusX');
        button.style.backgroundColor = 'rgba(0,0,0,0)';
        button.style.color = 'rgba(0,0,0,0)';
        button.style.border = 'none';
        button.classList.remove('activeOption')
        button.parentElement.setAttribute('href','/')
        button.cursor = 'default'
    }
    if(plotsAround.plusZ != null){
        let button = document.querySelector('#plotPlusZ');
        button.style.backgroundColor = 'rgba(0,0,0,0)';
        button.style.color = 'rgba(0,0,0,0)';
        button.style.border = 'none';
        button.classList.remove('activeOption')
        button.parentElement.setAttribute('href','/')
        button.cursor = 'default'
    }
    if(plotsAround.minusZ != null){
        let button = document.querySelector('#plotMinusZ');
        button.style.backgroundColor = 'rgba(0,0,0,0)';
        button.style.color = 'rgba(0,0,0,0)';
        button.style.border = 'none';
        button.classList.remove('activeOption')
        button.parentElement.setAttribute('href','/')
        button.cursor = 'default'
    }


    let allButtons = document.querySelectorAll('.activeOption');
    let currentHover;

    allButtons.forEach(button => {
        let highlightMesh;
        button.addEventListener('mousedown',function(e){
            let id = e.target.getAttribute('id');

            let pos = selectedPlot.position;
            let plotX;
            let plotZ;

            if(id == 'plotMinusZ'){
                plotX = pos.x;
                plotZ = pos.z - selectedPlot.dimmensions.z;
            } else if (id == 'plotPlusZ'){
                plotX = pos.x;
                plotZ = pos.z + selectedPlot.dimmensions.z;
            } else if (id == 'plotMinusX'){
                plotX = pos.x - selectedPlot.dimmensions.x;
                plotZ = pos.z;
            } else if (id == 'plotPlusX'){
                plotX = pos.x + selectedPlot.dimmensions.x;
                plotZ = pos.z;
            }
            localStorage.setItem('plotX',plotX)
            localStorage.setItem('plotZ',plotZ)
        })
        button.addEventListener('mouseenter',function(e){

            //sets the data roads around stuff in localStorage, needs to be here to have it reference the right coordinates
            adjacentRoadDataToStorage(e.target)



            let x = e.clientX;
            let y = e.clientY;
            let coords = button.getBoundingClientRect()
            if(x >= coords.left-5 && x <= coords.right && y >= coords.top-5 && y <= coords.bottom){
                currentHover = button;
                let id = button.getAttribute('id')
                highlightMesh = new THREE.Mesh()
                highlightMesh.geometry = new THREE.BoxGeometry(selectedPlot.dimmensions.x,2,selectedPlot.dimmensions.z);
                highlightMesh.material = new THREE.MeshPhongMaterial({
                    color: 'yellow',
                    opacity: 0.3,
                    transparent: true
                })
                if(id == 'plotMinusX'){
                    let x = selectedPlot.position.x - 5.5;
                    let z = selectedPlot.position.z + 4.5;
                    highlightMesh.position.x = x;
                    highlightMesh.position.z = z;
                } else if (id == 'plotPlusX'){
                    let x = selectedPlot.position.x + 15;
                    let z = selectedPlot.position.z + 4.5;
                    highlightMesh.position.x = x;
                    highlightMesh.position.z = z;
                } else if (id == 'plotMinusZ'){
                    let x = selectedPlot.position.x + 4.5;
                    let z = selectedPlot.position.z - 5.5;
                    highlightMesh.position.x = x;
                    highlightMesh.position.z = z;
                } else if (id == 'plotPlusZ'){
                    let x = selectedPlot.position.x + 4.5;
                    let z = selectedPlot.position.z + 15;
                    highlightMesh.position.x = x;
                    highlightMesh.position.z = z;
                }
                index.scene.add(highlightMesh);

            }
        })
        button.addEventListener('mouseleave',function(e){
            index.scene.remove(highlightMesh)
        })
    })
}




function adjacentRoadDataToStorage(target){

    let newCoords;
    let spDim = selectedPlot.dimmensions;
    let spPos = selectedPlot.position

    if(target.getAttribute('id') == 'plotPlusX'){
        newCoords = {x:spPos.x+spDim.x,y:spPos.y,z:spPos.z}
    }
    if(target.getAttribute('id') == 'plotMinusX'){
        newCoords = {x:spPos.x-spDim.x,y:spPos.y,z:spPos.z}
    }
    if(target.getAttribute('id') == 'plotPlusZ'){
        newCoords = {x:spPos.x,y:spPos.y,z:spPos.z+spDim.z}
    }
    if(target.getAttribute('id') == 'plotMinusZ'){
        newCoords = {x:spPos.x,y:spPos.y,z:spPos.z-spDim.z}
    }

    console.log(newCoords)

    let newPlotData = {
        position: newCoords,
        dimmensions: spDim,
    }

    let plotsAround = ts.plotsAround(newPlotData,allPlots)
    console.log(plotsAround)
    let adjacentRoads = ts.findAndStoreAdjacentRoads(plotsAround)
}