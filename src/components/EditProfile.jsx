
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import { BASE_URL } from './utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/userSlice';




export default function EditProfile({user}) {


const initialState = {

    firstName : user.firstName,
    lastName : user.lastName ,
    age :  user.age ,
    gender : user.gender,
    about : user.about,
    skills : user.skills.join(', '), 
    photoUrl :user.photoUrl

}

const [formData , setformData] = useState(initialState)
const dispatch = useDispatch()




function handleEdit(ev) {
    const {value, name  } = ev.target

setformData(prev =>{
    return {
        ...prev, 
        [name] : name === 'age' ? Number(value) : value 
    }
} )
}


async function handleSave(ev) {

    ev.preventDefault()

  const payload = {
    ...formData,
    skills: Array.isArray(formData.skills)
      ? formData.skills
      : formData.skills
          .split(",")
          .map(skill => skill.trim())
          .filter(Boolean)
  };

try {
    const response = await axios.patch(BASE_URL + '/profile/edit', payload , 
        {withCredentials : true})

 const updatedUser = response.data.data;
dispatch(addUser(updatedUser))


setformData({
  firstName: updatedUser.firstName,
  lastName: updatedUser.lastName,
  age: updatedUser.age,
  gender: updatedUser.gender,
  about: updatedUser.about,
  skills: updatedUser.skills?.join(",") || "",
  photoUrl: updatedUser.photoUrl
});

} catch (err) {
    console.log("Error : ", err.message)   
}}


  return (

<>
<div className='border-2 py-5 flex justify-around  flex-wrap w-full h-full '  >
        
   <div>   
        <form  onSubmit={handleSave}
        
        className='flex flex-col gap-1 mt-10 bg-cyan-700 h-[90%] w-full
         text-xl text-black rounded py-15 px-25 justify-center border-2 '>
            <h1> Profile Edit</h1>
            
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder='firstName'
            name='firstName' id='firstName'
            value={formData.firstName}
            onChange={handleEdit}

            className=' outline px-5 py-2  rounded text-center'
            
            />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder='lastName'
            name='lastName' id='lastName' 
            value={formData.lastName}
            onChange={handleEdit}

            className='outline px-5 py-2 rounded text-center'
            />


            <label htmlFor="lastName"> Age </label>
            <input type="Number" placeholder='age'
            name='age' id='age' 
            value={formData.age}
            onChange={handleEdit}

            className='outline px-5 py-2 rounded text-center'
            />

            <label htmlFor="lastName"> Gender </label>
            <input type="text" placeholder='gender'
            name='gender' id='gender' 
            value={formData.gender}
            onChange={handleEdit}

            className='outline px-5 py-2 rounded text-center'
            />

            <label htmlFor="lastName">About</label>
            <input type="text" placeholder='about'
            name='about' id='about' 
            value={formData.about}
            onChange={handleEdit}

            className='outline px-5 py-2 rounded text-center'
            />

            <label htmlFor="skills">Skills</label>
            <input type="text" placeholder='skills'
            name='skills' id='skills' 
            value={formData.skills}
            onChange={handleEdit}

            className='outline px-5 py-2 rounded text-center'
            />

            <label htmlFor="photoUrl">photoUrl</label>
            <input type="text" placeholder='photoUrl'
            name='photoUrl' id='photoUrl' 
            value={formData.photoUrl}
            onChange={handleEdit}

            className='outline px-5 py-2 rounded text-center'
            />

            <button type='submit'
            className='bg-blue-300 rounded-md mt-2  self-center px-6 py-2  '
            > Save Profile </button>
        </form>
 </div>

<div className=' mt-20      '  >  

<Card user={formData}    />

</div>

</div>
          </>
  )
}












