import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug UI
 */

//GUI Setup
const gui = new GUI({
    width: 300, //width of debug UI
    title: 'Nice debug UI', // title of the debug UI
    closeFolders: false // closed folder in the debug UI by default (if true). open folders (if false)
})
// gui.close() // close the debug UI by calling the close() method
gui.hide() // hides the debug UI (you can show it again by toggling with a 'keydown' event.) (show the debug UI when the H key is pressed)

//Toggling
window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        gui.show(gui._hidden)
    }
})

const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

debugObject.color = '#7f92cfff';

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Folders
const cubeTweaks = gui.addFolder('Awesome Cube') //adds the gui to the cubeTweaks folder called 'Awesome Cube' (replace 'gui' with 'cubeTweaks')
cubeTweaks.close() //closes the cubeTweaks folder in the beginning by default.

// Debug tweaks
// gui.add(mesh.position, 'y', -3, 3, 0.01) //position is the object, 'y' is the property of that object. (with minum value, maximum value and precision.)
cubeTweaks.add(mesh.position, 'y') //position is the object, 'y' is the property of that object.
    .min(-3) //minimum value
    .max(3) // maximum value
    .step(0.01) // precision
    .name('elevation') //name() method changes the label

// Checkbox
cubeTweaks.add(mesh, 'visible') // Creates a checkbox that makes the mesh visible / invisible when click / unclicked.
cubeTweaks.add(material, 'wireframe') // Creates a checkbox that makes the material wireframe visible / invisible when click / unclicked.

// Color
// Retrieving the modified color (Solution 1)
// gui.addColor(material, 'color').onChange((value) => {
//     console.log(material.color) // gets the color property of the material
//     console.log(value) // gets the color property of the material that's stored inside the value parameter
//     console.log(value.getHexString()) // gets a hex 'string' of the color property value
// })

// Only dealing with non-modified color (Solution2)
cubeTweaks.addColor(debugObject, 'color').onChange(() => {
    // console.log(value.getHexString()) // gets a hex 'string' of the color property value
    material.color.set(debugObject.color)
})

// Function / Button
debugObject.spin = () => { // spin is a method that's been added to the debugObject
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2}) // spins the mesh a full rotation
}
cubeTweaks.add(debugObject, 'spin')

// Tweaking the Geometry
debugObject.subdivision = 2 // reference of the subdivisions we're tweaking
cubeTweaks.add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1) 
    .onFinishChange(() => { // onFinishChange logs the change when you release the mouse button
        mesh.geometry.dispose() //dispose of the mesh geometry before creating a new geometry (good for performance and avoids memory leaks)
        mesh.geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
    })

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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