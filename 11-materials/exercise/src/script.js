import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


/**
 * Debug UI
 */
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/4.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
// MeshBasicMaterial
// 1st way of instancing the material
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })

// 2nd way of instancing the material
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// // Color (you can combine the color with the material)
// material.color = new THREE.Color('red')
// // Wireframe
// material.wireframe = true
// Opacity
// material.transparent = true
// material.opacity = 0.5
// AlphaMap
// material.alphaMap = doorAlphaTexture
// Side (puts texture on both sides of the geometry) (avoid using Doubleside whenever possible, it requires more resources when rendering)
// material.side = THREE.DoubleSide

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// // material.wireframe = true
// material.flatShading = true

// MeshMatCapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial (first material that needs ligth in order to be displayed)
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100 // shininness controls the light reflection intensity
// material.specular = new THREE.Color(0x1188f) // specular controls the light reflection color

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// // MeshStandardMaterial (uses PBR standard) (we're adding a Debug UI (lil-gui) to the tweak the PBR properties)
// // After this we're RGBELoading an EnvironmentMap
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1

// //Properties of MeshStandardMaterial
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1 // increase the ambient occlusion intensity
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5) // changes the normal intensity with normalScale (it's a Vector2) (therefore only. x, y values)
// material.alphaMap = doorAlphaTexture
// material.transparent = true //transparency property has to be 'true' for alphaMap to work.
// //Alpha = white is visible, black isn't visible

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// MeshPhysicalMaterial (does the same as MeshStandardMaterial but with support of additional effects)
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
material.roughness = 1

//Properties of MeshPhysicalMaterial
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1 // increase the ambient occlusion intensity
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5) // changes the normal intensity with normalScale (it's a Vector2) (therefore only. x, y values)
material.alphaMap = doorAlphaTexture
material.transparent = true //transparency property has to be 'true' for alphaMap to work.
//Alpha = white is visible, black isn't visible

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// Sheen (good use for fluffy material like couches, arm chairs)
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenColor')

// Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001) // if you go beyond 1 and above 2.333, you create materials that doesn't exist in real life.
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission (enables light to go through the material) (it gives a plastic glassy feel to the material)
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)




const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5



scene.add(sphere, plane, torus)

/**
 * Lights (Connected to the MeshLambertMaterial)
 */
// const ambientLights = new THREE.AmbientLight(0xfffffff, 1)
// scene.add(ambientLights)

// const pointLight = new THREE.PointLight(0xfffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Environment Map (importent to have it after the scene has been created)
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    // console.log(environmentMap)
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// tick()