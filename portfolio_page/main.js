import './style.css'
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
const welcome = document.getElementById('welcome')
const blockquote = document.getElementById('blockquote')
const mybio = document.getElementById('MyBio')
const p1 = document.getElementById('p1')
const p2 = document.getElementById('p2')
const p3 = document.getElementById('p3')
const desc0 = document.getElementById('desc0')
const desch = document.getElementById('desh')
const desc1 = document.getElementById('desc1')
//setting clear background
renderer.setClearColor(0x000000, 0)

//Adding lights

const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5, 5, 5);

const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight)


//sphere

const geometry = new THREE.SphereGeometry( 8, 10, 10 );

const wireframe = new THREE.WireframeGeometry( geometry );

const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
line.position.z = 10;
line.position.setX(10)
scene.add( line );


//star 

function addstar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addstar);



//animating all scene

function animate() {
  requestAnimationFrame(animate);
  line.rotation.x += 0.01;
  line.rotation.y += 0.005;
  line.rotation.z += 0.01;
  renderer.render(scene, camera);
}

function movecameraUp(){
  const t = document.body.getBoundingClientRect().top;
  line.position.x -= 0.05;
  line.position.y -= 0.01;
  line.position.z -= 0.05;
}

function movecameraDown() {
  const p = document.body.getBoundingClientRect().top;
  line.position.x += 0.05;
  line.position.y += 0.01;
  line.position.z += 0.05;
}

// detecting onscroll 
let oldValue = 0
let newValue = 0
window.addEventListener('scroll', (e) => {
  newValue = window.pageYOffset;
  if (oldValue < newValue) {
    movecameraUp()
  } else if (oldValue > newValue) {
    movecameraDown()
  }
  oldValue = newValue;
});

//adding my info

welcome.innerHTML = "Bienvenido";
blockquote.innerHTML = "Hola amigos esta es una breve descripcion personal, si me quieres conocer un poco mas este es el lugar correcto";
mybio.innerHTML = "Mi biografia";
p1.innerHTML = "Soy un entusiasta de la tecnologia, me encanta aprender por mi cuenta todo acerca del desarrollo web asi como la administracion de sistemas"
p2.innerHTML = "Me gusta desarrollar frontend y backend utilizando javascript"
p3.innerHTML = "Aunque lo que mas me gusta es jugar con linux y configurar servidores, asi como aprender de lo nuevo en el ramo"
desch.innerHTML = "Por el momento me encuentro siendo un desarrollador Freelancer asi como ser product owner en Jarsa Sistemas"
desc1.innerHTML = "Por el momento mis siguientes proyectos cuentan con aprender Rust y Go"

//
movecameraUp()

animate();









