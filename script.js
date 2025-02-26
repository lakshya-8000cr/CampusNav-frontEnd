// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        const spans = menuToggle.getElementsByTagName('span');
        spans[0].style.transform = mobileMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = mobileMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = mobileMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
    });
});

// 3D Scene
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create a simple geometry (placeholder for your 3D model)
    const geometry = new THREE.TorusKnotGeometry(10, 2.5, 120, 50);
    const material = new THREE.MeshPhongMaterial({
        color: 0x7c3aed,
        shininess: 100,
        opacity: 0.9,
        transparent: true
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate();
}

// Initialize 3D scene
initThreeJS();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.benefit-card, .event-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing!');
    this.reset();
});

// Import Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Attach renderer to the scene container
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.getElementById("scene-container").appendChild(renderer.domElement);

// Add light to the scene
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load the 3D Model
const loader = new THREE.GLTFLoader();
loader.load("models/your-model.glb", function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
});

// Set camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
