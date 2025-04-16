import { AmbientLight, PointLight } from "three"


// ambient light

export function make_ambientLight(){
    return  new AmbientLight(0xffffff, 2.0)
}


export function make_light(){
    let light = new PointLight(0xffffff, 20.0)
    light.position.set(-0.5, 3, 1.5)
    
    // for shadow
    light.castShadow = true
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    light.shadow.camera.near = 0.1
    light.shadow.camera.far = 1000
    return light
}
