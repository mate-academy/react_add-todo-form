import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './typedefs';

const preparedTodos: PreparedTodo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => (
  <>
    <div className="App">
      <h1>Static list of todos</h1>
      <TodoList todos={preparedTodos} />
    </div>

    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  </>
);

export default App;
