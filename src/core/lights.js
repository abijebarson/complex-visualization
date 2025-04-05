import { AmbientLight, PointLight } from "three"


// ambient light
export const ambientLight = new AmbientLight(0xffffff, 1.0)

// lights
export const light = new PointLight(0xffffff, 20.0)
light.position.set(-0.5, 3, 1.5)

// for shadow
light.castShadow = true
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 0.1
light.shadow.camera.far = 1000