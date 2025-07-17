
// Add a new cryptocurrency
function addCrypto() {
    const name = document.getElementById('cryptoName').value;
    const quantite = document.getElementById('cryptoQuantite').value;
    const dateAjoute = new Date().toISOString(); // Get current date

    fetch('http://localhost:5000/api/cryptos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, quantite, date_ajoute: dateAjoute })
    })
    .then(response => response.text()) // Use .text() to get plain text response
    .then(message => {
        alert(message); // Display the plain text message
        document.getElementById('addCryptoForm').reset();
        showCryptos(); // Refresh the table
    })
    .catch(error => console.error('Erreur lors de l\'ajout de la cryptomonnaie:', error));
}

// Add a new transfer
function addTransfers() {
    const sourceName = document.getElementById('sourceName').value;
    const destinationName = document.getElementById('destinationName').value;
    const quantite = document.getElementById('transfersQuantite').value;
    const dateTransfert = new Date().toISOString(); // Get current date

    fetch('http://localhost:5000/api/transfers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source_name: sourceName, destination_name: destinationName, quantite, date_transfert: dateTransfert })
    })
    .then(response => response.text()) // Use .text() to get plain text response
    .then(message => {
        alert(message); // Display the plain text message
        document.getElementById('addTransfersForm').reset();
        showTransfers(); // Refresh the table
    })
    .catch(error => console.error('Erreur lors de l\'ajout de la transfer:', error));
}




// Function to format ISO date string to the desired format
function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage with fetch data
function showCryptos() {
    fetch('http://localhost:5000/api/cryptos')
        .then(response => response.json())
        .then(data => {
            const cryptoTableBody = document.querySelector('#cryptoTable tbody');
            cryptoTableBody.innerHTML = '';
            data.forEach(crypto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${crypto.name}</td>
                    <td>${crypto.Quantité}</td>
                    <td>${crypto.date_ajoute ? formatDate(crypto.date_ajoute) : 'Non défini'}</td>
                    <td><button onclick="deleteCrypto(${crypto.id})">Supprimer</button></td>
                `;
                cryptoTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

function showTransfers() {
    fetch('http://localhost:5000/api/transfers')
        .then(response => response.json())
        .then(data => {
            const transferTableBody = document.querySelector('#transferTable tbody');
            transferTableBody.innerHTML = '';
            data.forEach(transfer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${transfer.source_name}</td>
                    <td>${transfer.destination_name}</td>
                    <td>${transfer.quantite}</td>
                    <td>${transfer.date_transfert ? formatDate(transfer.date_transfert) : 'Non défini'}</td>
                    <td><button onclick="deleteTransfers(${transfer.id})">Supprimer</button></td>
                `;
                transferTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
}


// Fonction pour supprimer une cryptomonnaie
function deleteCrypto(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette cryptomonnaie ?')) {
        fetch(`http://localhost:5000/api/cryptos/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                // Code pour rafraîchir la liste des cryptomonnaies
                showCryptos();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la cryptomonnaie:', error);
                alert('Erreur lors de la suppression de la cryptomonnaie');
            });
    }
}

// Fonction pour supprimer un transfert
function deleteTransfers(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce transfert ?')) {
        fetch(`http://localhost:5000/api/transfers/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                // Code pour rafraîchir la liste des transferts
                showTransfers();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du transfert:', error);
                alert('Erreur lors de la suppression du transfert');
            });
    }
}

