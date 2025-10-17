// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.set(0, 0, 150);

// Create gradient texture for particles
const texture = (() => {
  const size = 16;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.2, "#00ffff"); // Cyan
  gradient.addColorStop(0.4, "#000040"); // Deep blue
  gradient.addColorStop(1, "#000000");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const tex = new THREE.Texture(canvas);
  tex.needsUpdate = true;
  return tex;
})();

// Create torus knot geometry and point cloud material
const geometry = new THREE.TorusKnotGeometry(100, 40, 512, 64, 2, 3);
const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 3,
  map: texture,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

// Use Points instead of deprecated PointCloud
const knot = new THREE.Points(geometry, material);
scene.add(knot);

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.01;
  knot.rotation.z += 0.01;
  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

// Start rendering
animate();
