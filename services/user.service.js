const UserModel = require('../models/user');
const ArticleModel = require('../models/article');

module.exports = {
    createUser,
    updateUser,
    getUser,
    removeUser,
    getUsers,
    getAllUserArticles
}

async function createUser(data) {
    const existingUser = await UserModel.findOne({firstName: data.firstName});
    if (existingUser) {
        return 'User already exist';
    }
    const newUser = new UserModel(data);
    return newUser.save();
}

async function updateUser(userId, data) {
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
        return 'User doesn`t exist';
    } 
    Object.assign(existingUser, data);
    return await existingUser.save();
}

async function getUser(userId) {
    const existingUser = await UserModel.findById(userId).populate('articles','title subtitle description category');
    if (!existingUser) {
        return 'User doesn`t exist';
    } 
    return existingUser
}

async function removeUser(userId) {
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
        return 'User doesn`t exist';
    } 
    await UserModel.deleteOne({_id: userId});
    await ArticleModel.deleteMany({ owner: userId})
}

async function getUsers() {
    const users = await UserModel.find();
    if (!users) {
        return 'Empty userlist';
    } 
    return users;
}

async function getAllUserArticles(userId) {
    let existingArticles = await ArticleModel.find({owner: userId});
    if (existingArticles.length === 0) {
        return 'No aricles of this user';
    }
    return existingArticles;
}