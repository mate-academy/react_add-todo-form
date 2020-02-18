import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

class App extends React.Component {
  state = {
    todosList: todos,
  }

  handlerNewTask = (newTodo) => {
    this.state.todosList.push(newTodo);
    this.setState({});
  }

  render() {
    return (
      <div className="App">
        <div className="App__table">
          <h1>Table of tasks</h1>
          <TodoList todos={this.state.todosList} users={users} />
        </div>
        <div className="App__form">
          <NewTodo
            users={users}
            todos={this.state.todosList}
            handler={this.handlerNewTask}
          />
        </div>
      </div>
    );
  }
}

export default App;
