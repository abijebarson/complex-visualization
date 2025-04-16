import { renderer } from "./renderer"
import { initiateCanvas } from "../canvas-helper"

export let twoDengine = true

const container = document.querySelector('#anim-container')

export function clear_scene(scene){
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
}


export function switch3D(){
    twoDengine = false
    container.innerHTML = ""
    container.append(renderer.domElement)
}


export function switch2D(){
    twoDengine = true
    container.innerHTML = ""
    initiateCanvas()
}

export function changeType(type){
    console.log(type)
    switch (type){
        case "DC":
            switch2D()
            break;
        case "VP":
            // scene = vp_scene
            switch3D()
            break;
        case "3DP":
            // scene = tdp_scene
            switch3D()
            break;
    }
}