import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from './utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addMatch } from './redux/MatchSlice'
import { Link } from 'react-router-dom'
import { addRequest, removeRequest } from './redux/RequestSlice'

export default function Request() {

const dispatch = useDispatch()
const request = useSelector(store=>store.request)

async function fetchRequest() {
    
try {
const response = await axios.get(BASE_URL + '/user/requests/received',
  {withCredentials:true})

const data = response.data?.data
dispatch(addRequest(data))
console.log(data)
} catch (err) {
  console.log("error: ", err)
  
}


}


async function reviewRequest(status, _id) {
  
try {
const response =await axios.post(BASE_URL + '/request/review/'+ status + '/' + _id ,{},{withCredentials : true} )
  dispatch(removeRequest(_id))
} catch (err) {
  console.log("Error :", err.message)
  
}


}




useEffect(()=>{
  fetchRequest()
},[])




if(request.length === 0) return(
    <div  className='flex h-24 w-full flex-col justify-center items-center ' >    
<h1> You have no Request </h1>
<Link to='/feed'    className='bg-green-500 rounded-md mt-2 text-black self-center px-6 py-2 active:scale-95 ' >  <button> Make some </button>        </Link>             
    </div>

)

    return (
    
<>
<div className='w-full border-2 ' >
    <h1 className='text-center' > My Requests are here</h1>
<div className='flex justify-center' >


<div className=' flex  flex-col mt-10 gap-5 p-2  ' >

{
  request.map((request)=>{

    const {firstName,lastName,age,gender,about} = request.fromUserId

    return(
      <div key={request._id} className='border-2 p-2 h-54 w-100'>

        <h1 className='font-bold capitalize'>
          {firstName} {lastName}
        </h1>

        <h1>Age : {age}</h1>

        <h1>Gender : {gender}</h1>

        <h1>About : {about}</h1>


        <div className='flex gap-5'>

          <button
            onClick={()=>reviewRequest('accepted', request._id)}
            className='bg-green-500 rounded-md px-6 py-2'
          >
            Accept
          </button>


          <button
            onClick={()=>reviewRequest('rejected', request._id)}
            className='bg-red-500 rounded-md px-6 py-2'
          >
            Reject
          </button>

        </div>


      </div>
    )

})
}
</div>
</div>
</div>

</>

  )}




  