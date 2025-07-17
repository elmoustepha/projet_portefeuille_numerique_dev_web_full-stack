// --- Importation des modules nécessaires ---
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// --- Configuration de l'application ---
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

// --- Configuration de la connexion MySQL ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

// --- Connexion à la base de données ---
db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});


// --- Routes pour la gestion des utilisateurs ---

// Route pour ajouter un nouvel utilisateur
app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        const query = 'INSERT INTO users (name, email, `mot de passe`) VALUES (?, ?, ?)';
        db.query(query, [name, email, password], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
                res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
            } else {
                res.status(200).json({ message: 'Utilisateur enregistré  avec succès' });
            }
        });
    } else {
        res.status(400).json({ message: 'Nom, email ou mot de passe manquant' });
    }
});

// Route pour obtenir un utilisateur par ID
app.get('/api/users/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', err);
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    });
});

// Route pour obtenir tous les utilisateurs
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs:', err);
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
            return;
        }
        res.json(results);
    });
});

// Route pour mettre à jour un utilisateur
app.put('/api/users/:id', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, `mot de passe` = ? WHERE id = ?';
    db.query(query, [name, email, password, req.params.id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
            return;
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    });
});

// Route pour supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', err);
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
            return;
        }
        if (results.affectedRows > 0) {
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    });
});



// --- Gestion des cryptomonnaies ---


// --- Routes pour la gestion des cryptomonnaies ---

// Route pour ajouter une nouvelle cryptomonnaie
app.post('/api/cryptos', (req, res) => {
    const { name, quantite, date_ajoute } = req.body;
    const query = 'INSERT INTO account (name, Quantité, date_ajoute) VALUES (?, ?, ?)';
    db.query(query, [name, quantite, date_ajoute], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la cryptomonnaie:', err);
            res.status(500).send('Erreur lors de l\'ajout de la cryptomonnaie');
        } else {
            res.send('Cryptomonnaie ajoutée avec succès');
        }
    });
});
// Route pour obtenir toutes les cryptomonnaies
app.get('/api/cryptos', (req, res) => {
    const query = 'SELECT * FROM account';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des cryptomonnaies:', err);
            res.status(500).json({ message: 'Erreur lors de la récupération des cryptomonnaies' });
        } else {
            res.json(results);
        }
    });
});

// --- Routes pour la gestion des transfers ---

// Route pour ajouter une nouvelle transfer
app.post('/api/transfers', (req, res) => {
    const { source_name, destination_name, quantite, date_transfert } = req.body;
    const query = 'INSERT INTO transfers_crypto (source_name, destination_name, quantite, date_transfert) VALUES (?, ?, ?, ?)';
    db.query(query, [source_name, destination_name, quantite, date_transfert], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la transaction:', err);
            res.status(500).send('Erreur lors de l\'ajout de la transaction');
        } else {
            res.send('Transfert ajoutée avec succès');
        }
    });
});

// Route pour obtenir toutes les transfers
app.get('/api/transfers', (req, res) => {
    const query = 'SELECT * FROM transfers_crypto';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des transfers:', err);
            res.status(500).json({ message: 'Erreur lors de la récupération des transfers' });
        } else {
            res.json(results);
        }
    });
});


// Route pour supprimer une cryptomonnaie
app.delete('/api/cryptos/:id', (req, res) => {
    const query = 'DELETE FROM account WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression de la cryptomonnaie:', err);
            res.status(500).json({ message: 'Erreur lors de la suppression de la cryptomonnaie' });
            return;
        }
        if (results.affectedRows > 0) {
            res.json({ message: 'Cryptomonnaie supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Cryptomonnaie non trouvée' });
        }
    });
});

// Route pour supprimer un transfert
app.delete('/api/transfers/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'ID manquant' });
    }

    const query = 'DELETE FROM transfers_crypto WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression du transfert:', err);
            return res.status(500).json({ message: 'Erreur lors de la suppression du transfert' });
        }
        if (results.affectedRows > 0) {
            res.json({ message: 'Transfert supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Transfert non trouvé' });
        }
    });
});

// --- Lancement du serveur ---
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});