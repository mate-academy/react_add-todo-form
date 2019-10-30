import React from 'react';
import './App.css';
import TodoList from './components/todolist/TodoList';

import users from './api/users';
import todos from './api/todos';

function App() {
  for (let i = 0; i < todos.length; i++) {
    let currentUser = users.find(user => user.id === todos[i].userId);
    todos[i].name = currentUser.name
  }

  return (
    <div className="wrapper">
      <TodoList todos={todos} users={users}/>
    </div>
  );
}

export default App;
