import './style.css'

import * as THREE from 'three';
// import * as dat from 'dat.gui'

import { camera } from "./core/camera.js"
import { renderer } from "./core/renderer.js"
import { controls } from './core/control.js';
import { ambientLight, light } from './core/lights.js';
import { switch3D, switch2D } from './core/engine-handler.js';

import { math, magnitude, distance } from './math-helper.js';
import { animate_vector_plot, makeArrows } from './vector-plot.js';
import { makeComplexPlane} from "./domain-plot.js"
import { fz } from "./quill.js"
import { number } from 'mathjs';
import {Pane} from 'tweakpane';
import { pane, PARAMS } from './gui.js';


let twoDengine = true
if (twoDengine){switch2D()} else {switch3D()}

// 3D scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
scene.add(ambientLight)
scene.add(light)

// 3D Vector Plot
const ARROW_NUM = 40
const ARROW_CLOSENESS = 4
let vectors = makeArrows(ARROW_NUM, ARROW_CLOSENESS, scene)
// ctx.translate(0.5, 0.5);

var timeSpan = document.getElementById('time');
let clock = new THREE.Clock();
function animate3D() {
    // timeSpan.textContent = number(t|0)
    if (!twoDengine){
        let t = clock.getElapsedTime()
        switch(PARAMS.type){
            case "VP":
                animate_vector_plot(fz, vectors)
        }
        controls.update()
        renderer.render( scene, camera )
    }
}

function animate2D(t){
    if (twoDengine){
        //Domain coloring plot
        switch(PARAMS.type){
            case "DC":
                makeComplexPlane(fz, PARAMS.dc_res, 0)
        }
        
    }
    requestAnimationFrame( animate2D );
}

renderer.setAnimationLoop( animate3D );
animate2D()