// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();
    
    // Initialize custom cursor
    initCursor();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize hero section
    initHero();
    
    // Initialize map section
    initMap();
    
    // Initialize events filter
    initEventsFilter();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initialize animations
    initAnimations();
});

// Loader initialization
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderBar = document.querySelector('.loader-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        loaderBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                document.body.style.overflow = 'visible';
            }, 500);
        }
    }, 200);
}

// Custom cursor initialization
function initCursor() {
    const cursor = document.querySelector('.cursor');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        // Cursor hover effect
        const links = document.querySelectorAll('a, button, .event-card, .feature-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
            });
        });
    }
}

// Mobile menu initialization
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Header scroll effect initialization
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Hero section initialization with Three.js
function initHero() {
    // Initialize Three.js scene
    const canvas = document.getElementById('heroCanvas');
    
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 10;
        
        // Colors (primary color with variations)
        if (i % 3 === 0) {
            colorsArray[i] = 0.388 + Math.random() * 0.1; // R: ~99/255
        } else if (i % 3 === 1) {
            colorsArray[i] = 0.4 + Math.random() * 0.1; // G: ~102/255
        } else {
            colorsArray[i] = 0.941 + Math.random() * 0.059; // B: ~241/255
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Camera position
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Responsive to mouse movement
        particlesMesh.rotation.x += mouseY * 0.0003;
        particlesMesh.rotation.y += mouseX * 0.0003;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // 3D Model for hero section
    const modelContainer = document.getElementById('model-container');
    
    if (modelContainer && typeof THREE.GLTFLoader !== 'undefined') {
        // Create a separate scene for the 3D model
        const modelScene = new THREE.Scene();
        const modelCamera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
        const modelRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        modelRenderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
        modelRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        modelContainer.appendChild(modelRenderer.domElement);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        modelScene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        modelScene.add(directionalLight);
        
        // Load 3D model (binoculars or similar campus explorer themed model)
        const loader = new THREE.GLTFLoader();
        
        // Create a placeholder geometric model until the real one loads
        const geometry = new THREE.OctahedronGeometry(1, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            metalness: 0.3,
            roughness: 0.4,
            wireframe: true
        });
        
        const model = new THREE.Mesh(geometry, material);
        modelScene.add(model);
        
        // Position camera
        modelCamera.position.z = 3;
        
        // Animation function for the model
        function animateModel() {
            requestAnimationFrame(animateModel);
            
            model.rotation.y += 0.01;
            
            modelRenderer.render(modelScene, modelCamera);
        }
        
        animateModel();
        
        // Handle window resize for the model
        window.addEventListener('resize', () => {
            modelCamera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
            modelCamera.updateProjectionMatrix();
            modelRenderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
        });
    }
}

// Map section initialization
function initMap() {
    const mapControls = document.querySelectorAll('.map-control-btn');
    const statValues = document.querySelectorAll('.stat-value');
    
    // Map control buttons
    mapControls.forEach(control => {
        control.addEventListener('click', () => {
            mapControls.forEach(btn => btn.classList.remove('active'));
            control.classList.add('active');
            
            // Here you would typically change the map view based on the selected control
            // For demonstration purposes, we're just changing the active state
        });
    });
    
    // Animate stat counters when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const mapStats = document.querySelector('.map-stats');
    if (mapStats) {
        observer.observe(mapStats);
    }
    
    function animateCounters() {
        statValues.forEach(value => {
            const target = parseInt(value.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    value.textContent = target;
                    clearInterval(timer);
                } else {
                    value.textContent = Math.floor(count);
                }
            }, 16);
        });
    }
}

// Events filter initialization
function initEventsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter events
            eventCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonials slider initialization
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-control.prev');
    const nextButton = document.querySelector('.testimonial-control.next');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    
    // Set initial position
    updateSlider();
    
    // Previous button click
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });
    }
    
    // Next button click
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });
    }
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto slide
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    track.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);
    });
    
    // Update slider position and active dot
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
}

// Initialize scroll animations
function initAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        observer.observe(card);
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Parallax for 3D model
        const modelContainer = document.getElementById('model-container');
        if (modelContainer) {
            modelContainer.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
    });
}

// Update the mobile menu initialization function
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileMenuClose = document.getElementById("mobileMenuClose")
  const mobileLinks = document.querySelectorAll(".nav-mobile .nav-link")

  // Toggle menu open
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.add("active")
    mobileMenu.classList.add("active")
    document.body.classList.add("menu-open")
  })

  // Close menu with close button
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("menu-open")
    })
  }

  // Close menu when clicking on links
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("menu-open")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })

  // Close menu with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })
}

