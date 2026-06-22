import axios from 'axios'
import React, { useEffect } from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'


export default function Profile() {

  const user = useSelector((store) => store.user)

return user && (

<EditProfile   user={user}  />

  )
}





