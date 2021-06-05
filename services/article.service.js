const UserModel = require('../models/user');
const ArticleModel = require('../models/article');

module.exports = {
    updateArticle,
    createArticle,
    getFilteredArticles,
    removeArticle
}

async function createArticle(data) {
    const existingUser = await UserModel.findOne({_id: data.owner});
    if (!existingUser) {
        return 'No user found';
    }
    const article = await ArticleModel.create(data);
    existingUser.articles.push(article._id);
    existingUser.numberOfArticles++;
    await existingUser.save();
    return article;
}

async function updateArticle(articleId, data) {
    const existingArticle = await ArticleModel.findById(articleId);
    if (!existingArticle) {
        return 'No article found';
    }
    Object.entries(data || {}).forEach(([key, value]) => {
        if ([
            'title',
            'subtitle',
            'description',
            'owner',
            'category'
        ].includes(key)) existingArticle[key] = value || undefined;
    });

    await existingArticle.save();
    return existingArticle;
}

async function getFilteredArticles(filter) {
    const filteredArticles = await ArticleModel.find(filter).populate('owner');
    if (filteredArticles.length === 0) {
        return await ArticleModel.find().populate('owner');
    }
    return filteredArticles;
}

async function removeArticle(articleId) {
    const existingArticle = await ArticleModel.findById(articleId);
    const existingUser = await UserModel.findById(existingArticle.owner);
    if (!existingArticle) {
        return 'No article found';
    } else {
        existingUser.numberOfArticles--;
        return await ArticleModel.deleteOne({"_id": articleId});
    }
}