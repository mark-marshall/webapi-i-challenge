const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/api/users', (req, res) => {
    db.find()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        sendUserError(500, { error: "The users information could not be retrieved." }, res);
        return;
    });
})

server.listen(4000, () => console.log('server running on port 4000'));
