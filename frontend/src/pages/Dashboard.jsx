import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

//components
import WorkoutForm from '../components/WorkoutForm'
import WorkoutItem from '../components/WorkoutItem'
import { getWorkouts, reset } from '../features/workouts/workoutSlice'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { workouts, isLoading, isError, message } = useSelector(
    (state) => state.workout
  )

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    
    dispatch(getWorkouts())
    // console.log('here are the workouts:', workouts)

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
}

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Workout Dashboard</p>
      </section>

      <WorkoutForm />

      <section className='content'>
        {workouts.length > 0 ? (
          <div className='workouts'>
            {workouts.map((workout) => (
              <WorkoutItem key={workout._id} workout={workout}/>
            ))}
          </div>
        ) : (<h3>You have not added any workouts</h3>)}
      </section>
    </>
  )
}
export default Dashboard