import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap) //console.logs the gsap object with all its objects/properties/methods

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

// Animations
// const tickLoop = () => {
//     console.log('tick')
//     window.requestAnimationFrame(tickLoop) //calls the tickLoop function on the next frame (which creates a eternal loop)
// }

// tickLoop(); // calls the tickLoop function

// Time
// let time = Date.now()

// Clock
// const clock = new THREE.Clock()

/**
 * GSAP (Greensock)
 * to() method takes two arguments
    1. What object are we animating? (our mesh and its position)
    2. then create an object {} and inside this object you have the direction (x axis) and the duration. we can also create a delay which paauses the animation before it starts.

    Greensock has it's own tick, internally doing the requestAnimationFrame on its own. So you don't have to tell gsap to update itself. But you still need to render the result by yourself. that's why we only have 'renderer.render(scene, camera)' and 'window.requestAnimationFrame(tickLoop)' inside the 'tickLoop'
 */

gsap.to(mesh.position, {x:2, duration:1, delay:1}) // pushes the mesh to the right for 1 second with a 1 second delay.
gsap.to(mesh.position, {x:0, duration:1, delay:2}) // pushes the mesh to back to the starting point with a 2 second delay.

const tickLoop = () => {

    // Time (messures how much time that has passed since the last 'tickLoop')
    // const currentTime =  Date.now()
    // const deltaTime = currentTime - time // subtract the previous time with the currentTime to get the deltaTime
    // // time = currentTime //saves the currentTime into the 'time' variable

    // // Clock
    // const elapsedTime = clock.getElapsedTime() //elapsedTime starts at 0 and incremennts per second
    // console.log(elapsedTime)


    // // updates the objects
    // // mesh.rotation.y += 0.002 * deltaTime  // (Time) rotates the cube in the same speed regardless of the frame rate. 
    // // mesh.rotation.y = elapsedTime // (Clock) increments the elapsedTime per second
    // // mesh.rotation.y = elapsedTime * Math.PI * 2 // (Clock) spins the cube 360 degrees per second
    // // mesh.position.y = Math.sin(elapsedTime) // (Clock) positions the mesh through a sin curve in the y axis (sin starts at 0 and goes up to 1 and then down to -1)
    // // mesh.position.x = Math.cos(elapsedTime) // (Clock) positions the mesh through a cos curve in the x axis (cos starts at 1 and goes down to -1 and then up to 1 again.)
    
    // // object stays still but the camera moves in the a sin / cos curve
    // camera.position.y = Math.sin(elapsedTime) // (Clock) positions the camera through a sin curve in the y axis (sin starts at 0 and goes up to 1 and then down to -1)
    // camera.position.x = Math.cos(elapsedTime) // (Clock) positions the camera through a cos curve in the x axis (cos starts at 1 and goes down to -1 and then up to 1 again.)

    // camera.lookAt(mesh.position) // camera looks at the position of the mesh object in a while it's moves in a sin / cos curve.

    


    // // mesh.rotation.x += 0.002

    // Render the scene
    renderer.render(scene, camera)

    window.requestAnimationFrame(tickLoop) //calls the tickLoop function on the next frame (which creates a eternal loop)
}

tickLoop(); // calls the tickLoop function