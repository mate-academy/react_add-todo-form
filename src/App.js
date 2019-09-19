import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <TodoList />
    </div>
  );
}

export default App;
