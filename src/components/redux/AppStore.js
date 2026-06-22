
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import feedReducer from './FeedSlice'
import matchReducer from './MatchSlice'
import requestReducer from './RequestSlice'

const store = configureStore({

    reducer  :{
        user : userReducer,
        feed : feedReducer,
        match : matchReducer,
        request : requestReducer,
        

    }
})




export default  store
