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

  if (name && email && password && confirmPassword) {
        // Ajoute un nouvel utilisateur
        fetch('http://localhost:5000/api/users', {
            ...requestConfig,
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            alert("Erreur lors de l'ajout de l'utilisateur");
        });
    }
}