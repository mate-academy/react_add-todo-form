import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import tasks from './api/todos';
import TaskCreator from './components/TaskCreator/TaskCreator';
import TodoList from './components/TodoList/TodoList';

const uuidv1 = require('uuid/v1');

const preparedTodos = tasks.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export default class App extends Component {
  state = {
    todos: [...preparedTodos],
  }

  addTask = (todo) => {
    const taskToAdd = {
      ...todo,
      id: uuidv1(),
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, taskToAdd],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <TaskCreator
          users={users}
          onAddTask={this.addTask}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}
