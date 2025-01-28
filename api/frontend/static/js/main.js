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
    if (isLoggedIn == false)
    {
        const infoText = document.getElementById('info-text-logout');
        const details = {
          1: "Sektor 1: Prognoza burz na najbliższy tydzień jest spokojna.",
          2: "Sektor 2: Ostrzeżenie o możliwych burzach piaskowych.",
          3: "Sektor 3: Stabilne warunki pogodowe, idealne do eksploracji.",
          4: "Sektor 4: Wysoka aktywność pyłowa, zachowaj ostrożność.",
          5: "Sektor 5: Optymalne warunki dla misji badawczej.",
          6: "Sektor 6: Średnie ryzyko burz piaskowych, zaleca się ograniczenie działań na otwartej przestrzeni.",
          7: "Sektor 7: Warunki pogodowe stabilne, ale możliwość podwyższonej aktywności pyłowej w godzinach wieczornych.",
          8: "Sektor 8: Niska widoczność z powodu unoszącego się pyłu, konieczne stosowanie dodatkowych filtrów ochronnych.",
          9: "Sektor 9: Spokojna pogoda, idealna do konserwacji instalacji i sprzętu.",
          10: "Sektor 10: Silne wiatry przewidywane na popołudnie, możliwe opóźnienia w komunikacji terenowej.",
          11: "Sektor 11: Warunki sprzyjające budowie bazy, przewidywana stabilność atmosferyczna.",
          12: "Sektor 12: Stabilne warunki atmosferyczne, sprzyjające testom nowych technologii.",
          13: "Sektor 13: Podwyższona aktywność burz pyłowych w rejonach południowych, sugerowana ostrożność.",
          14: "Sektor 14: Niewielkie podmuchy wiatru i umiarkowane warunki atmosferyczne, dobre do misji zwiadowczych.",
          15: "Sektor 15: Możliwe krótkotrwałe burze magnetyczne, zachowaj ostrożność przy obsłudze urządzeń elektronicznych.",
          16: "Sektor 16: Warunki atmosferyczne sprzyjające eksploracji, minimalna aktywność pyłowa.",
          17: "Sektor 17: Średnie ryzyko burz, zaleca się monitorowanie warunków w czasie rzeczywistym.",
          18: "Sektor 18: Spokojne warunki atmosferyczne, idealne do instalacji nowych paneli solarnych.",
          19: "Sektor 19: Lekka aktywność pyłowa, zalecane działania prewencyjne na systemach wentylacyjnych.",
          20: "Sektor 20: Przewidywana stabilność atmosferyczna, doskonała okazja do rozszerzenia działań naukowych.",
        };
        infoText.innerText = details[sector] || "Brak danych o wybranym sektorze.";
        currentSector = sector;  
        document.getElementById('info-panel-logout').style.left = '0px';
    }

    else
    {
        fetchSectorDetails(sector);
    }
}

// Funkcja wyświetlająca informacje o bazie
function showBaseInfo() {
  const baseInfo = {
    1: "Baza w sektorze 1: Oczekiwana stabilność atmosferyczna, idealna do dalszej eksploracji.",
    2: "Baza w sektorze 2: Należy zachować ostrożność, burze piaskowe mogą występować.",
    3: "Baza w sektorze 3: Idealne warunki do długoterminowego pobytu.",
    4: "Baza w sektorze 4: Zbudowanie bazy jest ryzykowne z powodu dużej aktywności pyłowej.",
    5: "Baza w sektorze 5: Stabilne warunki, bezpieczne dla długoterminowego osiedlenia.",
    6: "Baza w sektorze 6: Warunki umiarkowane, ale możliwe krótkotrwałe burze piaskowe – zaleca się ostrożność przy budowie.",
    7: "Baza w sektorze 7: Stabilna pogoda w większości rejonów, ale lokalna aktywność pyłowa może wpływać na widoczność.",
    8: "Baza w sektorze 8: Niska widoczność z powodu unoszącego się pyłu, ale stabilne warunki do instalacji sprzętu ochronnego.",
    9: "Baza w sektorze 9: Spokojne warunki atmosferyczne sprzyjają długoterminowym operacjom technicznym.",
    10: "Baza w sektorze 10: Możliwe okresowe silne wiatry, zaleca się zabezpieczenie struktur budowlanych.",
    11: "Baza w sektorze 11: Warunki sprzyjające budowie bazy, przewidywana stabilność atmosferyczna.",
    12: "Baza w sektorze 12: Stabilne warunki pogodowe, idealne do rozwijania infrastruktury naukowej.",
    13: "Baza w sektorze 13: Podwyższone ryzyko burz pyłowych w niektórych rejonach – sugerowane wzmocnienie systemów ochronnych.",
    14: "Baza w sektorze 14: Umiarkowane warunki atmosferyczne, dobre do rozpoczęcia mniejszych projektów osadniczych.",
    15: "Baza w sektorze 15: Możliwe zakłócenia magnetyczne, ale ogólnie bezpieczne warunki do budowy i eksploatacji.",
    16: "Baza w sektorze 16: Stabilne warunki atmosferyczne sprzyjają rozwojowi nowych instalacji technicznych.",
    17: "Baza w sektorze 17: Średnie ryzyko wystąpienia burz pyłowych – zalecana ciągła obserwacja pogody.",
    18: "Baza w sektorze 18: Stabilna pogoda idealna do rozbudowy paneli solarnych i infrastruktury energetycznej.",
    19: "Baza w sektorze 19: Aktywność pyłowa jest minimalna, ale zalecane są prewencyjne środki ochrony sprzętu.",
    20: "Baza w sektorze 20: Warunki atmosferyczne są bardzo korzystne, idealne miejsce na dalszą ekspansję naukową.",
  };

  const infoText = document.getElementById('info-text-logout');
  infoText.innerText += "\n\n" + baseInfo[currentSector] || "Brak danych o bazie dla tego sektora.";
}

// Obsługa kliknięcia w przycisk "Baza"
document.getElementById('base-button').addEventListener('click', showBaseInfo);

// Inne przyciski (np. "Zamknij")
document.getElementById('close-panel-login').addEventListener('click', () => {
  document.getElementById('info-panel-login').style.left = '-400px';
});

document.getElementById('close-panel-logout').addEventListener('click', () => {
    document.getElementById('info-panel-logout').style.left = '-400px';
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


async function fetchSectorDetails(sectorId) {
    try {
        const response = await fetch(`/api/sectors/${sectorId}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o sektorze.");
        }
        const data = await response.json();
        updateSectorInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o sektorze.");
    }
}

function updateSectorInfo(data) {
    const infoText = document.getElementById("info-text-login");

    const installationLink = data["Installation"] !== "Brak instalacji"
    ? `<a href="#" onclick="fetchInstallationDetails(${data["Installation ID"]}); return false;">${data["Installation"]}</a>` 
    : "Brak instalacji";

    infoText.innerHTML = `
        <p>Nazwa sektora: ${data["Sector name"]}</p>
        <p>Opis: ${data["Description"]}</p>
        <p>Minimalna szerokość geograficzna: ${data["Min latitude"]}</p>
        <p>Maksymalna szerokość geograficzna: ${data["Max latitude"]}</p>
        <p>Minimalna długość geograficzna: ${data["Min longitude"]}</p>
        <p>Maksymalna długość geograficzna: ${data["Max longitude"]}</p>
        <p>Instalacja: ${installationLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchStormDetails(storm_id) {
    try {
        const response = await fetch(`/api/storms/${storm_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o burzy.");
        }
        const data = await response.json();
        updateStormInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o burzy.");
    }
}

function updateStormInfo(data) {
    const damageLink = data["Damage"] !== "Brak uszkodzeń"
    ? `<a href="#" onclick="fetchDamageDetails(${data["Damage ID"]}); return false;">${data["Damage"]}</a>` 
    : "Brak uszkodzeń";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Szerokość geograficzna centroidy: ${data["Centroid latitude"]}</p>
        <p>Długość geograficzna centroidy: ${data["Centroid longitude"]}</p>
        <p>Czas trwania: ${data["Duration"]}</p>
        <p>Rok marsjański: ${data["Mars year"]}</p>
        <p>ID fazy: ${data["Member ID"]}</p>
        <p>Subfaza misji: ${data["Mission subphase"]}</p>
        <p>Siła: ${data["Power"]}</p>
        <p>Sol: ${data["Sol"]}</p>
        <p>Szerokość burzy: ${data["Spread latitude"]}</p>
        <p>Długość burzy: ${data["Spread longitude"]}</p>
        <p>Uszkodzenia od kamieni: ${data["Stone damage"]}</p>
        <p>Uszkodzenie: ${damageLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchSpecialityDetails(speciality_id) {
    try {
        const response = await fetch(`/api/specialities/${speciality_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o specjalizacji.");
        }
        const data = await response.json();
        updateSpecialityInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o specjalizacji.");
    }
}

function updateSpecialityInfo(data) {
    const staffLink = data["Staff"] !== "Brak personelu"
    ? `<a href="#" onclick="fetchStaffDetails(${data["Staff ID"]}); return false;">${data["Staff"]}</a>` 
    : "Brak personelu";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Nazwa: ${data["Name"]}</p>
        <p>Pracownik: ${staffLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchStaffDetails(staff_id) {
    try {
        const response = await fetch(`/api/staff/${staff_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o pracowniku.");
        }
        const data = await response.json();
        updateStaffInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o pracowniku.");
    }
}

function updateStaffInfo(data) {
    const specialityLink = data["Speciality"] !== "Brak specjalizacji"
    ? `<a href="#" onclick="fetchSpecialityDetails(${data["Speciality ID"]}); return false;">${data["Speciality"]}</a>` 
    : "Brak specjalizacji";

    const conservationScheduleLink = data["Conservation schedule"] !== "Brak napraw"
    ? `<a href="#" onclick="fetchConservationScheduleDetails(${data["Conservation schedule ID"]}); return false;">${data["Conservation schedule"]}</a>` 
    : "Brak napraw";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Specjalizacja: ${specialityLink}</p>
        <p>Imię: ${data["Name"]}</p>
        <p>Nazwisko: ${data["Surname"]}</p>
        <p>Cechy: ${data["Traits"]}</p>
        <p>Naprawa: ${conservationScheduleLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchConservationScheduleDetails(task_id) {
    try {
        const response = await fetch(`/api/conservation_schedules/${task_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o naprawie.");
        }
        const data = await response.json();
        updateConservationScheduleInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o naprawie.");
    }
}

function updateConservationScheduleInfo(data) {
    const staffLink = data["Staff"] !== "Brak personelu"
    ? `<a href="#" onclick="fetchStaffDetails(${data["Staff ID"]}); return false;">${data["Staff"]}</a>` 
    : "Brak personelu";

    const damageLink = data["Damage"] !== "Brak uszkodzeń"
    ? `<a href="#" onclick="fetchDamageScheduleDetails(${data["Damage ID"]}); return false;">${data["Damage"]}</a>` 
    : "Brak uszkodzeń";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Pracownik: ${staffLink}</p>
        <p>Czas rozpoczęcia: ${data["Start time"]}</p>
        <p>Czas zakończenia: ${data["End time"]}</p>
        <p>Uszkodzenie: ${damageLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchPartDetails(part_id) {
    try {
        const response = await fetch(`/api/parts/${part_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o części.");
        }
        const data = await response.json();
        updatePartInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o części.");
    }
}

function updatePartInfo(data) {
    const installationLink = data["Installation"] !== "Brak instalacji"
    ? `<a href="#" onclick="fetchInstallationDetails(${data["Installation ID"]}); return false;">${data["Installation"]}</a>` 
    : "Brak instalacji";

    const partUsageLink = data["Part Usage"] !== "Brak użycia części"
    ? `<a href="#" onclick="fetchPartUsageDetails(${data["Part Usage ID"]}); return false;">${data["Part Usage"]}</a>` 
    : "Brak użycia części";

    const damageLink = data["Damage"] !== "Brak uszkodzeń"
    ? `<a href="#" onclick="fetchDamageDetails(${data["Damage ID"]}); return false;">${data["Damage"]}</a>` 
    : "Brak uszkodzeń";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Instalacja: ${installationLink}</p>
        <p>Nazwa: ${data["Name"]}</p>
        <p>Użycie części: ${partUsageLink}</p>
        <p>Uszkodzenie: ${damageLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchInstallationDetails(installation_id) {
    try {
        const response = await fetch(`/api/installations/${installation_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o instalacji.");
        }
        const data = await response.json();
        updateInstallationInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o instalacji.");
    }
}

function updateInstallationInfo(data) {
    const sectorLink = data["Sector Usage"] !== "Brak sektora"
    ? `<a href="#" onclick="fetchSectorDetails(${data["Sector ID"]}); return false;">${data["Sector"]}</a>` 
    : "Brak sektora";

    const partUsageLink = data["Part usage"] !== "Brak użycia części"
    ? `<a href="#" onclick="fetchPartUsageDetails(${data["Part usage ID"]}); return false;">${data["Part usage"]}</a>` 
    : "Brak użycia części";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Sektor: ${sectorLink}</p>
        <p>Nazwa: ${data["Name"]}</p>
        <p>Użycie części: ${partUsageLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchPartUsageDetails(part_usage_id) {
    try {
        const response = await fetch(`/api/parts_usages/${part_usage_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o użyciu części.");
        }
        const data = await response.json();
        updatePartUsageInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o użyciu części.");
    }
}

function updatePartUsageInfo(data) {
    const partLink = data["Part"] !== "Brak części"
    ? `<a href="#" onclick="fetchPartDetails(${data["Part ID"]}); return false;">${data["Part"]}</a>` 
    : "Brak części";

    const installationLink = data["Installation"] !== "Brak instalacji"
    ? `<a href="#" onclick="fetchInstallationDetails(${data["Installation ID"]}); return false;">${data["Installation"]}</a>` 
    : "Brak instalacji";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Część: ${partLink}</p>
        <p>Instalacja: ${installationLink}</p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


async function fetchDamageDetails(damage_id) {
    try {
        const response = await fetch(`/api/damages/${damage_id}/`);
        if (!response.ok) {
            throw new Error("Nie udało się pobrać danych o uszkodzeniu.");
        }
        const data = await response.json();
        updateDamageInfo(data); // Funkcja do aktualizacji panelu informacyjnego
    } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać danych o użyciu uszkodzeniu.");
    }
}

function updateDamageInfo(data) {
    const stormLink = data["Cause"] !== "Brak burzy"
    ? `<a href="#" onclick="fetchStormDetails(${data["Cause ID"]}); return false;">${data["Cause"]}</a>` 
    : "Brak burzy";

    const partLink = data["Part"] !== "Brak części"
    ? `<a href="#" onclick="fetchPartDetails(${data["Part ID"]}); return false;">${data["Part"]}</a>` 
    : "Brak części";

    const conservationScheduleLink = data["Queued task"] !== "Brak napraw"
    ? `<a href="#" onclick="fetchConservationScheduleDetails(${data["Queued task ID"]}); return false;">${data["Queued task"]}</a>` 
    : "Brak napraw";

    const infoText = document.getElementById("info-text-login");
    infoText.innerHTML = `
        <p>Powód: ${stormLink}</p>
        <p>Część: ${partLink}<p>
        <p>Zaplanowana naprawa: ${conservationScheduleLink}<p>
        <p>Stwierdzona czy podejrzewana: ${data["Presumpted or reported"]}<p>
        <p>Poważność: ${data["Severity"]}<p>
    `;
    document.getElementById("info-panel-login").style.left = "0px";
}


const closePanelLogoutButton = document.getElementById('close-panel-logout');
const closePanelLoginButton = document.getElementById('close-panel-login');

closePanelLoginButton.addEventListener('click', () => {
    document.getElementById('info-panel-login').style.left = '-400px';  
});

closePanelLogoutButton.addEventListener('click', () => {
    document.getElementById('info-panel-logout').style.left = '-400px';  
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
let isLoggedIn = false;

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
        isLoggedIn = true;
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
        isLoggedIn = false;
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