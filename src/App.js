import React from 'react';
import './App.css';
import todos from './api/todos';
import { Form } from './components/Form/Form';

function App() {
  const todoList = [...todos];

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form todos={todoList} />
    </div>
  );
}

export default App;
