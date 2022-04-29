'use strict';

const router = require('express').Router();
const users = require('models/users');

router.get('/user', (req, res) => {

    const login = req.query.login;

    if (users[login]) {
        res.status(200).send(users[login]);

    } else {
        users[login] = {}
        res.status(201).send(users[login]);
    }

});

router.post('/user/registration', (req, res) => {
    const login = req.body.login
    const password = req.body.password

    if (users[login]) {
        res.status(201).send({error : "Такой пользователь уже есть"});

    } else {
        users[login] = {
            admin: false,
            password : password
        }
        res.status(200).send(users[login]);
    }
})

module.exports = router;