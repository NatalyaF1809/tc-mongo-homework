const articleService = require('../services/article.service');

module.exports = {
  createArticle,
  updateArticle,
  getFilteredArticles,
  removeArticle,
};

async function createArticle(req, res, next) {
  try {
    const data = req.body;
    const result = await articleService.createArticle(data);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

async function updateArticle(req, res, next) {
    try {
      const data = req.body;
      const articleId = req.params.articleId;
      const result = await articleService.updateArticle(articleId, data);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
}

async function getFilteredArticles(req, res, next) {
    try {
      const filter = req.body;
      const result = await articleService.getFilteredArticles(filter);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
}

async function removeArticle (req, res, next) {
    try {
      const articleId = req.params.articleId
      const result = await articleService.removeArticle(articleId);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
}

