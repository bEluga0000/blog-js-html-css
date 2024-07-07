const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, default: 'title' },
    description: String,
    content: String,
    imageLink: String,
    published: { type: Boolean, default: false },
    userId: { type: String, required: true },
    topic: { type: String, enum: ['Technology', 'Data science', 'other'], default: 'other' },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Blog, User };
