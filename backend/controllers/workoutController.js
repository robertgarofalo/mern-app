const asyncHandler = require('express-async-handler')

const Workout = require('../models/workoutModel')
const User = require('../models/userModel')

// @desc GET workouts
// @route GET /api/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({ user: req.user.id })
    res.status(200).json(workouts)
})

// @desc GET single workout
// @route GET /api/workout/:id
// @access Private
const getSingleWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    if(!workout){
        res.status(400)
        throw new Error('Workout not found')
    }

    const updatedWorkout = await Workout.findById(req.params.id)
    res.status(200).json(updatedWorkout)
})

// @desc POST single workout
// @route SET /api/workout/
// @access Private
const postSingleWorkout = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const workout = await Workout.create({
        text: req.body.text,
        user: req.user.id
    })
     
    res.status(200).json(workout)    
})

// @desc DELETE single workout
// @route DELETE /api/workout/:id
// @access Private
const deleteSingleWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    if(!workout){
        throw new Error('Workout not found')
    }

    const user = await User.findById(req.user.id)

    // check for the user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the workout user
    if(workout.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await workout.remove()
    res.status(200).json({ message: `Deleted ${workout.text} - id: ${req.params.id}`})
})

// @desc UPDATE single workout
// @route PUT /api/workout/:id
// @access Private
const updateSingleWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    if(!workout){
        res.status(400)
        throw new Error('Workout not found')
    }

    const user = await User.findById(req.user.id)

    // check for the user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the workout user
    if(workout.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedWorkout)
})

module.exports = {
    getWorkouts,
    getSingleWorkout,
    postSingleWorkout,
    deleteSingleWorkout,
    updateSingleWorkout
}