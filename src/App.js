import React from 'react';
import { TodoList } from './TodoList/TodoList';
import './App.css';
import todos from './api/todos';
import users from './api/users';

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoList
        todos={todos}
        users={users}
      />
    </div>
  );
}

export default App;
