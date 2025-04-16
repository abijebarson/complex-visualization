import './style.css'

import * as THREE from 'three';

import { camera } from "./core/camera.js"
import { renderer } from "./core/renderer.js"
import { controls } from './core/control.js';
// import { ambientLight, light } from './core/lights.js';
import { switch3D, switch2D, twoDengine } from './core/engine-handler.js';

import { math, magnitude, distance } from './math-helper.js';
import { init_vp, animate_vector_plot } from './vector-plot.js';
import { animate_3D_plot, init_3dp, update_3dp } from './threeDplot.js';
import { makeComplexPlane} from "./domain-plot.js"
import { fz } from "./quill.js"

import {Pane} from 'tweakpane';
import { pane, PARAMS } from './gui.js';

if (twoDengine){switch2D()} else {switch3D()}

// 3D Vector Plot
let vp_scene = new THREE.Scene()
init_vp(vp_scene)

// 3D Plot
let tdp_scene = new THREE.Scene()
init_3dp(tdp_scene)

// ctx.translate(0.5, 0.5);

// Static Updates
export function update_all(fz){
    update_3dp(fz, tdp_scene)
}

var timeSpan = document.getElementById('time');
let clock = new THREE.Clock();
function animate3D() {
    // timeSpan.textContent = number(t|0)
    if (!twoDengine){
        let t = clock.getElapsedTime()
        switch(PARAMS.type){
            case "VP":
                animate_vector_plot(fz)
                renderer.render( vp_scene, camera )
                break;
            case "3DP":
                renderer.render( tdp_scene, camera )
                break;
        }
        controls.update()
            // renderer.render( scene, camera )
    }
}

function animate2D(t){ 
    if (twoDengine){
        //Domain coloring plot
        switch(PARAMS.type){
            case "DC":
                if (PARAMS.dc_anim){makeComplexPlane(fz, PARAMS.dc_res, 0)}
                break;
        }
    }
    requestAnimationFrame( animate2D );
}

renderer.setAnimationLoop( animate3D );
animate2D()