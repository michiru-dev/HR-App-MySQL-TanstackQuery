import { configureStore } from '@reduxjs/toolkit'
import employeeDataSlicer from './slicers/employeeDataSlice'

const store = configureStore({
  reducer: {
    employee: employeeDataSlicer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppGetState = typeof store.getState
export type AppDispatch = typeof store.dispatch
