import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import imageSource from '/textures/door/color.jpg' //we don't have to write out /static/ since static becomes the root folder of the images.

// console.log(imageSource)

/**
 * Textures
 */
// Loading an Image with Native JavaScript
// const image = new Image()
// // Creating Texture with Texture class
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace

// image.onload = () => { // use addEventListener instead of onload (it's more modern)
//     // console.log('image loaded') // console.logs 'image loaded when the image has been loaded.
//     texture.needsUpdate = true
//     console.log(texture)
// }

// image.src = '/textures/door/color.jpg' // the source of the image

// Loading texture with TextureLoader (this is the best and easiest way to load textures! let's use this!)
// One TextureLoader can load multiple textures
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('/textures/door/color.jpg', () => {
//     console.log('load')
// },
// () => {
//     console.log('progress')
// },
// () => {
//     console.log('error')
// } 
// )
// texture.colorSpace = THREE.SRGBColorSpace

// Using the LoadingManager
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//     console.log('loading started')
// }
// loadingManager.onLoad = () => {
//     console.log('loading finished')
// }
// loadingManager.onProgress = () => {
//     console.log('loading progressing')
// }
// loadingManager.onError = () => {
//     console.log('loading error')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
// adding more textures
const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heighTexture = textureLoader.load('/textures/door/height.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace

// Transforming the texture
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping // repeats the colorTexture 2 times in the x axis
// colorTexture.wrapT = THREE.RepeatWrapping // repeats the colorTexture 3 times in the y axis

// colorTexture.wrapS = THREE.MirroredRepeatWrapping // mirrored the colorTexture in the x axis
// colorTexture.wrapT = THREE.MirroredRepeatWrapping // mirrored the colorTexture in the y axis

// colorTexture.offset.x = 0.5 // offsets the color texture in the x axis
// colorTexture.offset.y = 0.5 // offsets the color texture in the y axis

// colorTexture.rotation = Math.PI * 0.25 // rotates the color texture 1 / 8 of a rotation
colorTexture.center.x = 0.5 // centers the pivot point to the middle of the cube in the x axis
colorTexture.center.y = 0.5 // centers the pivot point to the middle of the cube in the y axis

// Filtering and mipmapping
// THREE.NearestFilter is cheaper than the other ones and if the result is fine with you, just use it.
// If we're using THREE.NearestFilter on minFilter, we don't need mipmaps. we can deactivate mipmaps generation with: colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter //filters the color texture to be sharper and less blurry when it's smaller
colorTexture.magFilter = THREE.NearestFilter //magnify filters the color texture to be sharper and less blurry when it's bigger.
colorTexture.generateMipmaps = false // deactivates Mipmpaps on color texture.





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
const geometry = new THREE.BoxGeometry(1, 1, 1)
// console.log(geometry.attributes.uv) // gives us the UV cordinates of the geometry
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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