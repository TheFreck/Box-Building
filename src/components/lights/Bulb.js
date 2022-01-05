import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';


export const Bulb = props => {
    return (
        <mesh {...props}>
            <pointLight castShadow />
            <sphereBufferGeometry args={props.size} />
            <meshPhongMaterial
                emissive='yellow'
                opacity={1}
            />
        </mesh>
    )
}

export const Spot = props => {
    return (
        <mesh {...props}>
            <spotLight />
            <sphereBufferGeometry />
            <meshBasicMaterial
                emissive='white'
                opacity={1}
            />
        </mesh>
    )
}

export const Star = (props) => {
    console.log("star props: , ", props);
    const ref = useRef();
    const texture = useLoader(THREE.TextureLoader, '/texture.jpg');
    
    useFrame(() => {
        // make dynamic modifications here
        if(props && props.rotation){
            ref.current.rotation.x += props.rotation.x;
            ref.current.rotation.y += props.rotation.y;
            ref.current.rotation.z += props.rotation.z;
        }
    })

    return (
        <mesh key='star' {...props} ref={ref}>
            <pointLight castShadow />
            <sphereBufferGeometry args={props.size} />
            <meshPhongMaterial
                emissive='yellow'
                opacity={1}
            />
            {/* {props.satellites.map(satellite => 
                <>{satellite}</>
            )} */}
        </mesh>
    )
}

export default Bulb;