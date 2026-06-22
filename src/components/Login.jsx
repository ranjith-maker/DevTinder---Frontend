import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './redux/userSlice'
import {useNavigate} from 'react-router-dom'
import { BASE_URL } from './utils/constant'



export default function Login() {

const temp = {
firstName  :'Mary',
lastName : 'Jane',    
email : '',
password : ''

}

const [ formData, setformData ] = useState(temp)

const [error , setError] = useState('')

const [isloggin , setIsLoggin] = useState(true)

const navigate = useNavigate()

function handleLogin(ev) {
   const {name, value} = ev.target 
   setformData(prev =>{
    return {
        ...prev, [name] : value
     }
})}

const dispatch = useDispatch()

async function submitHandler(ev) {

    ev.preventDefault() 

try {
    
const url = isloggin ? BASE_URL + '/login' :
                       BASE_URL + '/signup'

const response = await axios.post( url , formData , {withCredentials : true })
    
    dispatch(addUser(response.data?.data))
    return navigate( isloggin ? '/feed' : '/profile' )

} catch (err) {
    console.error(err.message)
    setError(err.response?.data?.message)
    
}}



return (
    <>

    <div className=' flex w-full flex-col justify-center items-center
    `min-h-[100vh]` mt-10 p-2' >
       
        <form   onSubmit={submitHandler}
        
        className='flex flex-col gap-3 bg-white   h-[70%] w-[25%]
         text-xl text-black rounded py-2 px-5 justify-center '
        >
            <h1 className='text-center font-bold' >
            {isloggin ? 'Login Form'  : 'Sign Form'} 
            </h1>


         {!isloggin && ( 
            <>    
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder='firstName'
            name='firstName' id='firstName'
            value={formData.firstName}
            onChange={handleLogin}

            className=' outline px-5 py-2  rounded text-center'
            
            /> 
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder='lastName'
            name='lastName' id='lastName'
            value={formData.lastName}
            onChange={handleLogin}

            className=' outline px-5 py-2  rounded text-center'
            />
               </>
            )}

            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Email'
            name='email' id='email'
            value={formData.email}
            onChange={handleLogin}

            className=' outline px-5 py-2  rounded text-center'
            
            />
            <label htmlFor="password">Password</label>
            <input type="text" placeholder='Password'
            name='password' id='password' 
            value={formData.password}
            onChange={handleLogin}
            
            className='outline px-5 py-2 rounded text-center'
            />

            <p className="text-red-500 text-center font-semibold      ">{error}</p>

            
            <span onClick={()=>setIsLoggin((value)=>(!value)) } 
            
            className=' cursor-pointer' >
              {isloggin ? 'New User ? Sign up here':'Existing User, Login here'  }   </span> 
            
            <button type='submit'
            className='bg-taupe-600 text-white rounded-md self-center px-6 py-2  '
            > 
            {isloggin ? 'Login' : 'Signup'}
             </button>

        </form>

    </div>


    </>
  )
}



