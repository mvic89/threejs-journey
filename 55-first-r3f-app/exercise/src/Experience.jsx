import { useThree, extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import CustomObject from "./CustomObject.jsx"

extend({ OrbitControls: OrbitControls})


const Experience = () => {

  const { camera, gl} = useThree() //the destucture gives us the camera, and the webGlrenderer properties so that we can orbit around the objects by clicking and holding the mouse.
  const cubeRef = useRef()
  const groupRef = useRef()

  useFrame((state, delta) => {
    // cubeRef.current.rotation.y += delta // to access the actual element we have to write '.current' // this rotates the cube.
    // groupRef.current.rotation.y += delta // rorates the meshes in the groupRef around the y axis.

    // console.log(state.camera)
    // console.log(state.clock.elapsedTime) //or getElapsedTime() which is a method that gets the elapsed time
    // const angle = state.clock.elapsedTime
    // state.camera.position.x = Math.sin(angle) * 8
    // state.camera.position.z = Math.cos(angle) * 8
    // state.camera.lookAt(0,0,0) // looks at the middle of the scene

    
  })

  return ( // the order of the mesh isn't relevant in native Three.js
    <>
    <orbitControls args={[ camera, gl.domElement] }/>

    <directionalLight position={ [ 1 ,2 ,3 ]} intensity={ 4.5}/>
    <ambientLight intensity={ 1.5}/>

    <group ref={ groupRef }>
      <mesh position-x={ -2}>
        <sphereGeometry/>
        <meshStandardMaterial color="orange"/>
      </mesh>
      <mesh ref={cubeRef} position-x={ 2 } rotation-y={ Math.PI * 0.25} scale={1.5}>
        <boxGeometry args={[ 1.5]}/>
        <meshStandardMaterial color="mediumpurple"  />
      </mesh>
    </group>
    <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5} scale={ 10 }>
      <planeGeometry/>
      <meshStandardMaterial color="greenyellow"/>
    </mesh>

    <CustomObject/>
    </>
  )
}

export default Experience