const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('mars-container').appendChild(renderer.domElement);

// Wczytanie tekstury Marsa
const textureLoader = new THREE.TextureLoader();
const marsTexture = textureLoader.load(window.imagePath);  // Korzystanie z globalnej zmiennej
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({
    map: marsTexture,
    metalness: 0.4,
    roughness: 0.6,
});
const mars = new THREE.Mesh(geometry, material);
scene.add(mars);

// Oświetlenie sceny 
const ambientLight = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(ambientLight);
scene.add(directionalLight);

// Kamera
camera.position.z = 15;

// Gwiazdy w tle
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.05 });
const starPositions = Array.from({ length: 10000 }, () => (Math.random() - 0.5) * 2000);
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Animacja
function animate() {
    requestAnimationFrame(animate);
    mars.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Tu jest interakcja z planetą
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener('mousedown', () => (isMouseDown = true));
document.addEventListener('mouseup', () => (isMouseDown = false));
document.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        mars.rotation.y += (e.clientX - previousMousePosition.x) * 0.005;
        mars.rotation.x += (e.clientY - previousMousePosition.y) * 0.005;
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.01;
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Panel z sektorami
const sectorButtonsContainer = document.getElementById('sector-buttons');
const prevButton = document.getElementById('prev-sector');
const nextButton = document.getElementById('next-sector');

const totalSectors = 19; // Całkowita liczba sektorów
const buttonsPerPage = 5; // Liczba przycisków widocznych na raz
let currentPage = 0; // Aktualna strona przycisków

function generateSectorButtons() {
    // Wyczyść istniejące przyciski
    sectorButtonsContainer.innerHTML = '';

    // Wygeneruj przyciski dla aktualnej strony
    for (let i = currentPage * buttonsPerPage + 1; i <= (currentPage + 1) * buttonsPerPage && i <= totalSectors; i++) {
        const button = document.createElement('button');
        button.innerText = `Sektor ${i}`;
        button.addEventListener('click', () => showSectorInfo(i));
        sectorButtonsContainer.appendChild(button);
    }
}

function showSectorInfo(sector) {
    const infoText = document.getElementById('info-text');
    const details = {
        1: "Sektor 1: Prognoza burz na najbliższy tydzień jest spokojna.",
        2: "Sektor 2: Ostrzeżenie o możliwych burzach piaskowych.",
        3: "Sektor 3: Stabilne warunki pogodowe, idealne do eksploracji.",
        4: "Sektor 4: Wysoka aktywność pyłowa, zachowaj ostrożność.",
        5: "Sektor 5: Optymalne warunki dla misji badawczej.",
        
    };
    infoText.innerText = details[sector] || "Brak danych o wybranym sektorze.";
    document.getElementById('info-panel').style.left = '0px';
}

// Obsługa przycisków nawigacyjnych
prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        generateSectorButtons();
    }
});

nextButton.addEventListener('click', () => {
    if ((currentPage + 1) * buttonsPerPage < totalSectors) {
        currentPage++;
        generateSectorButtons();
    }
});
// Obsługa przycisku zamknięcia panelu z informacjami o sektorze
const closePanelButton = document.getElementById('close-panel');

closePanelButton.addEventListener('click', () => {
    document.getElementById('info-panel').style.left = '-300px';  // Zawijanie panelu do lewej
});

// Inicjalizacja
generateSectorButtons();

// Panel logowania i rejestracji
const loginPanel = document.getElementById('login-panel');
const registerPanel = document.getElementById('register-panel');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const closeLoginPanelButton = document.getElementById('close-login-panel');
const closeRegisterPanelButton = document.getElementById('close-register-panel');

loginButton.addEventListener('click', () => {
    loginPanel.style.right = '0px';
    registerPanel.style.right = '-400px'; 
});

registerButton.addEventListener('click', () => {
    registerPanel.style.right = '0px';
    loginPanel.style.right = '-400px'; 
});

closeLoginPanelButton.addEventListener('click', () => {
    loginPanel.style.right = '-400px';
});

closeRegisterPanelButton.addEventListener('click', () => {
    registerPanel.style.right = '-400px';
});
