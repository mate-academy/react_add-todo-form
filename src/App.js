import React from 'react';
import './App.css';
import TodoList from './TodoList';
import todos from './api/todos';
// import users from './api/users';

function App() {
  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <TodoList currentTodos={todos} />
    </div>
  );
}

export default App;
