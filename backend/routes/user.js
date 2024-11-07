/**
 * @fileoverview User Routes
 *
 * @description This module defines the routes for user-related operations. 
 * It requires authentication for all routes and handles the following operations:
 * - Logging users in 
 * - Signing users up
 * - Getting all followers of a specified user
 * - Getting all following of a specified user
 * - Getting all users
 * - follow a user
 * - unfollow a user
 * - Changing a user's name
 *
 * @dependencies express, ../middleware/requireAuth, ../controllers/workoutController
 */

const express = require("express")
const router = express.Router()
// controller functions
const {loginUser, signupUser} = require("../controllers/userController")

// login route
router.post("/login", loginUser)

// signup route
router.post("/signup", signupUser)

// // get followers route
// router.get("/:id/followers", (req, res)=> {})

// // get following
// router.get("/:userId/following", (req, res)=> {})

// // get all users (will be used for search functionality)
// router.get("/", (req, res)=> {})

// // follow user
// router.post("/users/:userId/follow", (req, res) => {})

// // unfollow user
// router.post("/users/:userId/unfollow", (req, res) => {})

// // edit name 
// router.put("/users/:userId/", (req, res) => {})

// // get all workouts of their following (do later)

module.exports = router