const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/user');

module.exports = {
    hello() {  // method name must match the query type name in schema.js
        return {
            text: 'Hello World!',
            views: 100
        };
    }
};

module.exports = {
    createUser: async function ({ userInput }, req) {
        const email = userInput.email;
        const errors = [];
        if (!validator.isEmail(email)) {
            errors.push({ message: 'Email is invalid' });
        }
        if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
            errors.push({ message: 'Password is too short' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error('User exists already');
            throw error;
        }
        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPassword,
        });
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
    }
};
