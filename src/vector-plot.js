import { CylinderGeometry, ConeGeometry, MeshLambertMaterial, Mesh, Group, Color } from "three";
import { magnitude, distance } from './math-helper.js';

const ARROW_BODY = new CylinderGeometry( 1, 1, 1, 12 )
                        .rotateX( Math.PI/2)
                        .translate( 0, 0, 0.5 );

const ARROW_HEAD = new ConeGeometry( 1, 1, 12 )
                        .rotateX( Math.PI/2)
                        .translate( 0, 0, -0.5 );

function make3DArrow( fx, fy, fz, ix, iy, iz, length, thickness, color)
{
    var material = new MeshLambertMaterial( {color: color} );
    
    // var length = Math.sqrt( (ix-fx)**2 + (iy-fy)**2 + (iz-fz)**2 );
    
    var body = new Mesh( ARROW_BODY, material );
    body.scale.set( thickness, thickness, length-10*thickness );
        
    var head = new Mesh( ARROW_HEAD, material );
    head.position.set( 0, 0, length );
    head.scale.set( 3*thickness, 3*thickness, 10*thickness );
    
    var arrow = new Group( );
    arrow.position.set( ix, iy, iz );
    arrow.lookAt( fx, fy, fz );	
    arrow.add( body, head );
    
    return arrow;
}

export function makeArrows(num_arrows, arrow_closeness, scene){
    const arrmat = Array.from({ length: num_arrows }, () => new Array(num_arrows).fill(0));

    for (let i = -num_arrows/2; i < num_arrows/2; i++){
        for (let j = -num_arrows/2; j < num_arrows/2; j++){
            let cur_arr = make3DArrow(
                i/arrow_closeness,  0,   j/arrow_closeness,
                i/arrow_closeness,  0,  (j+1)/arrow_closeness,
                1,
                0.04,
                new Color(`hsl(${200}, 100%, 50%)`)
            )
            cur_arr.scale.set(0.01, 0.01, 0.01)
            scene.add(cur_arr)
            arrmat[i+num_arrows/2][j+num_arrows/2] = cur_arr
        }
    }
    return arrmat
}

export function animate_vector_plot(fz, arrmat){
    const ARROW_NUM = arrmat.length
    for (let i = -ARROW_NUM/2; i < ARROW_NUM/2; i++){
        for (let j = -ARROW_NUM/2; j < ARROW_NUM/2; j++){
            let arr = arrmat[i+ARROW_NUM/2][j+ARROW_NUM/2]
            
            let arrpos = [arr.position.x, arr.position.y, arr.position.z]
            let r = magnitude(arrpos)
    
            let mag = 0.2
            arr.scale.set(mag, mag, mag)
            arr.lookAt(arr.position.x , arr.position.y, arr.position.z)
        }
    }
}