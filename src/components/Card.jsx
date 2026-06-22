import axios from 'axios'
import React from 'react'
import { BASE_URL } from './utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserfromFeed } from './redux/FeedSlice'


export default function Card({user}) {

const {firstName, lastName, about, photoUrl,age, gender, _id} = user

const dispatch = useDispatch()


async function handleRequest(status,toUserId) {
  
  try {
    
const response = await axios.post(
BASE_URL +'/request/send/'+ status + '/'+ toUserId , {}, {withCredentials : true})

dispatch(removeUserfromFeed(toUserId))

  } catch (err) {
    console.log("Error :" , err);
    
  }

}


return (

<>
<div className='h-124 w-88 p-5 shadow-xl border-2 rounded flex flex-col  gap-2' >
  <img src={photoUrl} alt="photo"   
  className='w-full h-[75%]  rounded-xl '/>

<div className='flex gap-3 flex-col items-center ' > 

   <h1 className=' font-bold text-2xl ' > {firstName}  {lastName} </h1>

   <p  className=' font-bold text-md ' > Age : {age} , {gender}  </p>

   <div className='flex gap-5 ' >
  <button 
  onClick={()=>handleRequest('ignored',_id )}
  className='bg-red-600 rounded px-5 py-1 font-semibold text-xl  cursor-pointer active:scale-95' >Ignore </button>
  <button 
    onClick={()=>handleRequest('interested',_id )}
  className='bg-green-600 rounded px-5 py-1 font-semibold  text-xl cursor-pointer active:scale-95' >Interest </button>
   </div>

</div>

</div>


</>


  )
}






/**http://localhost:3000/request/send/interested/6a3654cc7917fdd3994b4a9e */