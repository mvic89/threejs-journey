import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const cameraSettings = {
    fov: 45,
    zoom: 100, 
    near: 0.1, 
    far: 200, 
    position: [3, 2, 6 ]
}

root.render(
    <Canvas 
        // dpr={ [1, 2] } // Pixel ratio between 1 and 2 (which is the default, so we can remove it)
        // flat // Tone mapping
        gl={ {
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace
        }} 
        orthographic 
        camera={ cameraSettings }>
        <Experience/>
    </Canvas>
)