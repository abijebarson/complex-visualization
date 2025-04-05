import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { camera } from './camera';
import { renderer } from './renderer';
// controls
export const controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 15;
controls.autoRotate = false
controls.autoRotateSpeed = 0.5
// controls.maxPolarAngle = 0;