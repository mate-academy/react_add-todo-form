import React, { useState } from 'react';
import './App.css';
import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';

function App() {
  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = (title, author) => {
    const selectedUser = users.find(user => user.name === author);

    const newTodo = {
      userId: selectedUser.id,
      id: todos.length + 1,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <Form users={users} sendNewTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
