import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addFeed } from './redux/FeedSlice'
import axios from 'axios'
import {BASE_URL} from './utils/constant'
import Card from './Card'

export default function Feed() {

const dispatch = useDispatch()

const feed = useSelector(store=>store.feed)



async function getFeed() {
  
try {

if(feed.length > 0) return

const response = await axios.get( BASE_URL + '/feed' , {withCredentials : true}  )
const data = response?.data?.data

dispatch(addFeed(data))

} catch (err) {

console.error("error" , err.message)

}}


useEffect(()=>{

  getFeed()

},[])


if(feed.length === 0 ){
 return <h1> No more users to connect </h1>
}

return (

feed.length > 0 && (<div className='flex flex-col w-full items-center p-5  mt-4' >
  <Card  user={feed[0]}  key={feed[0]._id}  /> 
</div>) 

  )
}








