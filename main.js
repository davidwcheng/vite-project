import "./style.css";

import * as THREE from "three";

import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import {
  BackSide,
  BoxGeometry,
  IcosahedronGeometry,
  OctahedronGeometry,
} from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3 ,16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x466afa });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointL = new THREE.PointLight(0xffffff);
pointL.position.set(5, 5, 5);

const ambientL = new THREE.AmbientLight(0xffffff);

scene.add(pointL, ambientL);

const orbitControls = new OrbitControls(camera, renderer.domElement);

function addObjects() {
  const geometryIco = new THREE.IcosahedronGeometry(1, 2);
  const materialIco = new THREE.MeshStandardMaterial({ color: 0xf58488 });
  const icosohedron = new THREE.Mesh(geometryIco, materialIco);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  icosohedron.position.set(x, y, z);
  scene.add(icosohedron);
}

Array(200).fill().forEach(addObjects);

const bigSur = new THREE.TextureLoader().load("download.jpg");
scene.background = bigSur;

const meTexture = new THREE.TextureLoader().load("david.jpg");
const david = new THREE.Mesh(
  new BoxGeometry(4, 4, 4),
  new THREE.MeshBasicMaterial({ map: meTexture })
);

const jupiterTexture = new THREE.TextureLoader().load("jupiterPan.jpg");
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
);

scene.add(david,jupiter);

jupiter.position.z = 30;
jupiter.position.setX(-10);

function moveCam(){
  const t = document.body.getBoundingClientRect().top;
  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;
  jupiter.rotation.z += 0.05;

  david.rotation.y += 0.01;
  david.rotation.z += 0.01;

  camera.position.z = t*-0.01;
  camera.position.x = t *-0.0002;
  camera.position.y = t *-0.0002;
}

document.body.onscroll = moveCam

function animateFrame() {
  requestAnimationFrame(animateFrame);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  orbitControls.update();

  renderer.render(scene, camera);
}
animateFrame();
