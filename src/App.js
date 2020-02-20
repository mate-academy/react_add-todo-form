import React from 'react';
import TodoList from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

function App() {
  return (
    <div className="App">
      <TodoList users={users} todos={todos} />
    </div>
  );
}

export default App;
