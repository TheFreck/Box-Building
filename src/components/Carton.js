import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber';
import DragableCarton from './controls/DragableCarton';
import Panel from './Panel';
import Enums from '../Enums';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls });

// The Carton is made up of panels
// Right now it is composed manually
// Each panel displays an arrow which points to its parent
// Next step will be to convert the machine instructions
// which are an array of lines to either cut or crease
// into dimensions and placement of panels
// Each line contains a linear formula 
// from which can be gathered start and end and cut vs. crease
// 

const direction = Enums.direction;

const Orbit = () => {
    const { camera, gl } = useThree();
    return (
        <orbitControls args={[camera, gl.domElement]} />
    );
}

export const Carton = () => {
    return <div
        style={{
            width: '100vw', height: '100vh'
        }}>
        <Canvas
            style={{
                background: 'black'
            }}
            camera={{
                position: [-1, 0, 4]
            }}
            shadowMap
        >
            <ambientLight intensity={.4} />
            <Orbit />
            <axesHelper args={[5]} />
            <DragableCarton>
                <Suspense fallback={null}>
                    <Panel
                        position={[0, 0, 0]}
                        width={2}
                        length={3}
                        panelId={0}
                        name={0}
                    >
                        <Suspense fallback={null}>
                            <Panel
                                width={2}
                                length={1}
                                orientation={direction.north}
                                panelId={1}
                                name={1}
                            ><mesh/><mesh/></Panel>
                        </Suspense>
                        <Suspense fallback={null}>
                            <Panel
                                width={2}
                                length={1}
                                orientation={direction.south}
                                panelId={2}
                                name={2}
                            ><mesh/></Panel>
                        </Suspense>
                        <Suspense fallback={null}>
                            <Panel
                                width={3}
                                length={2}
                                orientation={direction.east}
                                panelId={3}
                                name={3}
                            >
                                <Suspense fallback={null}>
                                    <Panel
                                        width={2}
                                        length={1}
                                        orientation={direction.east}
                                        panelId={4}
                                        name={4}
                                    ><mesh/></Panel>
                                </Suspense>
                                <Suspense fallback={null}>
                                    <Panel
                                        width={3}
                                        length={2}
                                        orientation={direction.south}
                                        panelId={5}
                                        name={5}
                                    >
                                        <Suspense fallback={null}>
                                            <Panel
                                                width={2}
                                                length={1}
                                                orientation={direction.east}
                                                panelId={6}
                                                name={6}
                                            ><mesh/></Panel>
                                        </Suspense>
                                        <Suspense fallback={null}>
                                            <Panel
                                                width={3}
                                                length={2}
                                                orientation={direction.south}
                                                panelId={7}
                                                name={7}
                                            >
                                                <Suspense fallback={null}>
                                                    <Panel
                                                        width={2}
                                                        length={1}
                                                        orientation={direction.east}
                                                        panelId={8}
                                                        name={8}
                                                    ><mesh/></Panel>
                                                </Suspense>
                                                <Suspense fallback={null}>
                                                    <Panel
                                                        width={2}
                                                        length={1}
                                                        orientation={direction.west}
                                                        panelId={9}
                                                        name={9}
                                                    ><mesh/></Panel>
                                                </Suspense>
                                            </Panel>
                                        </Suspense>
                                        <Suspense fallback={null}>
                                            <Panel
                                                width={2}
                                                length={1}
                                                orientation={direction.west}
                                                panelId={10}
                                                name={10}
                                            ><mesh/></Panel>
                                        </Suspense>
                                    </Panel>
                                </Suspense>
                                <Suspense fallback={null}>
                                    <Panel
                                        width={2}
                                        length={1}
                                        orientation={direction.west}
                                        panelId={11}
                                        name={11}
                                    ><mesh/></Panel>
                                </Suspense>
                            </Panel>
                        </Suspense>
                        <Suspense fallback={null}>
                            <Panel
                                width={3}
                                length={.2}
                                orientation={direction.west}
                                panelId={12}
                                name={12}
                            ><mesh/></Panel>
                        </Suspense>
                    </Panel>
                </Suspense>
            </DragableCarton>

        </Canvas>
    </div>
}


export default Carton;