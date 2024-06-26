const router = require('express').Router()

const Contents = require('../../models/Contents.model')
const Content = require('../../schemas/Content.schema')



router.get('/:id/staff', (req, res) => {
    Contents.findStaff(req.params.id).then(staff => {
        if(!staff || staff.length==0) return res.status(404).json({msg:'not found'})
        return res.status(200).json({data: staff})
    })
    .catch(err => {console.log('ERROR:', err); return res.status(500).json({error: err, msg:'server error'})})
})

router.get('/:id/episodes', (req, res) => {
    Contents.getEpisodes(req.params.id, req.query.page || 1).then(episodes => {
        if (!episodes) return res.status(404).json({ msg: 'not-found' })
        return res.status(200).json({ ...episodes })
    })
        .catch(err => { console.log('ERROR:', err); res.status(500).json(err) })
})


router.get('/character/:id', (req, res) => {
    Contents.findCharacterById(req.params.id).then(character => {
        if (!character) return res.status(404).json({ msg: 'not-found' })
        return res.status(200).json({ character })
    })
        .catch(err => { console.log('ERROR:', err); res.status(500).json(err) })
})


router.get('/:id/characters', (req, res) => {
    Contents.getCharacters(req.params.id).then(characters => {
        if (!characters) return res.status(404).json({ msg: 'not-found' })
        return res.status(200).json({ data: characters })
    })
        .catch(err => { console.log('ERROR:', err); res.status(500).json({ msg: err }) })
})


router.get('/search', (req, res) => {
    const params = {}
    for (let [key, value] of Object.entries(req.query))
        if (key === 'genres') params[key] = value.split(',')
        else params[key] = value
    Contents.find(params)
        .then(contents => {
            if (!contents?.data?.length) return res.status(404).json({ msg: 'not found' })
            return res.status(200).json(contents)
        })
        .catch(err => { console.error('ERROR:' + err); res.status(500).json({ msg: err }) })
})

router.get('/persistent-search', (req, res) => {

    const params = {}, options = {}
    for (let [key, value] of Object.entries(req.query)) Contents.opts.includes(key) ? options[key] = value : params[key] = value

    for (let [key, val] of Object.entries(params))
        if (key === 'genres' || key === 'studios') params[key] = val.split(',')

    Contents.persistenceFind(params, options).then(contents => {

        if (!contents) return res.status(404).json({ msg: 'not-found' })

        return res.status(200).json(contents)
    })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
})


router.get('/recommendations', (req, res) => {
    Contents.getRecommendations().then(data => {
        if (!data) return res.status(400).json({ msg: 'not-found' })
        return res.status(200).json(data)
    })
        .catch(err => { console.log(err); res.status(500).json({ msg: err }) })
})


router.get('/:id', (req, res) => {
    Contents.findById(req.params.id)
        .then(content => {
            if (!content) return res.status(404).json({ msg: 'not found' })
            return res.status(200).json(content)
        })
        .catch(err => { console.error('ERROR: ' + err); res.status(500).json({ msg: err }) })
})
router.post('/:userId/like/:contentId', async (req, res) => {
    const { userId, contentId } = req.params;
    try {
        const likes = await Contents.like(userId, contentId);
        if (likes !== undefined) {
            return res.status(200).json(likes); // Return the number of likes directly
        } else {
            return res.status(404).json({ msg: 'Failed to add like' });
        }
    } catch (error) {
        console.error('ERROR: ' + error);
        res.status(500).json({ msg: error });
    }
});
router.put('/:contentId/score', async (req, res) => {
    const { contentId } = req.params;
    const { score, userId } = req.body;

    try {
        await Contents.updateScore(contentId, score, userId);
        return res.status(200).json({ msg: 'Score updated successfully' });
    } catch (error) {
        console.error('Error updating score:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;