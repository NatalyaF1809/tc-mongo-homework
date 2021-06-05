const userService = require('../services/user.service')

module.exports = {
  createUser,
  updateUser,
  getUser,
  removeUser,
  getUsers,
  getAllUserArticles
};

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const result = await userService.createUser(data);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

async function updateUser(req, res, next) {
  try {
    const data = req.body;
    const userId = req.params.userId;
    const result = await userService.updateUser(userId, data);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await userService.getUser(userId);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

async function removeUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await userService.removeUser(userId);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

async function getUsers(req, res, next) {
  try {
    const result = await userService.getUsers();
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

async function getAllUserArticles(req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await userService.getAllUserArticles(userId);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}