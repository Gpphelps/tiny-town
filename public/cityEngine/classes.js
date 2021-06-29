import * as index from './index.js'
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import * as ts from './tools.js'
import * as load from './loader.js'

//class responsible for every plot of land on map/editor
export class Plot {
    constructor(x,y,z){
        this.position = {x:x,y:y,z:z};
        //array holding all base block meshes
        this.base = [];
        this.blocks = [];
        this.defaultMaterial =  new THREE.MeshToonMaterial({color:'rgb(0,90,0)'});
        this.dimmensions = {x:10,y:7,z:10};
    }
    //initializes the plots blockArray
    //builds grid of base blocks and puts all in this.base array
    buildBase(){
        ts.plotArrayInit(this.blocks,this.dimmensions)
        for(let x=0;x<this.dimmensions.x;x++){
            for(let z=0;z<this.dimmensions.z;z++){
                let baseGeometry = new THREE.BoxGeometry(1,1,1);
                let baseMaterial = this.defaultMaterial;
                let baseMesh = new THREE.Mesh(baseGeometry,baseMaterial);
                baseMesh.receiveShadow = true;
                this.base.push(baseMesh)
                index.scene.add(baseMesh)
                baseMesh.defaultMaterial = this.defaultMaterial
                baseMesh.position.set(this.position.x+x,this.position.y,this.position.z+z)
            }
        }
    }
}


export class Road {
    constructor(parent,x,y,z){
        this.type = 'road'
        this.parent = parent,
        this.relativePos = {x:x,y:y,z:z},
        this.defaultMaterial = new THREE.MeshToonMaterial({color:'rgb(40,40,40)'})
    }
    addToScene(){
        console.log(load.imported.road2Way)

        //imports default material
        this.defaultMaterial = load.imported.road2WayMat

        //creates new basic mesh
        this.obj = new THREE.Mesh()

        this.obj.blockType = 'road'
        //sets mesh geometry to the geometry of the road2Way model
        //allows entirely new mesh to be made instead of being reference to imported road mesh
        this.obj.geometry = load.imported.road2Way.geometry
        console.log(this.obj)
        index.scene.add(this.obj)

        this.obj.scale.x = 0.5
        this.obj.scale.y = 0.5
        this.obj.scale.z = 0.5

        this.obj.material = this.defaultMaterial
        this.obj.defaultMaterial = this.defaultMaterial
        console.log(this.obj.defaultMaterial)
        //positioning in scene is calculated relative to placed coords and the coords of the parent
        let absX = this.relativePos.x + this.parent.position.x;
        let absY = this.relativePos.y + this.parent.position.y;
        let absZ = this.relativePos.z + this.parent.position.z;
    
        this.obj.position.set(absX,absY,absZ)
        // this.obj.castShadow = true;
        this.obj.receiveShadow = true;
    }
    fitToSurroundings(original){
        let pos = this.relativePos
        let plusX = this.parent.blocks[pos.x+1][pos.y][pos.z]
        let minusX = this.parent.blocks[pos.x-1][pos.y][pos.z]
        let plusY = this.parent.blocks[pos.x][pos.y+1][pos.z]
        let minusY = this.parent.blocks[pos.x][pos.y-1][pos.z]
        let plusZ = this.parent.blocks[pos.x][pos.y][pos.z+1]
        let minusZ = this.parent.blocks[pos.x][pos.y][pos.z-1]

        let around = [plusX,minusX,plusY,minusY,plusZ,minusZ]

        let roadsAround = 0;
        around.forEach(block => {
            if(block.type == 'road'){
                roadsAround++
            }
        })
        console.log(roadsAround)

        //logic for various arrangements of roads
        //PROBABLY BETTER WAY TO DO THIS, SHOULD FIGURE THAT OUT
        if(roadsAround === 1){
            if(plusX.type == 'road' || minusX.type == 'road'){
                console.log('roads to x')
                this.obj.rotation.y = Math.PI/2
            }
        }

        this.obj.scale.x = 0.5;

        if(roadsAround === 2){
            if(plusX.type == 'road' && minusX.type == 'road'){
                console.log('roads to x')
                this.obj.rotation.y = Math.PI/2
            } else if (plusX.type == 'road' && plusZ.type == 'road'){
                this.obj.geometry = load.imported.roadCorner.geometry;
                this.obj.material = load.imported.roadCornerMat;
                this.obj.rotation.y = Math.PI
            } else if (minusX.type == 'road' && plusZ.type == 'road'){
                this.obj.geometry = load.imported.roadCorner.geometry;
                this.obj.material = load.imported.roadCornerMat;
                this.obj.rotation.y = Math.PI;
                this.obj.scale.x *= -1
            } else if (plusX.type == 'road' && minusZ.type == 'road'){
                this.obj.geometry = load.imported.roadCorner.geometry;
                this.obj.material = load.imported.roadCornerMat;
                this.obj.rotation.y = -Math.PI/2;
            } else if (minusX.type == 'road' && minusZ.type == 'road'){
                this.obj.geometry = load.imported.roadCorner.geometry;
                this.obj.material = load.imported.roadCornerMat;
                this.obj.rotation.y = Math.PI/2;
                this.obj.scale.x *= -1
            }
        }

        if(roadsAround === 3){
            this.obj.geometry = load.imported.road3Way.geometry
            if(minusX.type != 'road'){
                this.obj.rotation.y = Math.PI;
            } else if (plusZ.type != 'road'){
                this.obj.rotation.y = -Math.PI/2
            } else if (minusZ.type != 'road'){
                this.obj.rotation.y = Math.PI/2
            }
        }

        if(roadsAround === 4){
            this.obj.geometry = load.imported.road4Way.geometry
        }


        //prevents endless loops of fitting, only the originally placed one will cause surroundings to fit
        if(original){
            //runs this function for all surrounding roads to adjust to new context if needed
            around.forEach(block => {
                if(block.type == 'road'){
                    block.fitToSurroundings(false)
                }
            })
        }


    }
}


export class Building {
    constructor(parent,x,y,z){
        this.parent = parent,
        this.relativePos = {x:x,y:y,z:z},
        this.type = 'building',
        this.defaultMaterial = new THREE.MeshToonMaterial({color:'blue'}),
        this.defaultGeometry = new THREE.BoxGeometry(1,1,1)
    }
    addToScene(){

        //plot array consists of 6 y levels but 6th level only there to prevent glitches with fitToSurroundings
            //users shouldnt be able to place on level 6 so it returns if that happens
            //in the future this should trigger alert saying that user has reached max height
        if(this.relativePos.y > 5){
            return;
        }

        this.obj = new THREE.Mesh()
        this.obj.blockType = this.type
        this.obj.geometry = this.defaultGeometry
        this.obj.material = this.defaultMaterial
        this.obj.defaultMaterial = this.obj.material;
        // this.obj.material = new THREE.MeshPhongMaterial({color:'orange'});
        // this.obj.defaultMaterial = new THREE.MeshPhongMaterial({color:'orange'});

        //x scale is slightly decreased to give space between buildings
        this.obj.scale.x = 0.48
        this.obj.scale.y = 0.5
        this.obj.scale.z = 0.5

        console.log(this.obj)
        index.scene.add(this.obj)

        let absX = this.relativePos.x + this.parent.position.x;
        let absY = this.relativePos.y + this.parent.position.y;
        let absZ = this.relativePos.z + this.parent.position.z;
    
        this.obj.position.set(absX,absY,absZ);
        this.obj.castShadow = true;
        this.obj.receiveShadow = true;
    }
    fitToSurroundings(original){
        let pos = this.relativePos
        let plusX = this.parent.blocks[pos.x+1][pos.y][pos.z]
        let minusX = this.parent.blocks[pos.x-1][pos.y][pos.z]
        let plusY = this.parent.blocks[pos.x][pos.y+1][pos.z]
        let minusY = this.parent.blocks[pos.x][pos.y-1][pos.z]
        let plusZ = this.parent.blocks[pos.x][pos.y][pos.z+1]
        let minusZ = this.parent.blocks[pos.x][pos.y][pos.z-1]

        let around = [plusX,minusX,plusY,minusY,plusZ,minusZ]

        let blocksAround = 0;
        around.forEach(block => {
            if(block.type == 'residential'){
                blocksAround++
            }
        })
        console.log(blocksAround)

        //logic for different arrangements of surrounding buildings
        // two levels of differentiation
            // 1. seperates cases based off of total number of blocks around
            // 2. in each block count case gives possibly cases and adjusts geometry and material accordingly
        // if(blocksAround === 1){
        //     if(minusY.type === 'residential'){
        //         this.obj.geometry = load.imported.residentialBasicRoof.geometry;
        //         //need to be sure to change both the objects material and its default material
        //         this.obj.material = load.imported.residentialBasicRoofMat;
        //         this.obj.defaultMaterial = this.obj.material
        //     }
        // }
        // if(blocksAround === 2){
        //     if(minusY.type === 'residential' && plusY.type === 'residential'){
        //         this.obj.geometry = load.imported.residentialBasicFloor.geometry;
        //         this.obj.material = load.imported.residentialBasicFloorMat;
        //         this.obj.defaultMaterial = this.obj.material
        //     }
        // }


        //orients buildings to nearby road
            //aligns in order of preference so if a block has roads at
            //plusX and minusX it orients to plusX which is towards the default
            //camera position and doesnt orient to minusX
        if(plusX.type == 'road'){
            this.obj.rotation.y = Math.PI/2
        } else if (plusZ.type == 'road'){
        } else if (minusX.type == 'road'){
            this.obj.rotation.y = -Math.PI/2
        } else if (minusZ.type == 'road'){
            this.obj.rotation.y = Math.PI
        }

        if(minusY.type === 'residential' && plusY.type != 'residential'){
                this.obj.geometry = load.imported.residentialBasicRoof.geometry;
                //need to be sure to change both the objects material and its default material
                this.obj.material = load.imported.residentialBasicRoofMat;
                this.obj.defaultMaterial = this.obj.material;

                //aligns block with block below it so facing same direction
                this.obj.rotation.y = minusY.obj.rotation.y 
        } else if (minusY.type === 'residential' && plusY.type === 'residential'){
                this.obj.geometry = load.imported.residentialBasicFloor.geometry;
                this.obj.material = load.imported.residentialBasicFloorMat;
                this.obj.defaultMaterial = this.obj.material
                this.obj.rotation.y = minusY.obj.rotation.y 
        }





        //prevents endless loops of fitting, only the originally placed one will cause surroundings to fit
        if(original){
            //runs this function for all surrounding roads to adjust to new context if needed
            around.forEach(block => {
                if(block.type == 'residential'){
                    block.fitToSurroundings(false)
                }
            })
        }


    }
}


export class Residential extends Building {
    constructor(parent,x,y,z){
        super(parent,x,y,z),
        this.type = 'residential',
        this.defaultMaterial = load.imported.residentialBasicGroundMat,
        this.defaultGeometry = load.imported.residentialBasicGround.geometry,
        
        this.floors = {
            material: load.imported.residentialBasicFloor,
            geometry: load.imported.residentialBasicFloorMat
        }
    }
}
