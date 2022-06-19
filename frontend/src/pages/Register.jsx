import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

import { useNavigate } from 'react-router-dom'

import { FaUser } from 'react-icons/fa'

// components
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth )

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // propname is wrapped in brackets means it is dynamic
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name, email, password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1><FaUser />Register</h1> 
        <p>Please create an account</p> 
      </section>
      
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
             <input className="form-control" type="text" id="name" name="name" value={name} placeholder='Enter your name' onChange={onChange}/>
             
             <input className="form-control" type="email" id="email" name="email" value={email} placeholder='Enter your email' onChange={onChange}/>
             
             <input className="form-control" type="password" id="password" name="password" value={password} placeholder='Enter your password' onChange={onChange}/>
             
             <input className="form-control" type="password" id="password2" name="password2" value={password2} placeholder='Confirm your password' onChange={onChange}/>
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
export default Register