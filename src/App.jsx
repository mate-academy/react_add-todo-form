import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoForm } from './components/TodoForm';

function App() {
  return (
    <div className="App">
      <TodoForm todos={todos} users={users} />
    </div>
  );
}

export default App;
