const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.post('/', articleController.createArticle)
    .get('/', articleController.getFilteredArticles)
    
    .put('/:articleId', articleController.updateArticle)
    .delete('/:articleId', articleController.removeArticle)

module.exports = router;