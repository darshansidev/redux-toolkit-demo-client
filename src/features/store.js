// store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "./Slice/Todo/todoSlice";

// Create the Redux store
const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

export default store;
