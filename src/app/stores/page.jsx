'use client';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import account from './account';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  // account: account,
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};