import React, { Component } from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { AddTodo } from './components/AddTodo/AddTodo';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends Component {
  state = {
    peparedTodos: preparedTodos,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      peparedTodos: [...prevState.peparedTodos, todo],
    }));
  }

  render() {
    const { peparedTodos } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Todo form</h1>
        <TodoList todos={peparedTodos} />
        <AddTodo
          users={users}
          addTodo={this.addTodo}
        />
      </div>
    );
  }
}
