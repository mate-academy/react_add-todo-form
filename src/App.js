import React, { useState } from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

function App() {
  const [startList, addTodo] = useState(preparedTodos);

  return (
    <div className="App">
      <h1>Add todo</h1>
      <Form startList={startList} addTodo={addTodo} />
      <TodoList list={startList} />
    </div>
  );
}

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

export default App;
