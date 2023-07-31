import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/authSlice";
import api from "./features/api/apiSlice";
const store = configureStore({
  reducer: {
    auth: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
