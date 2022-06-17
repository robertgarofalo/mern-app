const express = require('express')

const router = express.Router()

const { getWorkouts, 
        getSingleWorkout, 
        postSingleWorkout,
        deleteSingleWorkout, 
        updateSingleWorkout
    } = require('../controllers/workoutController')

router.route('/').get(getWorkouts).post(postSingleWorkout)
router.route('/:id').get(getSingleWorkout).delete(deleteSingleWorkout).put(updateSingleWorkout)

// // GET all workouts
// router.get('/', getWorkouts)

// // GET a single workout
// router.get('/:id', getSingleWorkout)

// // POST a new workout
// router.post('/', postSingleWorkout)

// // DELETE a new workout
// router.delete('/:id', deleteSingleWorkout)

// // UPDATE a new workout
// router.patch('/:id', updateSingleWorkout)


module.exports = router