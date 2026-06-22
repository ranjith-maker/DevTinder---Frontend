import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate,  } from 'react-router'
import Footer from '../Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './redux/userSlice'
import axios from 'axios'
import { BASE_URL } from './utils/constant'
import { useLocation } from 'react-router'

export default function Body() {

const dispath = useDispatch()
const navigate = useNavigate()
const userData = useSelector(store => store.user)


async function PersistUser() {
  
  try {
    const response = await axios.get(BASE_URL + '/profile/view', {withCredentials : true} )
    
    dispath(addUser(response.data?.data))
    

  } catch (err) {
    if(err?.response?.status === 401){
      navigate('/login')
    }
    console.log("Error: ", err)
    
  }
}
 

useEffect(()=>{
 
if(!userData){
   PersistUser()
}

},[])


  return (

<>
<div className='min-h-screen flex flex-col  '  >      
<Navbar/>
<main className='  min-h-[150vh] '  > 
<Outlet/>
</main>
<Footer/>
 </div>

</>)
}


/*
With this whenever my app loads first thing is Auth checking is happening whether the user loggedin or not ?, how ?, only when there is a token inside cookie I can view these page else I can't, and How there will be token, token is only created once the user enters his email and password 
//  is this the right way to answer interview to hiring manager

Yes, your understanding is essentially correct, and this is a good interview topic because it demonstrates how authentication persists across page refreshes.

A polished explanation would be:

> When a user logs in with email and password, the backend validates the credentials and generates a JWT token. The token is stored in an HTTP-only cookie.
>
> Redux stores the user data in memory, but Redux state is lost when the browser refreshes.
>
> To maintain authentication after a refresh, the application performs an auth check when it loads. In my app, the `Body` component runs a `useEffect` that calls `/profile/view`.
>
> The browser automatically sends the authentication cookie with the request because `withCredentials: true` is enabled.
>
> The backend reads the token from the cookie and verifies it.
>
> * If the token is valid, the backend returns the user data, and I repopulate Redux using `dispatch(addUser(...))`.
> * If the token is missing or invalid, the backend returns `401 Unauthorized`, and the user is redirected to the login page.
>
> This allows users to stay logged in across page refreshes without storing sensitive authentication state in Redux.

The important detail is this:

> "How will there be a token if the user didn't enter email and password?"

Because the user may have entered them **earlier**.

Example:

1. User logs in at 10:00 AM.
2. Backend creates JWT and stores it in a cookie with a lifetime of, say, 7 days.
3. User refreshes the page at 10:05 AM.
4. Redux is cleared.
5. Cookie still exists in the browser.
6. Browser sends the cookie automatically to `/profile/view`.
7. Backend verifies the token and returns the user.

The user does **not** need to enter credentials again because the cookie persists between page loads.

If the user has never logged in before, or if the cookie has expired:

1. App loads.
2. `/profile/view` is called.
3. No valid token is found.
4. Backend returns 401.
5. User is redirected to `/login`.

That's exactly how most production applications implement session persistence with JWT + HTTP-only cookies.

*/



