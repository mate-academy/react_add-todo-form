import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import tasks from './api/todos';
import TaskCreator from './components/TaskCreator/TaskCreator';
import TodoList from './components/TodoList/TodoList';

export default class App extends Component {
  state = {
    todos: [...tasks],
  }

  addTask = (todo) => {
    const taskToAdd = {
      ...todo,
      id: this.state.todos.length + 1,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, taskToAdd],
    }));
  }

  render() {
    const { todos } = this.state;
    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    return (
      <div className="App">
        <TaskCreator
          users={users}
          onAddTask={this.addTask}
        />
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}
