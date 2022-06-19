import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {FaSignInAlt} from 'react-icons/fa'

import { toast } from 'react-toastify'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

// components
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth )

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // propname is wrapped in brackets means it is dynamic
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email, 
      password
    }

    dispatch(login(userData))
  }
  
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    // if(isSuccess || user) { <------ check the user part
    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])


  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt /> Login</h1> 
        <p>Please sign in</p> 
      </section>
      
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
             
             <input className="form-control" type="email" id="email" name="email" value={email} placeholder='Enter your email' onChange={onChange}/>    
             <input className="form-control" type="password" id="password" name="password" value={password} placeholder='Enter your password' onChange={onChange}/>
             
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Login