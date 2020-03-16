const Posts = require("./data/db");
const express = require("express");
const router = express.Router();


// Get requests
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id) 
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
    
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    Posts.findCommentById(id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ error: "The comment with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved."})
        })
})


// Post requests
router.post('/', (req, res) => {
    const postInfo = req.body
    console.log(postInfo)
    Posts.insert(postInfo)
        .then(post => {
            if (postInfo.title && postInfo.content) {
                postInfo.id = shortid.generate();
                res.status(201).json(postInfo)
            } else {
                res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
})

// Delete request
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Posts.remove(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed." })
        })
})

// Put requests
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    Posts.update(id, updates)
        .then(post => {
            if (updates.title && updates.contents) {
                res.status(200).json(post)
            } else if (!updates.title || updates.contents) {
                res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})

module.exports = router;