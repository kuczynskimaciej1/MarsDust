document.getElementById('logout-button').addEventListener('click', () => {
    alert('Wylogowano!');
    window.location.href = '/';
});

const buttons = document.querySelectorAll('.menu-button');
const contentDisplay = document.getElementById('content-display');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        updateContent(section);
    });
});

function updateContent(section) {
    switch (section) {
        case 'zone-management':
            contentDisplay.innerHTML = `
                <h2>Zarządzanie strefami</h2>
                <div class="zones">
                    <button onclick="editZone('Sektor 1')">Sektor 1</button>
                    <button onclick="editZone('Sektor 2')">Sektor 2</button>
                    <button onclick="editZone('Sektor 3')">Sektor 3</button>
                    <button onclick="editZone('Sektor 4')">Sektor 4</button>
                </div>`;
            break;
        case 'people-management':
            contentDisplay.innerHTML = `
                <h2>Zarządzanie ludźmi</h2>
                <div class="people">
                    <button onclick="editPerson('Jan Kowalski')">Jan Kowalski</button>
                    <button onclick="editPerson('Anna Nowak')">Anna Nowak</button>
                    <button onclick="editPerson('Piotr Wiśniewski')">Piotr Wiśniewski</button>
                    <button onclick="editPerson('Katarzyna Zielińska')">Katarzyna Zielińska</button>
                </div>`;
            break;
        case 'user-management':
            contentDisplay.innerHTML = `
                <h2>Zarządzanie użytkownikami</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nazwa użytkownika</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>admin</td>
                            <td>
                                <button onclick="changePassword('admin')">Zmień hasło</button>
                                <button onclick="deleteUser('admin')">Usuń</button>
                            </td>
                        </tr>
                        <tr>
                            <td>użytkownik1</td>
                            <td>
                                <button onclick="changePassword('użytkownik1')">Zmień hasło</button>
                                <button onclick="deleteUser('użytkownik1')">Usuń</button>
                            </td>
                        </tr>
                    </tbody>
                </table>`;
            break;
        case 'statistics':
            contentDisplay.innerHTML = `
                <h2>Statystyki</h2>
                <div id="charts">
                    <canvas id="visitsChart"></canvas>
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Godzina</th>
                                <th>Liczba odwiedzin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024-01-01</td>
                                <td>10:00</td>
                                <td>120</td>
                            </tr>
                            <tr>
                                <td>2024-01-01</td>
                                <td>11:00</td>
                                <td>140</td>
                            </tr>
                        </tbody>
                    </table>
                </div>`;
            renderChart();
            break;
        default:
            contentDisplay.innerHTML = `
                <h2>Wybierz opcję z menu</h2>
                <p>Tu pojawią się szczegóły wybranej opcji.</p>`;
    }
}

function editZone(zone) {
    alert(`Edytuj informacje o ${zone}`);
}

function editPerson(person) {
    alert(`Edytuj informacje o ${person}`);
}

function changePassword(user) {
    alert(`Zmień hasło użytkownika ${user}`);
}

function deleteUser(user) {
    alert(`Użytkownik ${user} został usunięty.`);
}

function renderChart() {
    const ctx = document.getElementById('visitsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '11:00', '12:00', '13:00'],
            datasets: [{
                label: 'Liczba odwiedzin',
                data: [120, 140, 130, 150],
                borderColor: '#3e95cd',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            }
        }
    });
}