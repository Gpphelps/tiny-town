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
    buildCity()
};


function buildCity(){
    let plots = plotData.data.plots;
    plots.forEach(plot => {
        let newPlot = new cls.Plot(plot.plot_position_x,0,plot.plot_position_z);
        newPlot.buildBase();

        builtPlots.push(newPlot)
        plot.buildings.forEach(building => {
            console.log(building)
            newPlot.blocks[building.building_position_x][building.building_position_y][building.building_position_z] 
        })
    })
}