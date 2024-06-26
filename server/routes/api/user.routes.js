const router = require('express').Router()

const User = require('../../schemas/User.schema')
const Users = require('../../models/Users.model')

const multer = require('multer');
const upload = multer();

const bcrypt = require('bcrypt')
const { query } = require('express')
const emailReEx = /^ (([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\.[0-9]{ 1, 3 }\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{ 2,}))$/


router.post('/signup', async (req, res) => {

    const { username, password, email } = req.body

    if (!username) return res.status(403).json({ msg: 'no-username', user: null })
    if (!password) return res.status(403).json({ msg: 'no-password', user: null })
    if (!email || emailReEx.test(email)) return res.status(403).json({ msg: 'invalid-email', user: null })
    if (await Users.find({ email })) return res.status(403).json({ msg: 'email-already-exist', user: null })

    console.log(process.env.SALT)
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(Number(process.env.SALT)))

    Users.create(User.parse({ ...req.body, password: hashedPassword })).then(user => {

        if (!user) return res.status(409).json({ msg: 'already-exists' })

        delete user.password
        res.status(201).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})


router.get('/search', (req, res) => {

    if (Object.keys(req.query).includes('password')) return res.status(300).json({ msg: 'cant-filter-by-password' })

    Users.find(req.query, 'AND').then(users => {
        if (!users.length) return res.status(404).json({ msg: 'not-found' })
        users = users.map(elm => {
            delete elm.password
            return elm
        })

        res.status(200).json(users)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/search-one', (req, res) => {
    if (Object.keys(req.query).includes('password')) return res.status(300).json({ msg: 'cant-filter-by-password' })

    Users.findOne(req.query, 'AND').then(user => {
        if (!user) return res.status(404).json({ msg: 'not-found' })

        delete user.password
        res.status(200).json(user)
    }).catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/id/:id', (req, res) => {
    Users.findById(req.params.id).then(user => {
        if (!user) return res.status(404).json({ msg: 'not-found' })

        delete user.password
        res.status(200).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/:username', (req, res) => {
    Users.find({ username: req.params.username }).then(user => {
        if (!user) return res.status(404).json({ msg: 'not-found' })
        user = user[0]

        delete user.password
        res.status(200).json(user)
    })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})

router.get('/:userId/contents/:listField', async (req, res) => {
    const { userId, listField } = req.params;
    console.log("sitio correcto", 'userId:', userId, 'listField:', listField);
    try {
        const contents = await Users.getContentsFromList(userId, listField);
        if (!contents) {
            return res.status(404).json({ msg: 'contents-not-found' });
        }
        res.status(200).json(contents);
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ msg: 'internal-server-error' });
    }
});

router.get('/:userId/check-list/:contentId/:listField', async (req, res) => {
    const { userId, contentId, listField } = req.params;
    try {
        const isOnList = await Users.checkOnList(contentId, listField, userId);
        res.status(200).json({ isOnList });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ msg: 'internal-server-error' });
    }
});
router.post('/:userId/:contentId/tracking-list/:listField', async (req, res) => {
    const { userId, contentId, listField } = req.params;

    try {
        await Users.trackingList(userId, contentId, listField);
        res.status(200).json({ msg: 'Content added to list successfully' });
    } catch (error) {
        console.error('Error adding content to list:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.get('/:userId/check-list/:contentId', async (req, res) => {
    const { userId, contentId } = req.params;
    try {
        const listName = await Users.isOnList(userId, contentId);
        if (listName) {
            res.status(200).json({ isOnList: true, listName });
        } else {
            res.status(200).json({ isOnList: false });
        }
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ msg: 'internal-server-error' });
    }
});
router.post('/:userId/:contentId/increment-episodes-count', async (req, res) => {
    const { userId, contentId } = req.params;

    try {
        const episodesCount = await Users.incrementEpisodesCount(userId, contentId);
        res.status(200).json({ episodesCount });
    } catch (error) {
        console.error('Error incrementing episodes count:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});
router.post('/:userId/:contentId/decrement-episodes-count', async (req, res) => {
    const { userId, contentId } = req.params;

    try {
        const episodesCount = await Users.decrementEpisodesCount(userId, contentId);
        res.status(200).json({ episodesCount });
    } catch (error) {
        console.error('Error incrementing episodes count:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.get('/:username/check-user-existence', async (req, res) => {
    const { username } = req.params;

    try {
        const exists = await Users.checkUserexistence(username);
        res.status(200).json(exists);
    } catch (error) {
        console.error('Error checking user existence:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.get('/:email/check-email-existence', async (req, res) => {
    const { email } = req.params;

    try {
        const exists = await Users.checkEmailexistence(email);
        res.status(200).json(exists);
    } catch (error) {
        console.error('Error checking email existence:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/:userId/modify-details', async (req, res) => {
    const { userId } = req.params;
    const { username, email, description } = req.body;

    try {
        const updatedUser = await Users.modifyUserDetails(userId, username, email, description);
        if (!updatedUser) {
            return res.status(404).json({ msg: 'user-not-found' });
        }
        res.status(200).json({ msg: 'User details updated successfully' });
    } catch (error) {
        console.error('Error modifying user details:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.post('/:userId/update-profile-picture', upload.single('profilePicture'), async (req, res) => {
    const { userId } = req.params;
    const profilePicture = req.file;

    try {
        const profilePictureUrl = await Users.updateProfilePicture(userId, profilePicture);
        res.status(200).json({ profilePictureUrl });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/:userId/update-password', async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(Number(process.env.SALT)))
    try {
        const updated = await Users.updatePassword(userId,hashedPassword);
        if (!updated) {
            return res.status(404).json({ msg: 'user-not-found' });
        }

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/:userId/delete-account', async (req, res) => {
    const { userId } = req.params;

    try {
        const deleted = await Users.deleteAccount(userId);
        if (!deleted) {
            return res.status(404).json({ msg: 'user-not-found' });
        }
        res.status(200).json({ msg: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.post('/:userId/social_media', async (req, res) => {
    const { userId } = req.params;
    const { instagram, facebook, twitter } = req.body; // Destructure fields directly

    try {
        // Assuming Users.updateSocialMedia returns the updated social media links
        const updatedSocialMedia = await Users.updateSocialMedia(userId, [instagram, facebook, twitter]);
        res.status(200).json(updatedSocialMedia);
    } catch (error) {
        console.error('Error updating social media:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


module.exports = router