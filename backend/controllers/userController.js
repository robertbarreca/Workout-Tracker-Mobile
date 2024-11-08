/**
 * @fileoverview User Controllers
 *
 * @description This module defines the logic behind user-related operations. 
 *
 * @dependencies ../models/userModel, jsonwebtoken 
 */

const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

/**
 * @function sign
 * @description Creates a jwt token
 * 
 * @param {string} paramName - id of user function makes token for
 * 
 * @returns {string} The generated JWT Token
 */
const sign = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

/**
 * @function loginUser
 * @description Handles user login by validating credentials and returning a JWT token.
 * 
 * @param {Object} req - The request object containing the user credentials
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the user's email and JWT token upon successful login, or an error message upon failure.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.login(email, password)
        const token = sign(user._id)

        res.status(200).json({email, username: user.username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * @function signupUser
 * @description Handles user signup by validating credentials and returning a JWT token.
 * 
 * @param {Object} req - The request object containing the user credentials
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the user's email and JWT token upon successful signup, or an error message upon failure.
 */
const signupUser = async (req, res) => {
    const { email, password, username } = req.body
    try {
        const user = await User.signup(email, password, username)
        const token = sign(user._id)

        res.status(200).json({email, username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * @function getAllUsers
 * @description gets all user usernames, id's and emails
 * 
 * @param {*} req The request object containing the user credentials
 * @param {*} res The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing all users' id, username, and email upon successful request, or an error message upon failure.
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("username email")
        res.status(200).json(({users}))    
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

/**
 * @function 
 * @description changes a logged in user's current username
 * 
 * @param {*} req The request object containing the user credentials
 * @param {*} res The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing  the user's id and updated username upon success, or an error message upon failiure
 */
const editUsername = async (req, res) => {
    const userId = req.user._id
    const {newUsername} = req.body

    try {
        const updatedUser = await User.editUsername(userId, newUsername);
        res.status(200).json({ user: updatedUser })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


module.exports = {loginUser, signupUser, getAllUsers, editUsername}