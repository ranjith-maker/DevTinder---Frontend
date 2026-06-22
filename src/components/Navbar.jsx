import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from './utils/constant'
import { useNavigate } from 'react-router-dom'
import { removeUser } from './redux/userSlice'


export default function Navbar() {

const user = useSelector(store=>store.user )

const navigate = useNavigate()
const dispatch = useDispatch()
async function handleLogout() {
  
try {
  await axios.post(BASE_URL + '/logout' , {} , {withCredentials : true}  )
  dispatch(removeUser())
 return navigate('/login')
} catch (err) {
  console.log('Error', err)
  
}

}






return (
<>


<div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1  ">
    <Link to={user ? "/feed" : "/login"}
     className="btn btn-ghost text-xl"> DevTinder </Link>
  </div>
      { user &&  <h1 className='capitalize font-bold'  > Welcome {user?.firstName} to DevTinder</h1> }
  <div className="flex gap-2">

    <div className="dropdown dropdown-end mx-32 ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      {user &&  <div className="w-10 rounded-full   ">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoUrl} />
        </div>}
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box z-1 mt-3 w-52 p-2 shadow ">
        <li>
          <Link to='/profile'  className="justify-between  text-lg ">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>

        <li > 
           <Link to='/matches' className="text-lg"  > Matches </Link> 
        </li>
        <li>
          <Link to='/request' className="text-lg"  > Request </Link> 
        
        </li>

        <li  onClick={handleLogout}  className='cursor-pointer text-lg' >Logout</li>
      </ul>
    </div>
  </div>
</div>


</>  

)
}
