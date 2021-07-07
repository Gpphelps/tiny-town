
import * as index from './index.js'

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

export function wait(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved')
        },2000)
    })
}

export async function waitASec(){
    const result = await wait();
}

const mouseHover = () => {

}