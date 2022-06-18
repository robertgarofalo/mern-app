import { useState, useEffect } from 'react'

import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // propname is wrapped in brackets means it is dynamic
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
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