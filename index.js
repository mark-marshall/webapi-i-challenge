const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

const urlRoot = '/api/users';

//GET FULL USERLIST
server.get(urlRoot, (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

//GET INDIVIDUAL USER
server.get(`${urlRoot}/:id`, (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

//DELETE INDIVIDUAL USER
server.delete(`${urlRoot}/:id`, (req, res) => {
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
    .catch(() => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

//ADD NEW USER
server.post(urlRoot, (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    db.insert(user)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(() => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database',
        });
      });
  }
});

//UPDATE EXISTING USER
server.put(`${urlRoot}/:id`, (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    db.update(id, user)
      .then(count => {
        if (count === 1) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({
              message: 'The user with the specified ID does not exist.',
            });
        }
      })
      .catch(() => {
        res.status(500).json({ error: 'The user could not be removed' });
      });
  }
});

server.listen(4000, () => console.log('server running on port 4000'));
