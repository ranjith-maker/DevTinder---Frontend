
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from './utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addMatch } from './redux/MatchSlice'
import { Link } from 'react-router-dom'





export default function Matches() {

const dispatch = useDispatch()
const match = useSelector(store => store.match)

async function fecthMacthes() {
    
    try {
        const response = await axios.get(BASE_URL + '/user/matches', 
            {withCredentials : true} )
        const data = response.data?.data
        console.log(data);
        dispatch(addMatch(data))
        

    } catch (err) {
        console.log('Error: ', err);
        
        
    }
}


useEffect(()=>{
  fecthMacthes()
},[])



if(match.length === 0) return(
    <div  className='flex h-24 w-full flex-col justify-center items-center ' >    
<h1> You have no Matches </h1>
<Link to='/feed'    className='bg-green-500 rounded-md mt-2 text-black self-center px-6 py-2 active:scale-95 ' >  <button> Make some </button>        </Link>             
    </div>

)

    return (
    
<>
<div className='w-full border-2 ' >
    <h1 className='text-center' > My Matches here</h1>
<div className='flex justify-center' >


<div className=' flex  flex-col mt-10 gap-5 p-2  ' >
{
match.map((user)=>{

    const {firstName,lastName, age, gender, about} = user


return(
<div key={user._id}  className='border-2 p-2  '  > 
        <h1  className='font-bold' > {firstName} {lastName}  </h1>
        <h1> Age : {age}   </h1>
        <h1> Gender : {gender}  </h1>
        <h1> About {about} </h1>
         
  </div>

)

})

}

</div>

</div>

</div>

</>

  )
}







/**
 *     <div key={user.id} > 
        <h1  className='font-bold' > {user.firstName} {user.lastName}  </h1>
        <h1> Age : {user.age}   </h1>
        <h1> Gender : {user.gender}  </h1>
        <h1> About :{user.about} </h1>
         
  </div>
 * 
 * 
 */