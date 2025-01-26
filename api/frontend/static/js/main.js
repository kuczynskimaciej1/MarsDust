const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('mars-container').appendChild(renderer.domElement);

// Wczytanie tekstury Marsa
const textureLoader = new THREE.TextureLoader();
const marsTexture = textureLoader.load(window.imagePath);  
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

// Księżyce Marsa: Fobos i Deimos
const moons = [];

function createMoon(size, distance, speed, texturePath, name) {
    const moonGeometry = new THREE.SphereGeometry(size, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texturePath),
        metalness: 0.3,
        roughness: 0.8
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(distance, 0, 0);
    moon.name = name;  
    mars.add(moon);

    moons.push({
        mesh: moon,
        distance: distance,
        speed: speed,
        angle: Math.random() * Math.PI * 2
    });
}

createMoon(0.9, 11, 0.015, window.phobosTexture, 'Phobos');
createMoon(0.5, 16, 0.01, window.deimosTexture, 'Deimos');

// Animacja
function animate() {
    requestAnimationFrame(animate);
    moons.forEach(moon => {
    moon.angle += moon.speed;
    moon.mesh.position.x = Math.cos(moon.angle) * moon.distance;
    moon.mesh.position.z = Math.sin(moon.angle) * moon.distance;
});
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

const totalSectors = 20; 
const buttonsPerPage = 5; 
let currentPage = 0; 

function generateSectorButtons() {
    sectorButtonsContainer.innerHTML = '';

    for (let i = currentPage * buttonsPerPage + 1; i <= (currentPage + 1) * buttonsPerPage && i <= totalSectors; i++) {
        const button = document.createElement('button');
        button.innerText = `Sektor ${i}`;
        button.addEventListener('click', () => showSectorInfo(i));
        sectorButtonsContainer.appendChild(button);
    }
}

// Panel z informacjami o sektorze
let currentSector = null;  

// Funkcja wyświetlająca informacje o sektorze
function showSectorInfo(sector) {
  const infoText = document.getElementById('info-text');
  const details = {
    1: "Sektor 1: Prognoza burz na najbliższy tydzień jest spokojna.",
    2: "Sektor 2: Ostrzeżenie o możliwych burzach piaskowych.",
    3: "Sektor 3: Stabilne warunki pogodowe, idealne do eksploracji.",
    4: "Sektor 4: Wysoka aktywność pyłowa, zachowaj ostrożność.",
    5: "Sektor 5: Optymalne warunki dla misji badawczej.",
    11: "Sektor 11: Warunki sprzyjające budowie bazy, przewidywana stabilność atmosferyczna.",
  };
  infoText.innerText = details[sector] || "Brak danych o wybranym sektorze.";
  currentSector = sector;  
  document.getElementById('info-panel').style.left = '0px';
}

// Funkcja wyświetlająca informacje o bazie
function showBaseInfo() {
  const baseInfo = {
    1: "Baza w sektorze 1: Oczekiwana stabilność atmosferyczna, idealna do dalszej eksploracji.",
    2: "Baza w sektorze 2: Należy zachować ostrożność, burze piaskowe mogą występować.",
    3: "Baza w sektorze 3: Idealne warunki do długoterminowego pobytu.",
    4: "Baza w sektorze 4: Zbudowanie bazy jest ryzykowne z powodu dużej aktywności pyłowej.",
    5: "Baza w sektorze 5: Stabilne warunki, bezpieczne dla długoterminowego osiedlenia.",
    11: "Baza w sektorze 11: Warunki sprzyjające budowie bazy, przewidywana stabilność atmosferyczna.",
  };

  const infoText = document.getElementById('info-text');
  infoText.innerText += "\n\n" + baseInfo[currentSector] || "Brak danych o bazie dla tego sektora.";
}

// Obsługa kliknięcia w przycisk "Baza"
document.getElementById('base-button').addEventListener('click', showBaseInfo);

// Inne przyciski (np. "Zamknij")
document.getElementById('close-panel').addEventListener('click', () => {
  document.getElementById('info-panel').style.left = '-400px';
});


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

const closePanelButton = document.getElementById('close-panel');

closePanelButton.addEventListener('click', () => {
    document.getElementById('info-panel').style.left = '-400px';  
});

generateSectorButtons();

// Panel logowania i rejestracji

const loginPanel = document.getElementById('login-panel');
const registerPanel = document.getElementById('register-panel');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const closeLoginPanelButton = document.getElementById('close-login-panel');
const adminPanelButton = document.getElementById('admin-panel-button');
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

adminPanelButton.addEventListener('click', () => {
    document.location.href = 'http://127.0.0.1:8000/admin/login/?next=/admin/'
});

// URLs for API endpoints
const API_LOGIN_URL = "/api/login/";
const API_LOGOUT_URL = "/api/logout/";
const API_REGISTER_URL = "/api/register/";

// Utility to send POST requests
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred.");
    }

    return response.json();
}
// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const username = document.querySelector("#login-panel input[type='text']").value;
    const password = document.querySelector("#login-panel input[type='password']").value;

    try {
        const result = await postData(API_LOGIN_URL, { username, password });
        alert("Logowanie udane!");
        document.querySelector("#login-panel").style.right = "-400px"; // Close the login panel
        document.querySelector("#auth-buttons").innerHTML = `
            <button id="logout-button">Wyloguj</button>
        `;
        document.querySelector("#logout-button").addEventListener("click", handleLogout);
    } catch (error) {
        alert(error.message);
    }
}

// Handle logout
async function handleLogout() {
    try {
        await postData(API_LOGOUT_URL, {});
        alert("Wylogowanie udane!");
        window.location.href = "/"; // Przekierowanie na stronę główną
    } catch (error) {
        alert(error.message);
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    const username = document.querySelector("#register-panel input[type='text']").value;
    const email = document.querySelector("#register-panel input[type='email']").value;
    const password = document.querySelector("#register-panel input[type='password']").value;
    const confirmPassword = document.querySelectorAll("#register-panel input[type='password']")[1].value;

    try {
        const result = await postData(API_REGISTER_URL, { username, email, password, confirm_password: confirmPassword });
        alert("Rejestracja udana! Proszę się zalogować.");
        document.querySelector("#register-panel").style.right = "-400px"; // Close the register panel
    } catch (error) {
        alert(error.message);
    }
}

// Attach event listeners
document.querySelector("#login-panel form").addEventListener("submit", handleLogin);
document.querySelector("#register-panel form").addEventListener("submit", handleRegister);

// Attach event listeners
document.querySelector("#login-button").addEventListener("click", () => {
    document.querySelector("#login-panel").style.right = "0";
});

document.querySelector("#close-login-panel").addEventListener("click", () => {
    document.querySelector("#login-panel").style.right = "-400px";
});




document.getElementById('phobos-button').addEventListener('click', () => {
    document.getElementById('phobos-panel').style.left = '0px';  
});

document.getElementById('deimos-button').addEventListener('click', () => {
    document.getElementById('deimos-panel').style.left = '0px';  
});


document.getElementById('close-phobos-panel').addEventListener('click', () => {
    document.getElementById('phobos-panel').style.left = '-400px';  
});

document.getElementById('close-deimos-panel').addEventListener('click', () => {
    document.getElementById('deimos-panel').style.left = '-400px';  
});

const apiKey = 'lt6L6FamZLkl9R78f7AQd4UqWW6fxLwUCg7IhDKs';
const phobosDataUrl = `https://api.le-systeme-solaire.net/rest/bodies/phobos?apiKey=${apiKey}`;
const deimosDataUrl = `https://api.le-systeme-solaire.net/rest/bodies/deimos?apiKey=${apiKey}`;

async function fetchMoonData(moonUrl) {
  const response = await fetch(moonUrl);
  const data = await response.json();
  return data;
}

async function displayMoonInfo() {
    try {
      const phobosData = await fetchMoonData(phobosDataUrl);
      const deimosData = await fetchMoonData(deimosDataUrl);
      
      const phobosInfo = `
        <h3>Phobos</h3>
        <p><strong>Wielkość:</strong> ${phobosData.mass.massValue * Math.pow(10, phobosData.mass.massExponent)} kg</p>
        <p><strong>Czas obiegu:</strong> ${phobosData.sideralOrbit} dni</p>
        <p><strong>Średnica:</strong> ${phobosData.meanRadius * 2} km</p>
        <p><strong>Typ orbity:</strong> Eliptyczna (Eccentricity: ${phobosData.eccentricity})</p>
        <p><strong>Odległość od Marsa:</strong> Średnia: ${phobosData.semimajorAxis} km, Perihelion: ${phobosData.perihelion} km, Aphelion: ${phobosData.aphelion} km</p>
        <p><strong>Temperatura powierzchni:</strong> Brak danych</p>
        <p><strong>Okres rotacji:</strong> ${phobosData.sideralRotation} godzin</p>
        <p><strong>Kompozycja chemiczna:</strong> Brak danych</p>
        <p><strong>Wielkość (wymiary):</strong> ${phobosData.dimension}</p>
        <p><strong>Grawitacja:</strong> ${phobosData.gravity} m/s²</p>
        <p><strong>Escape Velocity:</strong> ${phobosData.escape} m/s</p>
        <p><strong>Odkrywca:</strong> ${phobosData.discoveredBy}</p>
        <p><strong>Data odkrycia:</strong> ${phobosData.discoveryDate}</p>
      `;
      
      const deimosInfo = `
        <h3>Deimos</h3>
        <p><strong>Wielkość:</strong> ${deimosData.mass.massValue * Math.pow(10, deimosData.mass.massExponent)} kg</p>
        <p><strong>Czas obiegu:</strong> ${deimosData.sideralOrbit} dni</p>
        <p><strong>Średnica:</strong> ${deimosData.meanRadius * 2} km</p>
        <p><strong>Typ orbity:</strong> Prawie kołowa (Eccentricity: ${deimosData.eccentricity})</p>
        <p><strong>Odległość od Marsa:</strong> Średnia: ${deimosData.semimajorAxis} km, Perihelion: ${deimosData.perihelion} km, Aphelion: ${deimosData.aphelion} km</p>
        <p><strong>Temperatura powierzchni:</strong> Brak danych</p>
        <p><strong>Okres rotacji:</strong> ${deimosData.sideralRotation} godzin</p>
        <p><strong>Kompozycja chemiczna:</strong> Brak danych</p>
        <p><strong>Wielkość (wymiary):</strong> ${deimosData.dimension}</p>
        <p><strong>Grawitacja:</strong> ${deimosData.gravity} m/s²</p>
        <p><strong>Escape Velocity:</strong> ${deimosData.escape} m/s</p>
        <p><strong>Odkrywca:</strong> ${deimosData.discoveredBy}</p>
        <p><strong>Data odkrycia:</strong> ${deimosData.discoveryDate}</p>
      `;
  
      document.getElementById('phobos-text').innerHTML = phobosInfo;
      document.getElementById('deimos-text').innerHTML = deimosInfo;
  
    } catch (error) {
      console.error('Error fetching moon data:', error);
    }
  }
  

// Wywołaj funkcję do załadowania danych po załadowaniu strony
window.addEventListener('load', displayMoonInfo);
