const shortid = require('shortid');
const URL = require('../models');

async function handleNewShortURL(req, res) {
    const body = req.body;
    
     
    if (!body.url) {
        return res.status(400).json({ error: 'Long URL is required' });
    }

    try {
        const shortID = shortid();

        
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: []
        });

        return res.json({ id: shortID });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { handleNewShortURL };
