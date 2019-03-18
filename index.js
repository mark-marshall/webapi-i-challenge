const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/api/users', (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user.id) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

server.listen(4000, () => console.log('server running on port 4000'));
