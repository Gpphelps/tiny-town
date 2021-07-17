import * as index from './index.js'
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import * as ts from './tools.js'
import * as load from './loader.js'
import * as editor from './editor.js'

//class responsible for every plot of land on map/editor
export class Plot {
    constructor(x,y,z){
        this.position = {x:x,y:y,z:z};
        //array holding all base block meshes
        this.base = [];
        this.baseGroup;
        this.blocks = [];
        this.defaultMaterial =  new THREE.MeshStandardMaterial({color:'rgb(0,90,0)', roughness:1});
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

    checkEdgesForRoads(mode){
        let leftSide = false;
        let rightSide = false;
        let topSide = false;
        let bottomSide = false;

        let leftArray = []
        let rightArray = []
        let topArray = []
        let bottomArray = []

        for(let x=0;x<this.dimmensions.x;x++){
            // console.log(this.blocks[x][1][0])
            if(this.blocks[x][1][0].type == 'road'){
                topSide = true;
                topArray.push(this.blocks[x][1][0])
            }
            if(this.blocks[x][1][this.dimmensions.x-1].type == 'road'){
                bottomSide = true;
                bottomArray.push(this.blocks[x][1][this.dimmensions.x-1])
            }
        }

        for(let z=0;z<this.dimmensions.z;z++){
            if(this.blocks[0][1][z].type == 'road'){
                leftSide = true;
                leftArray.push(this.blocks[0][1][z])
            }
            if(this.blocks[this.dimmensions.z-1][1][z].type == 'road'){
                rightSide = true;
                rightArray.push(this.blocks[this.dimmensions.x-1][1][z])
            }
        }

        // console.log(topSide,bottomSide,leftSide,rightSide)

        if(mode == 'boolean'){
            if(leftSide && rightSide && topSide && bottomSide){
                return true;
            } else {
                return false;
            }
        } else {
            return {
                leftArray,
                rightArray,
                topArray,
                bottomArray
            }
        }

    }

    buildInAdjacentRoads(){
        let pxRoads =  JSON.parse(localStorage.getItem('plusXRoads'))
        let mxRoads =  JSON.parse(localStorage.getItem('minusXRoads'))
        let pzRoads =  JSON.parse(localStorage.getItem('plusZRoads'))
        let mzRoads =  JSON.parse(localStorage.getItem('minusZRoads'))

        console.log(pxRoads,mxRoads,pzRoads,mzRoads);

        pxRoads.forEach(road => {
            let newRoad = new Road(editor.editPlot,this.dimmensions.x-1,road.y,road.z);
            newRoad.deleteable = false
            newRoad.addToScene()
            newRoad.fitToSurroundings()
        })

        mxRoads.forEach(road => {
            let newRoad = new Road(editor.editPlot,0,road.y,road.z);
            newRoad.deleteable = false
            newRoad.addToScene()
            newRoad.fitToSurroundings()
        })

        pzRoads.forEach(road => {
            let newRoad = new Road(editor.editPlot,road.x,road.y,this.dimmensions.z-1);
            newRoad.deleteable = false
            newRoad.addToScene()
            newRoad.fitToSurroundings()
        }) 

        mzRoads.forEach(road => {
            let newRoad = new Road(editor.editPlot,road.x,road.y,0);
            newRoad.deleteable = false
            newRoad.addToScene()
            newRoad.fitToSurroundings()
        }) 
    }
}


export class Road {
    constructor(parent,x,y,z){
        this.type = 'road'
        this.parent = parent,
        this.relativePos = {x:x,y:y,z:z},
        this.defaultMaterial = new THREE.MeshToonMaterial({color:'rgb(40,40,40)'})
        this.defaultObj = load.imported.road2Way;
        this.baseColor = {r:1,g:1,b:1}

        this.threeWay = load.imported.road3Way;
        this.fourWay = load.imported.road4Way;
        this.corner = load.imported.roadCorner;

        this.allowFit = true;
    }
    addToScene(){

        //imports default material
        this.defaultMaterial = load.imported.road2WayMat

        //creates new basic mesh
        this.obj = ts.copyToNewMesh(this.defaultObj)
        this.obj.blockType = this.type
        this.obj.defaultMaterial = this.obj.material

        this.obj.scale.x = 0.5
        this.obj.scale.y = 0.5
        this.obj.scale.z = 0.5

        index.scene.add(this.obj)
        this.parent.blocks[this.relativePos.x][this.relativePos.y][this.relativePos.z] = this

        //positioning in scene is calculated relative to placed coords and the coords of the parent
        let absX = this.relativePos.x + this.parent.position.x;
        let absY = this.relativePos.y + this.parent.position.y;
        let absZ = this.relativePos.z + this.parent.position.z;
    
        this.obj.position.set(absX,absY,absZ)
        // this.obj.castShadow = true;
        this.obj.receiveShadow = true;
    }
    fitToSurroundings(original){

        if(!this.allowFit){
            return
        }
        let pos = this.relativePos
        let plusX
        let minusX
        let plusY
        let minusY
        let plusZ
        let minusZ

        let pd = this.parent.dimmensions
        

        if(pos.x == pd.x-1){
            plusX = new Road(this.parent, pos.x+1,pos.y,pos.z)
            plusX.allowFit = false;
        } else {
            plusX = this.parent.blocks[pos.x+1][pos.y][pos.z]
        }
        if(pos.x == 0){
            minusX = new Road(this.parent,pos.x-1,pos.y,pos.z)
            minusX.allowFit = false;
        } else {
            minusX = this.parent.blocks[pos.x-1][pos.y][pos.z]
        }

        if(pos.y == pd.y-1){
            plusY = new Road(this.parent, pos.x,pos.y+1,pos.z)
            plusY.allowFit = false;
        } else {
            plusY = this.parent.blocks[pos.x][pos.y+1][pos.z]        
        }
        if(pos.y == 0){
            minusY = new Road(this.parent, pos.x,pos.y-1,pos.z)
            minusY.allowFit = false;
        } else {
            minusY = this.parent.blocks[pos.x][pos.y-1][pos.z]
        }

        if(pos.z == pd.z-1){
            plusZ = new Road(this.parent, pos.x,pos.y,pos.z+1)
            plusZ.allowFit = false;
        } else{
            plusZ = this.parent.blocks[pos.x][pos.y][pos.z+1]
        }
        if(pos.z == 0){
            minusZ = new Road(this.parent, pos.x,pos.y,pos.z-1)
            minusZ.allowFit = false;
        } else{
            minusZ = this.parent.blocks[pos.x][pos.y][pos.z-1]
        }


        let around = [plusX,minusX,plusY,minusY,plusZ,minusZ]
        console.log(around)
        let roadsAround = 0;
        around.forEach(block => {
            if(block.type == 'road'){
                roadsAround++
            }
        })
        console.log(roadsAround)
        console.log('--------')
        
        this.obj.scale.x = 0.5;
        this.obj.rotation.y = 0;

        //logic for various arrangements of roads
        //PROBABLY BETTER WAY TO DO THIS, SHOULD FIGURE THAT OUT
        if(roadsAround === 1){
            if(plusZ.type == 'road' || minusZ.type == 'road'){
                this.obj.rotation.y = Math.PI/2
            }
        }



        if(roadsAround === 2){
            if(plusZ.type == 'road' && minusZ.type == 'road'){
                this.obj.rotation.y = Math.PI/2
            } else if (plusX.type == 'road' && plusZ.type == 'road'){
                this.obj.geometry = ts.copyToNewMesh(this.corner).geometry
                this.obj.material = ts.copyToNewMesh(this.corner).material
                this.obj.rotation.y = -Math.PI/2
            } else if (minusX.type == 'road' && plusZ.type == 'road'){
                this.obj.geometry = ts.copyToNewMesh(this.corner).geometry
                this.obj.material = ts.copyToNewMesh(this.corner).material
                this.obj.rotation.y = Math.PI;
            } else if (plusX.type == 'road' && minusZ.type == 'road'){
                this.obj.geometry = ts.copyToNewMesh(this.corner).geometry
                this.obj.material = ts.copyToNewMesh(this.corner).material
            } else if (minusX.type == 'road' && minusZ.type == 'road'){
                this.obj.geometry = ts.copyToNewMesh(this.corner).geometry
                this.obj.material = ts.copyToNewMesh(this.corner).material
                // this.obj.rotation.y = Math.PI/2;
                this.obj.scale.x *= -1
            }
        }

        if(roadsAround === 3){
            this.obj.geometry = ts.copyToNewMesh(this.threeWay).geometry
            this.obj.material = ts.copyToNewMesh(this.threeWay).material
            if(minusX.type != 'road'){
                this.obj.rotation.y = -Math.PI/2;
            } else if (plusX.type != 'road'){
                this.obj.rotation.y = Math.PI/2
            } else if (minusZ.type != 'road'){
                this.obj.rotation.y = -Math.PI
            }
        }

        if(roadsAround === 4){
            this.obj.geometry = ts.copyToNewMesh(this.fourWay).geometry
            this.obj.material = ts.copyToNewMesh(this.fourWay).material
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
        this.defaultGeometry = new THREE.BoxGeometry(1,1,1),
        this.baseColor = {r: 0.4,g:0,b:0.4}
    }

    addToScene(){

        //plot array consists of 6 y levels but 6th level only there to prevent glitches with fitToSurroundings
            //users shouldnt be able to place on level 6 so it returns if that happens
            //in the future this should trigger alert saying that user has reached max height
        if(this.relativePos.y > 5){
            return;
        }

        //chooses random between different alternates
        if(this.alts){
            console.log('alts')
            this.defaultObj = this.alts[ts.rndmInt(0,this.alts.length)]
        }

        //copies geometry and material to a new object
        this.obj = ts.copyToNewMesh(this.defaultObj)
        this.obj.blockType = this.type
        this.obj.defaultMaterial = this.obj.material

        this.obj.scale.x = this.scale.x;
        this.obj.scale.y = this.scale.y;
        this.obj.scale.z = this.scale.z;

        index.scene.add(this.obj)
        this.parent.blocks[this.relativePos.x][this.relativePos.y][this.relativePos.z] = this

        let absX = this.relativePos.x + this.parent.position.x;
        let absY = this.relativePos.y + this.parent.position.y;
        let absZ = this.relativePos.z + this.parent.position.z;
    
        this.obj.position.set(absX,absY,absZ);
        this.obj.castShadow = true;
        this.obj.receiveShadow = false;

    }
    fitToSurroundings(original){
        let pos = this.relativePos
        
        //weird way to assign plusX, minusX ... but done so that if on the edge it doesn't have error because plusX is not in the array or whatever
        let plusX
        let minusX
        let plusY
        let minusY
        let plusZ
        let minusZ

        let pd = this.parent.dimmensions
 

        if(pos.x == pd.x-1){
            plusX = new Blank()
        } else {
            plusX = this.parent.blocks[pos.x+1][pos.y][pos.z]
        }
        if(pos.x == 0){
            minusX = new Blank()
        } else {
            minusX = this.parent.blocks[pos.x-1][pos.y][pos.z]
        }

        if(pos.y == pd.y-1){
            plusY = new Blank()
        } else {
            plusY = this.parent.blocks[pos.x][pos.y+1][pos.z]        
        }
        if(pos.y == 0){
            minusY = new Blank()
        } else {
            minusY = this.parent.blocks[pos.x][pos.y-1][pos.z]
        }

        if(pos.z == pd.z-1){
            plusZ = new Blank()
        } else{
            plusZ = this.parent.blocks[pos.x][pos.y][pos.z+1]
        }
        if(pos.z == 0){
            minusZ = new Blank()
        } else{
            minusZ = this.parent.blocks[pos.x][pos.y][pos.z-1]
        }

        let around = [plusX,minusX,plusY,minusY,plusZ,minusZ]
        
        let blocksAround = 0;
        around.forEach(block => {
            if(block.type == this.type){
                blocksAround++
            }
        })

        //orients buildings to nearby road
            //aligns in order of preference so if a block has roads at
            //plusX and minusX it orients to plusX which is towards the default
            //camera position and doesnt orient to minusX

        if(plusX.type == 'road'){
            this.obj.rotation.y = 0
        } else if (plusZ.type == 'road'){
            this.obj.rotation.y = -Math.PI/2
        } else if (minusX.type == 'road'){
            this.obj.rotation.y = Math.PI
        } else if (minusZ.type == 'road'){
            this.obj.rotation.y = Math.PI/2
        }



        if(minusY.type === this.type && plusY.type != this.type){
            // this.obj.children = [];
            // ts.newChildren(this.roofObj).forEach(child => this.obj.add(child));
            //CANT SET OBJ TO NEW OBJ AND HAVE IT WORK NEED TO SET ITS GEOMETRY AND MATERIAL AND ITLL UPDATE
            this.obj.geometry = ts.copyToNewMesh(this.roofObj).geometry
            this.obj.material = ts.copyToNewMesh(this.roofObj).material
            this.obj.rotation.y = minusY.obj.rotation.y 
            // index.scene.add(this.obj)
        } else if (minusY.type === this.type && plusY.type === this.type){
            this.obj.geometry = ts.copyToNewMesh(this.midObj).geometry
            this.obj.material = ts.copyToNewMesh(this.midObj).material
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
        this.defaultObj = load.imported.apartmentGround;
        this.scale = {x:0.48,y:0.5,z:0.48};
        this.randomBaseColor = true;

        this.midObj = load.imported.apartmentMid;
        this.roofObj = load.imported.apartmentRoof;

        //includes default base and all alts
        this.alts = [load.imported.apartmentGround, load.imported.apartmentGroundAltOne]
    }
}

export class Office extends Building {
    constructor(parent,x,y,z){
        super(parent,x,y,z),
        this.type = 'office',
        this.defaultObj = load.imported.officeGround;
        this.scale = {x:0.48,y:0.5,z:0.48};
        this.randomBaseColor = true;

        this.midObj = load.imported.officeMid;
        this.roofObj = load.imported.officeRoof;
    }

}
export class Commercial extends Building {
    constructor(parent,x,y,z){
        super(parent,x,y,z),
        this.type = 'commercial',
        this.defaultObj = load.imported.commercialGround;
        this.scale = {x:0.48,y:0.5,z:0.48};
        this.randomBaseColor = true;

        this.midObj = load.imported.commercialMid;
        this.roofObj = load.imported.commercialRoof;

        // this.alts = [load.imported.commercialGround,load.imported.commercialGroundAltOne]
        this.alts = [load.imported.commercialGround]
    }

}


export class Park extends Building {
    constructor(parent,x,y,z){
        super(parent,x,y,z);
        this.type = 'park';
        this.defaultObj = load.imported.park1x1One;
        this.scale = {x:0.5,y:0.5,z:0.5};
        this.randomBaseColor = false;
    }
}


class Blank {
    constructor(){
        this.type = 'blank';
        this.randomBaseColor = false;
    }
}