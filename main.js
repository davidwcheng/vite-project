import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusKnotGeometry(10, 3 , 100, 16);
const material = new THREE.MeshStandardMaterial( {color: 0x1093c7});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const pointL = new THREE.PointLight(0xffffff);
pointL.position.set(5,5,5);

const ambientL = new THREE.AmbientLight(0xffffff);

scene.add(pointL,ambientL);

const lightHelp = new THREE.PointLightHelper(pointL);
scene.add(lightHelp);

function animateFrame(){
  requestAnimationFrame(animateFrame);

  torus.rotation.x += 0.01;
  torus.rotation.y -= 0.005;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera);
}
animateFrame();