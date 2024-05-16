import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTodoById, updateTodoList } from '../../features/Slice/Todo/todoSlice';

const TodoUpdate = () => {
    const { todoId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get singleTodo data from Redux store
    // const todoData = useSelector(state => state.todo.singleTodo);

    // Initialize formData with todoData or default empty values
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    // Fetch single todo data and update formData
    useEffect(() => {
        if (todoId) {
            dispatch(fetchTodoById(todoId)).then((action) => {
                const fetchedTodo = action.payload;
                setFormData({
                    title: fetchedTodo?.title || '',
                    description: fetchedTodo?.description || '',
                });
            });
        }
    }, [dispatch, todoId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const todoPayload = {
            todoId: todoId,
            title: formData.title,
            description: formData.description
        };

        dispatch(updateTodoList(todoPayload));
        navigate('/');
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: "70px", border: "1px solid black", padding: "30px", borderRadius: "20px" }}>
            <Typography variant="h3" component="h4" sx={{ display: "flex", justifyContent: "center" }}>
                Update Todo Data
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    name='description'
                    margin="normal"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <Stack mt={4}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        fullWidth
                    >
                        Update Todo
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default TodoUpdate;
