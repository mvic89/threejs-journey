import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

/**
 * Add Objects to 'Group'
 * The group will contain of 3 Cubes
*/ 
const group = new THREE.Group()
group.position.y = 1 // moves the whole group of cubes up 1 unit in the y axis
group.scale.y = 2 // scales the whole group of cubes up 2 units in the y axis
group.rotation.y = 1 // rotates the whole group of cubes 1 unit around in the y axis
scene.add(group)

const cube1 = new THREE.Mesh( // shortcut of creating a Mesh (you can put the boxGeometry and MeshBasicMaterial inside the Mesh instead of creating 3 different variables for it. (like the *Objects above.))
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)
group.add(cube1)

const cube2 = new THREE.Mesh( // shortcut of creating a Mesh (you can put the boxGeometry and MeshBasicMaterial inside the Mesh instead of creating 3 different variables for it. (like the *Objects above.))
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00})
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh( // shortcut of creating a Mesh (you can put the boxGeometry and MeshBasicMaterial inside the Mesh instead of creating 3 different variables for it. (like the *Objects above.))
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff})
)
cube3.position.x = 2
group.add(cube3)

// Position
// mesh.position.x = 0.7 // moves the cube 0.7 units to the right (x = right / left)
// mesh.position.y = -0.6 // moves the cube -0.6 units downward (y = up / down)
// mesh.position.z = 1 // moves the cube 1 unit foward (z = foward / backward)

// (Vector3 methods) set() method sets (x,y,z) axis values all at once.
// mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.x = 2 // scales the mesh 2 units on the x axis
// mesh.scale.y = 0.5 // scales the mesh 0.5 units on the y axis
// mesh.scale.z = 0.5 // scales the mesh 0.5 units on the z axis
// mesh.scale.set(2, 0.5, 0.5) // scales the mesh at all axis at once.

// Rotation
// Math.PI = does a half rotation (Math.PI * 2 = full rotation (Math.PI / 2 = quarter of a rotation))
//reorder('YXZ') = reorders the the x y z axis to y x z. (needs to be done before the rotation)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.x = Math.PI * 0.25


// Vector3 methods
// console.log(mesh.position.length()) //console.logs the distance from the center of the scene to the position of the mesh.
// mesh.position.normalize() // normalizes and reduces the vector length to 1 unit.
// console.log(mesh.position.length())

// AxesHelper
const axesHelper = new THREE.AxesHelper() //AxesHelper is an object so it needs to be added to the scene. ('2' makes the axis length 2 units longer)
scene.add(axesHelper)

/**
 * Sizes
*/
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
scene.add(camera)

// lookaAt(...) makes the camera look at object from the position of the object.
// camera.lookAt(mesh.position)

// (Vector3 methods) what if you want to know the distance between the camera and the mesh object?
// console.log(mesh.position.distanceTo(camera.position)) //console.logs the distance from the mesh.position to the camera's position.


/**
 * Renderer (takes a picture of scene and the meshes that's been added to it)
 * Position needs to be done before the render (if you want to render the position of the object)
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

