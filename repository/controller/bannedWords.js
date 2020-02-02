const router = require('express').Router();
const mongoose = require('mongoose');
const BannedWords = mongoose.model('BannedWord');
const auth = require('../auth');

router.get('/bannedWords', auth.optional, function(req, res, next) {
    BannedWords.find()
    .then(function(badWords) {
        return badWords.toJSONFor()
    }).catch(next)
});

router.post('/bannedWords', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if(!user) {
            return res.sendStatus(401);
        }

        let badWord = new BannedWords(req.body.badWord);

        return badWord.save().then(function() {
            return res.json({
                badWord: article.toJSONFor()
            });
        });
    }).catch(next);
});

router.put('/:bannedWord', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if(req.body.badWord.word.toString() === req.payload.badWord.word.toString()) {
            if(typeof req.body.word !== 'undefined') {
                req.badWord.word = req.body.badWord.word;
            }

            if(typeof req.body.value !== 'undefined') {
                req.badWord.value = req.body.badWord.value;
            }

            req.badWord.save().then(function(article) {
                return res.json({
                    badWord: badWord.toJSONFor()
                });
            }).catch(next);
        } else {
            return res.sendStatus(403);
        }
    });
});

router.delete('/:bannedWord', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user) {
        if(!user) {
            return res.sendStatus(401);
        }

        if(req.badWords._id.toString() === req.payload.id.toString()) {
            return req.badWords.remove().then(function() {
                return res.sendStatus(204);
            });
        } else {
            return res.sendStatus(403);
        }
    }).catch(next);
});

module.exports = router;