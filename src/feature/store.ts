import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/user-slice'
import artsReducer from './arts/arts-slice'

const rootReducer = combineReducers({
  user: userReducer,
  arts: artsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 