const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

const urlRoot = '/api/users';

server.get(urlRoot, (req, res) => {
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

server.get(`${urlRoot}/:id`, (req, res) => {
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
    .catch(err => {
      res.status(500).json({ error: 'The user could not be removed' });
    });
});

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
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the user to the database',
        });
      });
  }
});

server.put(`${urlRoot}/:id`, (req, res) => {
    const { id } = req.params;
    const user = req.body;
    if(!user.name || !user.bio){
        res
        .status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
    db.update(id, user)
    .then(count => {
        if(count === 1){
            res.status(200).json(count);
        } else {
            res.status(500).json({ error: "The user could not be removed" });
        }
    })
    .catch(err => {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    })
    }
})

server.listen(4000, () => console.log('server running on port 4000'));
