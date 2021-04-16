let container, camera, renderer, scene, heart;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 45;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 1;
  const far = 500;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 30);

  //Lighting
  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model: CAT
  const loader = new THREE.GLTFLoader();
  loader.load("./cat/scene.gltf", function (gltf) {
    gltf.scene.scale.multiplyScalar(10); // adjust scalar factor to match your scene scale
    scene.add(gltf.scene);
    heart = gltf.scene.children[0];
    animate();
  });

  //Load Model: HEART
  // const loader = new THREE.GLTFLoader();
  // loader.load("./heart/scene.gltf", function (gltf) {
  //   gltf.scene.scale.multiplyScalar(10 / 100); // adjust scalar factor to match your scene scale
  //   scene.add(gltf.scene);
  //   heart = gltf.scene.children[0];
  //   animate();
  // });
}

function animate() {
  requestAnimationFrame(animate);
  heart.rotation.z += 0.005;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
