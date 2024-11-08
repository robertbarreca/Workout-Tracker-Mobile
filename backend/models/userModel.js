/**
 * @fileoverview Schema for a user document
 * 
 * @description This files defines the schema for a user document. It also defines static methods for user authentication, including functions to login and sign up users.
 * 
 * @dependencies mongoose, bcrypt, validator
 */

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }, //hash before storing
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]
})

/**
 * @function signup
 * @description Static method for user schema that handles user signup by validating the email and password, checking if the email is already in use, and hashing the password before saving the user to the database.
 * 
 * @param {string} email - The user's email address that is used for account creation.
 * @param {string} password - The password that the user wants to use for the account.
 * 
 * @throws {Error} If any of the validation checks fail, such as missing fields, invalid email, weak password, or email already in use.
 * 
 * @returns {Object} The newly created user object, including the hashed password.
 */
userSchema.statics.signup = async function (email, password, username) {
    // remove all caps from username
    email = email.toLowerCase()
    username = username.toLowerCase()

    try {
        username = await this.validateUsername(username)
    } catch (error) {
        throw error
    }

    // validate body is filled
    if (!email || !password || !username) {
        throw Error("All fields must be filled")
    }
    // check if valid email
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    // check if password is strong
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    // check if email exists
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error("Email already in use")
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    
    const user = await this.create({ email, password: hash, username })
    return user
}



/**
 * @function login
 * @description Static method for user schema that handles user login by validating the email and password. 
 * If the credentials are correct, the user object is returned.
 * 
 * @param {string} email - The user's email address used for account login.
 * @param {string} password - The password that the user provides to log in.
 * 
 * @throws {Error} If the email does not correspond to an account, if the password is incorrect, or if either the email or password is missing.
 * 
 * @returns {Object} The logged-in user object.
 */
userSchema.statics.login = async function (email, password) {
    email = email.toLowerCase()

    // validate body is filled
    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    // Check if user exists
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Email does not correlate to an account")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}


userSchema.statics.editUsername = async function (userId, newUsername) {
    console.log(newUsername)
    if (!newUsername) {
        throw Error("must provide new username")
    }
    try {
        newUsername = await this.validateUsername(newUsername)

        const updatedUser = await this.findOneAndUpdate(
            { _id: userId },
            { username: newUsername },
            { new: true, runValidators: true, context: 'query' }
        ).select("_id username");
        return updatedUser
    } catch (error) {
        throw error
    }
}

/**
 * @function validateUsername
 * @description This helper function ensures that a username is a valid length, only contains valid characters, and is not already in use
 * 
 * @param {*} username the username to be validated
 * 
 * @throws {Error} if the username is not a valid length, contains invalid characters or is already in use
 * 
 * @returns the user name if it can be used 
 */
userSchema.statics.validateUsername = async function (username) {
    username = username.toLowerCase()

    // Username validation for length
    if (username.length < 3 || username.length > 25) {
        throw Error("Username must be between 3 and 25 characters");
    }

    // Ensure username only contains valid characters (letters, numbers, underscores)
    if (!/^[a-z0-9_]+$/.test(username)) {
        throw Error("Username can only contain lowercase letters, numbers, and underscores");
    }

    // check if username exists
    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw Error("Username already in use")
    }

    return username
}

module.exports = mongoose.model("User", userSchema)