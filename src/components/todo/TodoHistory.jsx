import { Button, Table, TableCell, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTodoList } from '../../features/Slice/Todo/todoSlice';
import { toast } from 'react-toastify';

const TodoHistory = () => {
    const todoItems = useSelector(state => state.todo.todo?.data);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchAllTodoList());
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
    }, [dispatch]);

    return (
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


                </TableRow>

                {(todoItems && todoItems.length > 0) ?
                    todoItems.map((todo, index) => {
                        return (
                            <TableRow key={todo._id} >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{todo.title}</TableCell>
                                <TableCell>{todo.description}</TableCell>

                            </TableRow>
                        )
                    })

                    : <p>No Data Found</p>}
            </Table>
        </div>
    )
}

export default TodoHistory