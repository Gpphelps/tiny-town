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
                        name: 'residential',
                        building_position_x: 4,
                        building_position_y: 1,
                        building_position_z: 4,
                    },
                    {
                        name: 'residential',
                        building_position_x: 2,
                        building_position_y: 1,
                        building_position_z: 4,
                    },
                ]
            },
            {
                plot_position_x: 10,
                plot_position_z: 0,
                buildings: [
                    {
                        name: 'residential',
                        building_position_x: 4,
                        building_position_y: 1,
                        building_position_z: 4,
                    },
                    {
                        name: 'residential',
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
            if(building.name == 'residential'){
                newBuilding = new cls.Residential(newPlot,building.building_position_x,building.building_position_y,building.building_position_z)
                newBuilding.addToScene()
            }
            newPlot.blocks[building.building_position_x][building.building_position_y][building.building_position_z] = newBuilding
        })
    })
}

function buildWorld(){
    const geometry = new THREE.PlaneGeometry(100,100);
    const material = new THREE.MeshPhongMaterial( new THREE.MeshPhongMaterial({color:'rgb(0,90,0)'}));
    const plane = new THREE.Mesh(geometry,material);

    plane.receiveShadow = true;
    plane.position.y = 0.5
    plane.rotation.x = -Math.PI/2
    index.scene.add(plane)
}