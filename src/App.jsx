import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import TodoList from './components/todo/TodoList';
import HeadNavBar from './components/HeadNavBar';
import TodoHistory from './components/todo/TodoHistory';
import TodoUpdate from './components/todo/TodoUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeadNavBar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todo-history" element={<TodoHistory />} />
          <Route path="/update-todo/:todoId" element={<TodoUpdate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
