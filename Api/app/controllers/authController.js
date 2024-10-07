const db = require('../config/db.config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, username });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ token: null, message: 'Invalid Password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ id: user.id, username: user.username, token });
  });
};

exports.getUser = (req, res) => {
  const query = 'SELECT id, username FROM users WHERE id = ?';
  db.query(query, [req.userId], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'No user found.' });
    
    res.status(200).send(results[0]);
  });
};

exports.updatePassword = (id, newPassword, result) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log("Error al encontrar el ID del Usuario", err);
      result(err, null);
      return;
    }
    if (res.length === 0) {
      console.log("Usuario no encontrado");
      result({ kind: "not_found" }, null);
      return;
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], (err, res) => {
      if (err) {
        console.log("Error al actualizar la contraseña", err);
        result(err, null);
        return;
      }
      console.log("Contraseña actualizada correctamente");
      result(null, { id: id, message: "Contraseña actualizada exitosamente" });
    });
  });
};

