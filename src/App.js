import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import NewTodo from './NewTodo';
import List from './List';

class App extends React.PureComponent {
  render() {
    const userList = [...users];
    const todoList = [...todos];

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <div className="wrapper">
          <div className="form">
            <NewTodo user={userList} todo={todoList} />
          </div>
          <div className="list">
            {todoList.map(el => <List todo={el} user={userList} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
