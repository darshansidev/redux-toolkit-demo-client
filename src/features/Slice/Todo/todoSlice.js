import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Define the initial state
const initialState = {
    loading: false,
    error: null,
    todo: null,
};

// Define the base URL for the backend API
const baseURL = 'http://localhost:3000/todo';


// Define Thunk for Todo API request
export const addTodo = createAsyncThunk('/add-todo-list', async (todoData) => {
    try {
        const response = await axios.post(`${baseURL}/add-todo-list`, todoData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const fetchTodoList = createAsyncThunk('/get-todo-list', async () => {
    try {
        const response = await axios.get(`${baseURL}/get-todo-list`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const fetchAllTodoList = createAsyncThunk('/get-All-todo-list', async () => {
    try {
        const response = await axios.get(`${baseURL}/get-All-todo-list`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateTodoList = createAsyncThunk('/get-todo-list', async () => {
    try {
        const response = await axios.get(`${baseURL}/get-todo-list`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const deleteTodoList = createAsyncThunk(`/delete-todo-list/:todoId`, async (todoId) => {
    try {
        const response = await axios.delete(`${baseURL}/delete-todo-list/${todoId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Create a slice for Todo
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = action.payload;
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTodoList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodoList.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = action.payload;
            })
            .addCase(fetchTodoList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllTodoList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTodoList.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = action.payload;
            })
            .addCase(fetchAllTodoList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTodoList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodoList.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = action.payload;
            })
            .addCase(deleteTodoList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    },
});

// Export the reducer
export default todoSlice.reducer;

