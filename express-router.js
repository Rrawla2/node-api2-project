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
    Posts.findPostComments(id)
        .then(comment => {
            if (comment.length > 0) {
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
            console.log(post)
            if (postInfo.title && postInfo.contents) {
                res.status(201).json(postInfo)
            } else {
                res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
})

router.post('/:id/comments', (req, res) => {
    const { id } = req.params
    const comments = req.body
    comments.post_id = id;
    
        Posts.insertComment(comments)
        .then(comment => {
            if (comments === 1) {
                res.status(201).json(comment)
            } else if (!comment) {
                res.status(400).json({ errorMessage: "Please provide text for the comment"})
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database." })
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
            if (post === 1) {
                res.status(200).json(post)
            } else if (!updates.title || !updates.contents) {
                res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
            } else if (post === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})

module.exports = router;