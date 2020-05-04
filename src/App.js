import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoList users={users} todos={todos} />
    </div>
  );
}

export default App;
