import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoNavigation } from './component/TodoNavigation';

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
  hidden: true,
}));

function App() {
  return (
    <>
      <div className="App">
        <h1>Add todo form</h1>

        <div className="navigation">
          <TodoNavigation users={users} todos={preparedTodos} />
        </div>
      </div>
    </>
  );
}

export default App;
