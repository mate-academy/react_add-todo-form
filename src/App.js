import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import todos from './api/todos';
import users from './api/users';

import './App.css';

const preparedTodos = todos.map((todo) => {
  const user = users.find(person => todo.userId === person.id);

  return {
    ...todo,
    user,
  };
});

function App() {
  const [listOfTodos, setListOfTodos] = useState(preparedTodos);

  function addTodo({ title, completed, userId, user }) {
    const todo = {
      title,
      completed,
      userId,
      user,
      id: listOfTodos.length + 1,
    };

    setListOfTodos(listOfTodos.concat(todo));
  }

  return (
    <div className="App">
      <Form users={users} onAdd={addTodo} />
      <TodoList todoList={listOfTodos} />
    </div>
  );
}

export default App;
