import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';

import * as index from './index.js'
import * as ts from './tools.js';
import * as cls from './classes.js'


let plotData;

let placeholderData = {
    data: {
        plots: [
            {
                plot_position_x: 0,
                plot_position_z: 0,
                buildings: [
                    {
                        name: 'office',
                        building_position_x: 4,
                        building_position_y: 1,
                        building_position_z: 4,
                    },
                    {
                        name: 'office',
                        building_position_x: 4,
                        building_position_y: 2,
                        building_position_z: 4,
                    },
                    {
                        name: 'office',
                        building_position_x: 2,
                        building_position_y: 1,
                        building_position_z: 4,
                    },
                    {
                        name: 'commercial',
                        building_position_x: 2,
                        building_position_y: 1,
                        building_position_z: 5,
                    },
                    {
                        name: 'road',
                        building_position_x: 3,
                        building_position_y: 1,
                        building_position_z: 4,
                    }
                ]
            },
            {
                plot_position_x: 10,
                plot_position_z: 0,
                buildings: [
                    {
                        name: 'office',
                        building_position_x: 4,
                        building_position_y: 1,
                        building_position_z: 4,
                    },
                    {
                        name: 'office',
                        building_position_x: 2,
                        building_position_y: 1,
                        building_position_z: 4,
                    },
                ]
            },

        ]
    }
};


const allPlots = []

export function init(){
    
    // allPlots = document.querySelector('#plotData').textContent;
    plotData = placeholderData;
    buildPlots()
    buildWorld()
    document.querySelector('canvas').addEventListener('mousemove',userHover)
    // document.querySelector('canvas').addEventListener('dblclick', userDoubleClick)

};


async function buildPlots(){
    let plots = plotData.data.plots;
    plots.forEach(plot => {
        let newPlot = new cls.Plot(plot.plot_position_x,0,plot.plot_position_z);
        newPlot.buildBase();
        allPlots.push(newPlot)
        plot.buildings.forEach(building => {

            let newBuilding;
            // if(building.name == 'residential'){
            //     newBuilding = new cls.Residential(newPlot,building.building_position_x,building.building_position_y,building.building_position_z)
            //     newBuilding.addToScene()
            // }
            if(building.name == 'office'){
                newBuilding = new cls.Office(newPlot,building.building_position_x,building.building_position_y,building.building_position_z);
                newBuilding.addToScene()
            }
            if(building.name == 'commercial'){
                newBuilding = new cls.Commercial(newPlot,building.building_position_x,building.building_position_y,building.building_position_z);
                newBuilding.addToScene()
            }
            if(building.name == 'road'){
                newBuilding = new cls.Road(newPlot,building.building_position_x,building.building_position_y,building.building_position_z);
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
}

function buildWorld(){
    const geometry = new THREE.PlaneGeometry(10000,10000);
    const material = new THREE.MeshPhongMaterial( new THREE.MeshPhongMaterial({color:'rgb(0,90,0)'}));
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

function userDoubleClick(e){

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2()

    mouse.x = (e.clientX/window.innerWidth) * 2 -1;
    mouse.y = -(e.clientY/window.innerHeight) * 2 +1;
    raycaster.setFromCamera(mouse,index.camera);
    let intersects = raycaster.intersectObject(index.scene,true)

    let object = intersects[0].object
    console.log(object)

    let selectedPlot;

    if(object.geometry.type != "PlaneGeometry"){
        let x = object.position.x;
        let z = object.position.z;

        allPlots.forEach(plot => {
            if(x >= plot.position.x && x < plot.position.x + plot.dimmensions.x){
                if(z >= plot.position.z && z < plot.position.z + plot.dimmensions.z){
                    selectedPlot = plot;
                }
            }
        })
    }
    console.log(selectedPlot)

    //cloning the popup to remove previous event listeners
    let oldPopup = document.querySelector('#newPlotPopUp')
    let popup = oldPopup.cloneNode(true);
    oldPopup.parentNode.replaceChild(popup,oldPopup)


    popup.style.top = `${e.clientY}px`
    popup.style.left = `${e.clientX}px`
    popup.style.display = 'flex'



    let allButtons = document.querySelectorAll('.plotOption');
    let currentHover;

    console.log(selectedPlot);
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


