const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser)
    .get('/', userController.getUsers)

    .put('/:userId', userController.updateUser)
    .get('/:userId', userController.getUser)
    .delete('/:userId', userController.removeUser)
    
    .get('/:userId/articles', userController.getAllUserArticles)

module.exports = router;