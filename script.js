// Full Headline Typewriter (Hero)
const headline = document.getElementById("animated-headline");
const headlines = [
  "Hi, I'm Abdul Samad",
  "Frontend Developer",
  "Code with Passion"
];
let headlineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeHeadline() {
  const current = headlines[headlineIndex];
  if (isDeleting) {
    headline.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    headline.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeHeadline, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    headlineIndex = (headlineIndex + 1) % headlines.length;
  }

  const speed = isDeleting ? 40 : 120;
  setTimeout(typeHeadline, speed);
}

// Name Typewriter in About
const nameTypewriter = document.getElementById("name-typewriter");
const nameText = "Abdul Samad";
let nameIndex = 0;
let nameForward = true;

function typeName() {
  nameTypewriter.textContent = nameText.substring(0, nameIndex);
  if (nameForward) {
    nameIndex++;
    if (nameIndex > nameText.length) {
      nameForward = false;
      setTimeout(typeName, 1500);
      return;
    }
  } else {
    nameIndex--;
    if (nameIndex === 0) {
      nameForward = true;
      setTimeout(typeName, 500);
      return;
    }
  }
  setTimeout(typeName, nameForward ? 150 : 70);
}

// 3D Background
function init3D() {
  const container = document.getElementById("canvas-container");
  if (!container) return; // اگر کونٹینر نہ ہو تو مت چلے

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00d9ff, wireframe: true });

  const cubes = [];
  for (let i = 0; i < 50; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 15);
    cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    scene.add(cube);
    cubes.push({
      mesh: cube,
      speed: { x: Math.random() * 0.02 - 0.01, y: Math.random() * 0.02 - 0.01, z: 0.01 },
    });
  }

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    cubes.forEach(item => {
      item.mesh.rotation.x += item.speed.x;
      item.mesh.rotation.y += item.speed.y;
      item.mesh.position.z += item.speed.z;
      if (item.mesh.position.z > 5) {
        item.mesh.position.z = -20;
        item.mesh.position.x = Math.random() * 20 - 10;
        item.mesh.position.y = Math.random() * 20 - 10;
      }
    });
    renderer.render(scene, camera);
  }

  animate();

  // ری سائز ہینڈلنگ
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// GSAP Animations
function initAnimations() {
  gsap.from(".hero-content", { duration: 1.2, y: 60, opacity: 0, delay: 0.3 });
  gsap.from(".subtitle", { duration: 1.2, y: 40, opacity: 0, delay: 0.7 });
 

  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => observer.observe(sec));
}

// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

// Back to Top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

// Form Submit
// document.getElementById("contactForm").addEventListener("submit", function(e) {
//   e.preventDefault();
//   alert("Thank you! I'll get back to you soon.");
//   this.reset();
// });

// On Load
window.onload = () => {
  typeHeadline();
  typeName();
  init3D();
  initAnimations();
};