import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoApp from './components/TodoApp/TodoApp';

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>

      <TodoApp users={users} todos={todos} />

    </div>
  );
}

export default App;
