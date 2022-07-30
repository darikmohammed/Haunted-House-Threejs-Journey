import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'lil-gui';

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Door Textures
const doorNormalTexture = textureLoader.load('/textures/door/color.jpg');
const alphaDoorTexture = textureLoader.load('/textures/door/alpha.jpg');
const aoDoorTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const heightDoorTexture = textureLoader.load('/textures/door/height.jpg');
const metalnessDoorTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessDoorTexture = textureLoader.load('/textures/door/roughness.jpg');

// Bricks Textures
const colorBrickTexture = textureLoader.load('/textures/bricks/color.jpg');
const aoBrickTexture = textureLoader.load(
  '/textures/bricks/ambientOcculusion.jpg'
);
const normalBrickTexture = textureLoader.load('/textures/bricks/normal.jpg');
const roughnessBrickTexture = textureLoader.load(
  '/textures/bricks/roughness.jpg'
);

// Grass Textures
const colorGrassTexture = textureLoader.load('/textures/grass/color.jpg');
const aoGrassTexture = textureLoader.load(
  '/textures/grass/ambientOclusion.jpg'
);
const normalGrassTexture = textureLoader.load('/textures/grass/normal.jpg');
const roughnessGrassTexture = textureLoader.load(
  '/textures/grass/roughness.jpg'
);
//repeat grass textures
colorGrassTexture.repeat.set(8, 8);
aoGrassTexture.repeat.set(8, 8);
normalGrassTexture.repeat.set(8, 8);
roughnessGrassTexture.repeat.set(8, 8);

colorGrassTexture.wrapS = THREE.RepeatWrapping;
aoGrassTexture.wrapS = THREE.RepeatWrapping;
normalGrassTexture.wrapS = THREE.RepeatWrapping;
roughnessGrassTexture.wrapS = THREE.RepeatWrapping;

colorGrassTexture.wrapT = THREE.RepeatWrapping;
aoGrassTexture.wrapT = THREE.RepeatWrapping;
normalGrassTexture.wrapT = THREE.RepeatWrapping;
roughnessGrassTexture.wrapT = THREE.RepeatWrapping;
/**
 * House
 */
// House group
const house = new THREE.Group();
scene.add(house);

// House walls( w= 4 d=5 h=3)

const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 3, 5),
  new THREE.MeshStandardMaterial({
    map: colorBrickTexture,
    normalMap: normalBrickTexture,
    aoMap: aoBrickTexture,
    roughnessMap: roughnessBrickTexture,
  })
);
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.5;
house.add(walls);

//Roof
const roof = new THREE.Mesh(
  new THREE.ConeBufferGeometry(4, 1, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 3 + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door

const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2.5, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorNormalTexture,
    transparent: true,
    alphaMap: alphaDoorTexture,
    aoMap: aoDoorTexture,
    displacementMap: heightDoorTexture,
    displacementScale: 0.1,
    metalnessMap: metalnessDoorTexture,
    roughnessMap: roughnessDoorTexture,
  })
);

door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.z = 2.5 + 0.01;
door.position.y = 1.11;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.5, 0, 2.7);
house.add(bush1);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.75, 0.75, 0.75);
bush2.position.set(-1.3, 0.25, 2.7);

house.add(bush2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.25, 0.25, 0.25);
bush3.position.set(1, 0, 2.7);

house.add(bush3);

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.9, 5);
house.add(doorLight);

// Fog
const fog = new THREE.Fog('#262837', 1, 17);
scene.fog = fog;

/**
 * Graves
 */
const Grave = new THREE.Group();
scene.add(Grave);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2; // Random angle
  const radius = 4 + Math.random() * 6; // Random radius
  const x = Math.cos(angle) * radius; // Get the x position using cosinus
  const z = Math.sin(angle) * radius; // Get the z position using sinus

  // Create the mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  // Position
  grave.position.set(x, 0.3, z);

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;

  // Shadow
  grave.castShadow = true;
  // Add to the graves container
  Grave.add(grave);
}

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ffffff', 1, 4);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#ffffff', 1, 3);
scene.add(ghost2);
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: colorGrassTexture,
    normalMap: normalGrassTexture,
    roughnessMap: roughnessGrassTexture,
    aoMap: aoGrassTexture,
  })
);
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
moonLight.position.set(4, 5, -2);
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
// gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
// gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
// gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;

walls.receiveShadow = true;
floor.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Ghost update
  const ghostAngle = elapsedTime * 0.7;
  ghost1.position.x = Math.cos(ghostAngle) * 5;
  ghost1.position.z = Math.sin(ghostAngle) * 5;
  ghost1.position.y = Math.abs(Math.sin(elapsedTime));

  const ghost2Angle = elapsedTime * 0.5;
  ghost2.position.z = Math.cos(ghost2Angle) * 8;
  ghost2.position.x = Math.sin(ghost2Angle) * 8;
  ghost2.position.y = Math.abs(Math.sin(elapsedTime));

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
