import { useDispatch } from 'react-redux'
import { deleteWorkout } from '../features/workouts/workoutSlice'


function WorkoutItem({workout}) {
const dispatch = useDispatch()

  return (
    <div className="workout">
        <div>
            {new Date(workout.createdAt).toLocaleString('en-AU')}
        </div>
        <h2>{workout.text}</h2>
        <button className="close" onClick={() => dispatch(deleteWorkout(workout._id))}>X</button>
    </div>
  )
}
export default WorkoutItem