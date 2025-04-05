import { WebGLRenderer, PCFSoftShadowMap } from "three"

// renderer
export const renderer = new WebGLRenderer({ antialias: true })
renderer.physicallyCorrectLights = true
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

// const container = document.querySelector('#anim-container')
// container.append(renderer.domElement)

window.addEventListener( 'resize', ()=>{
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false );