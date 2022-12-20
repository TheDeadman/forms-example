import { configureStore } from '@reduxjs/toolkit';
import exampleFormOneReducer from '../forms/ExampleFormOne/ExampleFormOne.slice'

export const store = configureStore({
  reducer: {
    exampleFormOne: exampleFormOneReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;