import { math } from "./math-helper";
import { PARAMS } from "./gui";

export let canvas = 0
export let ctx = 0

export let mouse_x = 0
export let mouse_y = 0

const container = document.querySelector('#anim-container')
container.innerHTML = "<canvas id=\"twodcanvas\"></canvas>"

canvas = document.querySelector('#twodcanvas')
ctx = canvas.getContext("2d");

export let coord_x = window.innerWidth/2 | 0
export let coord_y = window.innerHeight/2 | 0
export let coord_scale = 100 // this no of px = 1 units 

export function initiateCanvas(){{
    const container = document.querySelector('#anim-container')
    container.innerHTML = "<canvas id=\"twodcanvas\"></canvas>"

    canvas = document.querySelector('#twodcanvas')
    ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    coord_x = canvas.width/2 | 0
    coord_y = canvas.height/2 | 0
    coord_scale = 100 

    initiateCanvasEventListeners()
}}

export function drawRect(x, y, sx, sy){
    ctx.fillRect(coord_x+(x*coord_scale), coord_y-(y*coord_scale), sx*coord_scale, sy*coord_scale)
}

export function pix2coord(px, py){
    return [-(coord_x - px)/coord_scale, (coord_y - py)/coord_scale]
}

export function pix2z(px, py){
    return math.complex(-(coord_x - px)/coord_scale, (coord_y - py)/coord_scale)
}

function initiateCanvasEventListeners(){
    window.addEventListener( 'resize', ()=>{
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth    
        coord_x = canvas.width/2 | 0
        coord_y = canvas.height/2 | 0
        console.log(canvas.height, canvas.width)
    }, false );
    
    let mstartx = 0;
    let mstarty = 0;
    let mstart_coord_x = 0;
    let mstart_coord_y = 0;
    $("#twodcanvas").mousedown(function(event) {
        mstartx = event.clientX;
        mstarty = event.clientY;
        mstart_coord_x = coord_x;
        mstart_coord_y = coord_y;
        console.log(pix2z(event.clientX, event.clientY))
        $("#twodcanvas").mousemove(function(event) {
            coord_x = mstart_coord_x + (event.clientX - mstartx)
            coord_y = mstart_coord_y + (event.clientY - mstarty)
            PARAMS.dc_coords.real = pix2coord(event.clientX, event.clientY)[0]
            PARAMS.dc_coords.imag = pix2coord(event.clientX, event.clientY)[1]
        });
    });
    
    $("#twodcanvas").mouseup(function(eventObj) {
        $("#twodcanvas").unbind('mousemove');
        $("#twodcanvas").mousemove(function(event) {
            PARAMS.dc_coords.real = pix2coord(event.clientX, event.clientY)[0]
            PARAMS.dc_coords.imag = pix2coord(event.clientX, event.clientY)[1]
        });
    });

    $("#twodcanvas").mousemove(function(event) {
        PARAMS.dc_coords.real = pix2coord(event.clientX, event.clientY)[0]
        PARAMS.dc_coords.imag = pix2coord(event.clientX, event.clientY)[1]
    });
        
    canvas.addEventListener('wheel', function(event){
        coord_scale = Math.max(coord_scale - event.deltaY*(7/Math.abs(event.deltaY)), 1) 
        PARAMS.dc_scale = coord_scale
    });

}