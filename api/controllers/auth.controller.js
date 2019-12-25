const fetch = require('isomorphic-unfetch');
const config = require('../config/keys.dev');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const firebase = require('firebase');

module.exports.login = async function (req, res) {
    const db = firebase.firestore();
    const userCollectionRef = db.collection('users');
    const { body: { username, password } } = req;
    const userCandidate = userCollectionRef.where('username', '==', username).limit(1);

    userCandidate.get().then((snapshot) => {
        if (snapshot.empty) {
            return res.status(400).json({
                message: 'User does not exist!'
            });
        } else {
            snapshot.forEach(doc => {
                const user = doc.data();
                const passwordResult = bcrypt.compareSync(password, user.password);
                if (passwordResult) {
                    const token = generateToken(user.username);
                    return res.status(200).json({
                        token: 'Bearer ' + token
                    });
                } else {
                    return res.status(400).json({
                        message: 'Password did`t mached'
                    })
                }
            });
        }
    })
}

module.exports.register = async function (req, res) {
    const { body: { username, password } } = req;
    const db = firebase.firestore();
    const usersRef = db.collection('users').where('username', '==', username);
    const userCollectionRef = db.collection('users');

    usersRef.get().then(async (snapshot) => {
        if (snapshot.empty) {
            const salt = bcrypt.genSaltSync(10);
            await userCollectionRef.add({
                username,
                password: bcrypt.hashSync(password, salt),
            }).then(res => console.log(res));

            const token = generateToken(username);

            return res.status(200).json({
                token: 'Bearer ' + token
            });
        } else {
            return res.status(400).json({
                message: 'User already exist!'
            });
        }
    })
}

function generateToken(username) {
    const token = jwt.sign({
        username,
    }, config.jwtSecret, {
        expiresIn: '1d'
    });
    return token;
}