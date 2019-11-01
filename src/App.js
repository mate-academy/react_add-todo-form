import React from 'react';
import './App.css';

import NewTodo from './components/NewTodo';

function App() {
  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <NewTodo />
    </div>
  );
}

export default App;
