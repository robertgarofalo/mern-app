const express = require('express')

const router = express.Router()

const { getWorkouts, 
        getSingleWorkout, 
        postSingleWorkout,
        deleteSingleWorkout, 
        updateSingleWorkout
    } = require('../controllers/workoutController')

    const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getWorkouts).post(protect, postSingleWorkout)
router.route('/:id').get(protect, getSingleWorkout).delete(protect, deleteSingleWorkout).put(protect, updateSingleWorkout)

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