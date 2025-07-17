
function submitForm() {
    // Soumet le formulaire pour ajouter ou modifier un utilisateur
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Vérifie si les mots de passe correspondent
    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
        return; // Arrête l'exécution si les mots de passe ne correspondent pas
    }

    const requestConfig = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    };

    if (id) {
        // Met à jour un utilisateur existant
        fetch(`http://localhost:5000/api/users/${id}`, {
            ...requestConfig,
            method: 'PUT'
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            displayUsers();
            
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            alert("Erreur lors de la mise à jour de l'utilisateur");
        });
    } else {
        // Ajoute un nouvel utilisateur
        fetch('http://localhost:5000/api/users', {
            ...requestConfig,
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            displayUsers();
           
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            alert("Erreur lors de l'ajout de l'utilisateur");
        });
    }
}

function displayUsers() {
    // Récupère et affiche la liste des utilisateurs
    fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then(users => {
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="edit-btn" onclick="editUser(${user.id})">Modifier</button>
                        <br>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">Supprimer</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            
        });
}


function editUser(id) {
    // Remplit le formulaire avec les données de l'utilisateur pour modification
    fetch(`http://localhost:5000/api/users/${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('name').value = user.name;
            document.getElementById('email').value = user.email;
            document.getElementById('password').value = user[`mot de passe`];
            document.getElementById('confirmPassword').value = user[`mot de passe`];
            document.getElementById('userId').value = user.id;
            document.querySelector('button[type="button"]').textContent = "Mettre à jour";
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
            alert("Erreur lors de la récupération des détails de l'utilisateur");
        });
}

function deleteUser(id) {
    // Supprime un utilisateur
    fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            displayUsers();
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            alert("Erreur lors de la suppression de l'utilisateur");
        });
}

// Chargement initial des utilisateurs
displayUsers();