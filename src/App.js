import React from 'react';
import './App.scss';
import { users } from './api/users';
import { todos } from './api/todos';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoList todos={todos} users={users} />
    </div>
  );
}

export default App;
