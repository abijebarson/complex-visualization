import { renderer } from "./renderer"
import { initiateCanvas } from "../canvas-helper"

const container = document.querySelector('#anim-container')

export function switch3D(){
    container.innerHTML = ""
    container.append(renderer.domElement)
}


export function switch2D(){
    container.innerHTML = ""
    initiateCanvas()
}

export function changeType(type){
    switch (type){
        case "DC":
            switch2D()
        case "VP":
            switch3D()
    }
}