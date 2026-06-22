import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import store from './components/redux/AppStore'
import Feed from './components/Feed'
import Matches from './components/Matches'
import Request from './components/Request'

export default function App() {


return (

<Provider store={store} >     
<BrowserRouter basename='/'  >
<Routes>
<Route path='/' element={<Body/>} >

<Route path='login' element={<Login/>} /> 
<Route path='profile'  element={<Profile/>} />
<Route path='feed' element={<Feed/>}   /> 
<Route path='matches' element={<Matches/>}  />
<Route  path='request' element={<Request/>}  />
</Route>


</Routes>

</BrowserRouter>

</Provider>  

  


  )


}



