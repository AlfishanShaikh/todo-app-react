import React, { useState, useEffect } from 'react'; // 1. IMPORT useEffect
import './Todo.css'

const Todo = () => {
    // 2. Initialize state by trying to load from local storage first.
    // This function runs only once when the component is first created.
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos'); // Try to get todos from local storage
        // If savedTodos exists, parse it back into an array, otherwise return an empty array
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [inputValue, setInputValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');


    // 3. This useEffect hook runs whenever the 'todos' state changes.
    useEffect(() => {
        // Save the current 'todos' array to local storage as a string
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]); // The [todos] dependency array means this effect runs when 'todos' changes

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            }
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    }

    const deleteTodo = (id) => {
        const updateTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodos)
    }

    const enterEditMode = (id, text) => {
        setEditMode(true);
        setEditId(id);
        setEditValue(text);
    }

    const updateTodo = () => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === editId) {
                return { ...todo, text: editValue };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditMode(false);
        setEditId(null);
        setEditValue('');
    }

    return (
        <div className='todo-container'>
            <h2>ToDo List</h2>
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            {
                editMode ? (
                    <div>
                        <input type='text'
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)} />
                        <button onClick={updateTodo}>Update</button>
                    </div>
                ) : (
                    <button onClick={addTodo}>Add</button>
                )
            }
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <div>
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => enterEditMode(todo.id, todo.text)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo;





