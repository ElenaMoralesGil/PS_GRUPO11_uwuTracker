const router = require('express').Router()

const Users = require('../../models/Users.model')

router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ msg: 'user not found' });
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: 'Internal Server Error' });
        });
});

router.post('/sign-up', (req, res, next) => {
    const user = req.body;
    Users.signUp(user)
        .then(result => {
            if (result.code === 480) {
                return res.status(480).json({ msg: 'Username already exists' });
            } else if (result.code === 460) {
                return res.status(460).json({ msg: 'Email already exists' });
            } else if (result.code === 201) {
                return res.status(201).json(result.user);
            } else {
                return res.status(500).json({ msg: 'Internal Server Error' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: 'Internal Server Error' });
        });
});

router.post('/sign-in', (req, res, next) => {
    const user = req.body;
    Users.signIn(user)
        .then(result => {
            if (!result || !result.user) return res.status(404).json({ msg: 'User not found' });
            res.status(result.code || 200).json(result.user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: 'Internal Server Error' });
        });
});


module.exports = router;