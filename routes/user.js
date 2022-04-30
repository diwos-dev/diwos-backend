'use strict';

const router = require('express').Router();
const users = require('models/users');

function createToken () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx4xxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
        res.sendStatus(403)
    } else {
        users[login] = {
            admin: false,
            password : password
        }
        res.status(200).send(users[login]);
    }
})

router.post("/user/auth", (req, res)=> {
    const login = req.body.login
    const password = req.body.password
    const token = createToken()
    if (!users[login]) {
        res.sendStatus(403)
        return
    }
    if (users[login].password == password) {
        users[login].token = token
        res.status(200).send({
            token : token,
            isAdmin : users[login].admin
        })
    } else {
        res.sendStatus(403)
    }
})

module.exports = router;