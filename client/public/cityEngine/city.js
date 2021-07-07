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


const builtPlots = []

export function init(){
    
    // allPlots = document.querySelector('#plotData').textContent;
    plotData = placeholderData;
    buildPlots()
    buildWorld()
};


async function buildPlots(){
    let plots = plotData.data.plots;
    plots.forEach(plot => {
        let newPlot = new cls.Plot(plot.plot_position_x,0,plot.plot_position_z);
        newPlot.buildBase();
        builtPlots.push(newPlot)
        plot.buildings.forEach(building => {
            console.log(building)
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

    builtPlots.forEach(plot => {
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
    plane.position.y = 0.5
    plane.rotation.x = -Math.PI/2
    index.scene.add(plane)
}

