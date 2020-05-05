import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import NewTodo from './NewTodo';

const preparedTodos = todos.map(item => ({
  ...item, user: users.find(user => user.id === item.userId),
}));

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <NewTodo item={preparedTodos} />
    </div>
  );
}

export default App;
