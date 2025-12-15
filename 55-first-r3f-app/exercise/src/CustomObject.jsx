import * as THREE from 'three'
import { useEffect, useRef, useMemo } from 'react'

const CustomObject = () => {

  const geometryRef = useRef()

  // we have 30 positions, but we need 3 values per vertex (x, y, z)
  // we need to multply it by 3
  // SO! 10 triangles, 3 vertices per triangle, and 3 values per vertex

  const verticesCount = 10 * 3
  
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3)
  
    for (let i = 0; i < verticesCount * 3; i++) 
      positions[i] = (Math.random() - 0.5) * 3
      
    return positions
  }, [])

  useEffect(() => {
    // console.log(geometryRef.current)
    geometryRef.current.computeVertexNormals()
  }, [])
  return (
    <mesh>
      <bufferGeometry ref={ geometryRef}>
        <bufferAttribute attach="attributes-position" count={verticesCount} itemSize={ 3 } array={positions}/>
      </bufferGeometry>
      <meshStandardMaterial color="red" side={ THREE.DoubleSide}/>
    </mesh>
  )
}

export default CustomObject