import { configureStore } from '@reduxjs/toolkit'
import datareducer from '../FeatureSlices/data/index'

export const store = configureStore({
    reducer: {
        data: datareducer,
    }
})

