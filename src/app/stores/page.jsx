'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import account from './account';

const rootReducer = combineReducers({
  account: account,
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};