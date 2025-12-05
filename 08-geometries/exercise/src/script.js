import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2) // (width (x-axis), height (y-axis), depth (z-axis), widthSegements, heightSegments, depthSegments)

// Creating your own Buffer Geometry
// 1st way of filling a Float32Array
// const positionsArray = new Float32Array(9)

// // First vertice
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0
// // Second vertice
// positionsArray[3] = 0
// positionsArray[4] = 0
// positionsArray[5] = 0
// // Third vertice
// positionsArray[6] = 0
// positionsArray[7] = 0
// positionsArray[8] = 0

// 2nd way of filling a float32Array (by using an Array instead)
// const positionsArray = new Float32Array([
//     0,0,0, // First vertice
//     0,1,0, // Second vertice
//     1,0,0 // Third vertice
// ])

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3) //fist parameter corresponds to my 'typed array'. and the second parameter corressponds to how value one vertex compose (x, y, z = 3)

// // Adding the BufferAttribute to the BufferGeometry (w. setAttribute())
// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionsAttribute) // position is the name that will be used in the shaders (we'll look through it in the shaders lesson)
// //Now a triangle is created!

// We can also create a bunch of triangles
const geometry = new THREE.BufferGeometry()

const count = 50
const positionsArray = new Float32Array(count * 3 * 3) // the count (50) is multiplied with the each vertices. and each vertex will be composed of three values-

//now we fill the array with random values
for( let i = 0; i < count * 3 * 3; i++) {

    positionsArray[i] = Math.random() - 0.5 // -0.5 centers the random triangles
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)


const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true // gives the material a wireframe look, with a red color.
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()