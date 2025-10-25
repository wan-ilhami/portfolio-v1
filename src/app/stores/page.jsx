import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';

// Example reducer - create your actual reducers and add them here
const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: 'light',
    loading: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Create the root reducer with your reducers
const rootReducer = combineReducers({
  app: appSlice.reducer,
  // Add more reducers here as needed:
  // auth: authReducer,
  // posts: postsReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Export actions
export const { setTheme, setLoading } = appSlice.actions;