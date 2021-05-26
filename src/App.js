import React from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm';

import users from './api/users';
import todos from './api/todos';

function App() {
  return (
    <div className="App">
      <TodoForm
        users={users}
        todos={todos}
      />
    </div>
  );
}

export default App;
