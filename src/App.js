import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

const App = () => (
  <div className="app">
    <h1>Static list of todos</h1>
    <TodoList />
  </div>
);

export default App;
