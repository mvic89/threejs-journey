import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// console.log(THREE.OrbitControls) // Cannot be accessed because OrbitControls is in 'node_modules' folder and not in THREE.
console.log(OrbitControls) //console logs the OrbitControl class
/**
 * Cursor
 */

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5 // -0.5 makes the x axis go from -0.5 to +0.5
    cursor.y = - (event.clientY / sizes.width - 0.5) // -0.5 makes the y axis go from -0.5 to +0.5, the '- ()' inverts the y axis 'mousemove' 
    console.log(cursor.x, cursor.y)
})


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
/**
 * first parameter: 'field of view' (fov) is the vertical vision angle
 * second parameter: 'aspect ratio' of the render
 * thrid & fourth parameter: 'near' and 'far' corresponds with how near and far the camera can see. (the object needs to be between these numbers to be seen.)
*/
//Orthographic Camera
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1 * aspectRatio, 0.1, 100)
// // aspectRatio creates perspective on the orthographic cube
// /**
//  * parameters: instead of fov, we privide how far the camera can see in each direction (left, right, top and bottom)
//  * then the 'near' and 'far' paramters
//  */
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


// OrbitControls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 1 //changes the target of where the camera is looking. (the y axis in this case)
// controls.update() //updates the target changes.
controls.enableDamping = true





// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera
    // camera.position.x = cursor.x * 3 //moves the camera in the x axis in accordance with the mousemouve event (cursor.x)
    // camera.position.y = cursor.y * 3 //moves the camera in the y axis in accordance with the mousemouve event (cursor.y)
    // camera.lookAt(new THREE.Vector3()) //does the same this as 'mesh.position'
    // (Update Camera) Full Rotation Camera (using 'Math.sin()', 'Math.cos' and 'Math.PI')
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position) //makes the camera look at the mesh (gives an all around look at the cube)

    //Update OrbitControls
    controls.update() // update orbit control and damping on each frame.

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()