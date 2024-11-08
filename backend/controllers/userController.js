/**
 * @fileoverview User Controllers
 *
 * @description This module defines the logic behind user-related operations. 
 *
 * @dependencies ../models/userModel, jsonwebtoken 
 */

const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const sign = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

// login user
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

// signup user
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

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("username email")
        res.status(200).json(({users}))    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser, getAllUsers}