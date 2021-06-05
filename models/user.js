const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLES = ['admin', 'writer', 'guest']
const UserSchema = new Schema({
    firstName: {type: String, min: 4, max: 50, required: true},
    lastName: {type: String, min: 3, max: 60, required: true},
    role: {type: String, enum: ROLES}, 
    createdAt: {type: Date, default: Date.now()},
    numberOfArticles: {type: Number, default: 0},
    nickname: {type: String},
    articles: [
        {type: Schema.Types.ObjectId, ref: 'Article'}
    ]
});

module.exports = mongoose.model('User', UserSchema);