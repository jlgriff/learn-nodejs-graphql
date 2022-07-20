const bcrypt = require('bcryptjs');
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
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error('User exists already!');
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
}
