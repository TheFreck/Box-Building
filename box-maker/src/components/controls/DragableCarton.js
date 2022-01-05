import React, {useRef, useEffect, useState} from "react";
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {extend, useThree} from 'react-three-fiber';
extend({DragControls});

export const DragableCarton = props => {
    const groupRef = useRef();
    const controlsRef = useRef();
    const [children, setChildren] = useState([]);
    const {camera, gl, scene} = useThree();

    useEffect(() => {
        setChildren(groupRef.current.children);
    },[]);
    
    useEffect(() => {
        controlsRef.current.addEventListener('drag',
        e => {
            console.log("start rotating: ", scene);
            e.object.rotation.x += .01;
        });
        controlsRef.current.addEventListener('mouseup',
        e => {
            console.log("stop rotating");
        })

    },[children]);
    return (
        <group ref={groupRef}>
            <dragControls args={[children,camera,gl.domElement]} ref={controlsRef} />;
            {props.children}
        </group>
    )
};

export default DragableCarton;