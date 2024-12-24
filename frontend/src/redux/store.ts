import { configureStore } from "@reduxjs/toolkit";
import animationReducer from "./slices/animationSlice";
import { apiSlice } from "./slices/api";

export const store = configureStore({
    reducer: {
        animation: animationReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: import.meta.env.MODE !== "production", // Enable DevTools in non-production environments
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;