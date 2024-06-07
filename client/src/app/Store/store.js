import { configureStore } from '@reduxjs/toolkit'
import datareducer from '../FeatureSlices/data/index'
import themereducer from '../FeatureSlices/Themes/index'
import usertoken from '../FeatureSlices/users/index'
import msgreducer from '../FeatureSlices/MsgApi/index'
import intruptorreducer from '../FeatureSlices/interuptor/suiche'


export const store = configureStore({
    reducer: {
        data: datareducer,
        msg: msgreducer,
        tema: themereducer,
        token: usertoken,
        interuptor: intruptorreducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
    serializableCheck: false,
      })
})

