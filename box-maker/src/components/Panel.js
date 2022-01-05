import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { extend, useLoader, useThree } from 'react-three-fiber';
import Enums from '../Enums';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls });

const direction = Enums.direction;

const Panel = props => {
    const texture = useLoader(THREE.TextureLoader, '/arrow.jpg');
    const ref = useRef();
    const r = 200;
    const g = 200;
    const b = 200;
    const { camera, scene, gl } = useThree();

    const [spot, setSpot] = useState([0, 0, 0]);
    const [base, setBase] = useState(false);
    const [folded, setFolded] = useState(false);
    const [panelId, setPanelId] = useState(props.panelId);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = event => {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        // console.log(`${mouse.x}, ${mouse.y}`);
    }

    const handlePointerDown = e => {
        if (base || e.object.panelId !== panelId) {
            // console.log('not it: ', panelId);
            return;
        }
        let quaternion = new THREE.Quaternion();
        if (!folded) {
            // Todo: find a better way than rotating and repositioning
            // ideally shift the origin to the top of the panel and rotate along the X axis
            switch (props.orientation) {
                case direction.north:
                    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x,
                        ref.current.position.y - ref.current.length / 2,
                        ref.current.position.z + ref.current.length / 2);
                    break;
                case direction.south:
                    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x,
                        ref.current.position.y + ref.current.length / 2,
                        ref.current.position.z + ref.current.length / 2);
                    break;
                case direction.east:
                    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x - ref.current.length / 2,
                        ref.current.position.y,
                        ref.current.position.z + ref.current.length / 2);
                    break;
                case direction.west:
                    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x + ref.current.length / 2,
                        ref.current.position.y,
                        ref.current.position.z + ref.current.length / 2);
                    break;
                default:
                    break;
            }
            setFolded(true);
        }
        else {
            switch (props.orientation) {
                case direction.north:
                    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x,
                        ref.current.position.y + ref.current.length / 2,
                        ref.current.position.z - ref.current.length / 2);
                    break;
                case direction.south:
                    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x,
                        ref.current.position.y - ref.current.length / 2,
                        ref.current.position.z - ref.current.length / 2);
                    break;
                case direction.east:
                    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x + ref.current.length / 2,
                        ref.current.position.y,
                        ref.current.position.z - ref.current.length / 2);
                    break;
                case direction.west:
                    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
                    ref.current.applyQuaternion(quaternion);
                    ref.current.position.set(
                        ref.current.position.x - ref.current.length / 2,
                        ref.current.position.y,
                        ref.current.position.z - ref.current.length / 2);
                    break;
                default:
                    break;
            }
            setFolded(false);
        }
    }

    useEffect(() => {
        console.log("panel props: ", props);
        window.addEventListener('mousemove', onMouseMove, false);
        ref.current.name = panelId;
        // ref.current.panelId = panelId;
        switch (props.orientation) {
            case direction.north:
                setSpot([0, (ref.current.parent.length + props.length) / 2, 0]);
                break;
            case direction.south:
                setSpot([0, -(ref.current.parent.length + props.length) / 2, 0]);
                break;
            case direction.east:
                setSpot([(ref.current.parent.width + props.length) / 2, 0, 0]);
                break;
            case direction.west:
                setSpot([-(ref.current.parent.width + props.length) / 2, 0, 0]);
                break;
            default:
                setBase(true);
                break;
        }
    }, [])


    return (
        <mesh
            ref={ref}
            {...props}
            position={spot}
            panelId={props.panelId}
            castShadow
            onClick={handlePointerDown}
            rotation={[0, 0, props.orientation ? props.orientation : 0]}
        >
            <meshPhysicalMaterial
                attach='material'
                color={`rgb(${r},${g},${b})`}
                side={THREE.DoubleSide}
                map={texture}
            />
            <planeGeometry
                args={[props.width, props.length]}
                attach='geometry'
            />
            {props.children}
        </mesh>
    )
}

export default Panel;