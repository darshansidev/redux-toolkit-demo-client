import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo, deleteTodoList, fetchTodoList } from '../../features/Slice/Todo/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Stack, Typography } from '@mui/material';
import { Table, TableRow, TableCell } from "@mui/material"

const TodoList = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const navigate = useNavigate();

    const todoItems = useSelector(state => state.todo.todo?.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchTodoList());
                if (todoItems?.length > 0) {
                    toast.success("Todo list loaded successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });

                }
            } catch (error) {
                toast.error(`Error fetching todo list: ${error}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }
        };

        fetchData(); // Call the async function to fetch data
    }, [dispatch]); // Run effect only when dispatch changes

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const { title, description } = formData;
        const todoData = { title, description };

        try {
            await dispatch(addTodo(todoData));
            await dispatch(fetchTodoList());
            setFormData({
                title: '',
                description: '',
            })
            // Show success message
            toast.success('Todo added successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });

        } catch (error) {
            console.log(error, "<error from tiit>")
            toast.error(`Error adding todo: ${error}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    };

    const handledelete = async (todoId) => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            await dispatch(deleteTodoList(todoId));
            await dispatch(fetchTodoList());
        }
    }

    const handleUpdate = async (todoId) => {

        // dispatch(fetchTodoById(todoId));
        // navigate(`/todo/item/${todoId}`);
    }


    return (
        <>
            <Container maxWidth="md" sx={{ marginTop: "70px", border: "1px solid black", padding: "30px", borderRadius: "20px" }}>
                <Typography variant="h3" component="h4" sx={{ display: "flex", justifyContent: "center" }}>
                    Todo-Form
                </Typography>
                <form onSubmit={handleSubmit} >
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name='title'
                        value={formData.title}  // Bind the value from state
                        onChange={handleChange} // Pass handleChange as the event handler
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        name='description'
                        margin="normal"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Stack mt={4}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="submit"
                            margin="normal"
                            fullWidth
                        >
                            Add New Todo
                        </Button>
                    </Stack>
                </form >
            </Container>

            <div style={{ margin: "50px 150px 0 150px" }}>
                <Table className="createtable" >
                    <TableRow >
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                No.
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" component="h6">
                                Action
                            </Typography>
                        </TableCell>

                    </TableRow>

                    {(todoItems && todoItems.length > 0) ?
                        todoItems.map((todo, index) => {
                            return (
                                <TableRow key={todo._id} >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{todo.title}</TableCell>
                                    <TableCell>{todo.description}</TableCell>
                                    <TableCell >
                                        <Button variant="outlined" color="secondary" style={{ marginRight: "20px" }}>Update</Button>
                                        <Button variant="outlined" color="error" onClick={() => handledelete(index._id)}> Delete </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })

                        : <p>No Data Found</p>}
                </Table>
            </div>


            <ToastContainer />
        </>
    )
}

export default TodoList