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
const requireAuth = require("../middleware/requireAuth")
const router = express.Router()
// controller functions
const {loginUser, signupUser, getAllUsers, editUsername, follow, unfollow, getFollowers, getFollowing, getUser} = require("../controllers/userController")

// login route
router.post("/login", loginUser)

// signup route
router.post("/signup", signupUser)

// require authentication for all routes below
router.use(requireAuth)

// get individual user
router.get("/:userId", getUser)

// get all users (will be used for search functionality)
router.get("/", getAllUsers)

// // follow user
router.post("/follow/:followeeId/", follow)

// // unfollow user
router.post("/unfollow/:followeeId", unfollow)

// edit username 
router.put("/editusername", editUsername)


module.exports = router