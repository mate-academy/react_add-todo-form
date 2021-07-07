import React from 'react';
import './App.css';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <h1 className="App__header">Add todo form</h1>

        <TodoList todos={todosFromServer} />
      </div>
    );
  }
}

export default App;
