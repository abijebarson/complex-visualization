import { PerspectiveCamera, OrthographicCamera } from 'three';

const frustumSize = 10;
let aspect = window.innerWidth / window.innerHeight;

// perspective camera
export const persp_camera = new PerspectiveCamera( 
    75, 
    aspect, 
    0.1, 
    1000 
);
persp_camera.position.set(2, 5, 5); //Cross angle

export const ortho_camera = new OrthographicCamera( 
    frustumSize * aspect / (- 2), 
    frustumSize * aspect / 2, 
    frustumSize / 2, 
    frustumSize / - 2, 
    1, 
    1000 
);
ortho_camera.position.set(0, 5, 0);


// camera.position.set(0, 5, 0); //Top
export let camera = persp_camera

window.addEventListener( 'resize', ()=>{
    aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect
    
    // camera.left = - frustumSize * aspect / 2;
    // camera.right = frustumSize * aspect / 2;
    // camera.top = frustumSize / 2;
    // camera.bottom = - frustumSize / 2;

    camera.updateProjectionMatrix();
}, false );