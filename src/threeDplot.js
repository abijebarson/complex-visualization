import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { make_ambientLight, make_light } from './core/lights.js';
import { clear_scene } from './core/engine-handler.js';
import { math } from './math-helper.js';
import { PARAMS } from './gui.js';

export function update_3dp(fz, scene){
    clear_scene(scene)
    scene.background = new THREE.Color(0x000000)
    scene.add(make_ambientLight())
    // scene.add(make_light())

    let fz_uv = function(u, v, vector){
        let x = (PARAMS.tdp_real.max - PARAMS.tdp_real.min) * u + PARAMS.tdp_real.min;
        let y = (PARAMS.tdp_imag.max - PARAMS.tdp_imag.min) * v + PARAMS.tdp_imag.min;
        let z = 0
        let w = fz(math.complex(x, y))
        switch (PARAMS.tdp_type) {
            case "reim": 
                z = math.max(math.min(w.re, PARAMS.tdp_z.max), PARAMS.tdp_z.min)
                break;
            case "imre":
                z = math.max(math.min(w.im, PARAMS.tdp_z.max), PARAMS.tdp_z.min)
                break; 
            case "modarg":
                z = math.max(math.min(Math.sqrt((w).re**2 + (w).im**2), PARAMS.tdp_z.max), PARAMS.tdp_z.min)
                break;  
        } 
        if ( isNaN(z) ){
            // console.log('isNan(z) Trued', x, y, z)
            return vector.set(0,0,0); // TODO: better fix
        }
        else {
            return vector.set(x, z, y)
        }
    }

    const paramGeometry = new ParametricGeometry( fz_uv, PARAMS.tdp_segments, PARAMS.tdp_segments );
    const paramMaterial = new THREE.MeshBasicMaterial( { vertexColors: true, side: THREE.DoubleSide, transparent: true, wireframe: false } );
    
    const tempvector = new THREE.Vector3()
    const color = new THREE.Color( 0x000000 );
    let colors = []
    let point
    
    const position = paramGeometry.attributes.position
    
    for ( var i = 1; i < position.count; i++ ) {
        point = tempvector.fromBufferAttribute(position, i)
        let w = fz(math.complex(point.x, point.z))
        colors[4*i+3] = 1 //alpha
        switch (PARAMS.tdp_type) {
            case "reim": 
                if (w.re > PARAMS.tdp_z.max || w.re < PARAMS.tdp_z.min){
                    color.setHSL(1, 1, 1)
                    if (PARAMS.tdp_transparant){colors[4*i+3] = 0}
                } else {
                    color.setHSL(  0.7 * (PARAMS.tdp_z.max - w.im) / (PARAMS.tdp_z.max - PARAMS.tdp_z.min) / 2, 1, 0.5 );
                }
                break;
            case "imre":
                if (w.im > PARAMS.tdp_z.max || w.im < PARAMS.tdp_z.min){
                    color.setHSL(1, 1, 1)
                    if (PARAMS.tdp_transparant){colors[4*i+3] = 0}
                } else {
                    color.setHSL(  0.7 * (PARAMS.tdp_z.max - w.re) / (PARAMS.tdp_z.max - PARAMS.tdp_z.min) / 2, 1, 0.5 );
                }
                break; 
            case "modarg":
                if (Math.sqrt(w.re**2 + w.im**2) >= PARAMS.tdp_z.max || Math.sqrt(w.re**2 + w.im**2) <= PARAMS.tdp_z.min){
                    color.setHSL(1, 1, 1)
                    if (PARAMS.tdp_transparant){colors[4*i+3] = 0}
                } else {
                    color.setHSL( (Math.atan2((w).im, (w).re)/(2*Math.PI)), 1, 0.5 );
                }
                break;
        }
        colors[4*i] = color.r
        colors[4*i+1] = color.g
        colors[4*i+2] = color.b
    }

    paramGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 4));
    const paramshape = new THREE.Mesh( paramGeometry, paramMaterial );
    scene.add( paramshape );
}

export function init_3dp(scene){
    update_3dp((z)=>{return z}, scene)
}

export function animate_3D_plot(fz){    
    return
}