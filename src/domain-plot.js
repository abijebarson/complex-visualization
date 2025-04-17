import './style.css'

import { ctx, canvas, pix2z } from './canvas-helper';
import { PARAMS } from './gui';

// const mathcontainer = document.querySelector('#math-container')
// mathcontainer.innerHTML = ""

export function makeComplexPlane(f, res, rextra){
    for (let i = 0; i < canvas.width; i+=res){
        for (let j = 0; j < canvas.height; j+=res){
            let z = pix2z(i, j) 
            let w = f(z)
            let h = (Math.atan2((w).im, (w).re))*(180/Math.PI)
            let s = 100
            // let l = (Math.tanh(modz) + (Math.tanh(modz-100)+1)/2)*100/2
            let l = 50
            if (PARAMS.dc_lightness){
                let modz = Math.sqrt((w).re**2 + (w).im**2)
                l = Math.tanh(PARAMS.dc_l_factor*modz)*100
            }
            ctx.fillStyle = 'hsl('+ h +','+s+'%,'+l+'%)';
            ctx.fillRect( i, j, res+rextra, res+rextra );
        }
    }
}