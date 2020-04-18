import React, { Component } from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { getTodosWithUsers } from './getTodos';
import { Header } from './components/Header/Header';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';

export class App extends Component {
    state = {
      todosFromServer: [...todos],
      usersFromServer: [...users],
    };

  handleSubmit = (ava) => {
    this.setState(prevState => ({
      todosFromServer: [...prevState.todosFromServer, ava],
    }));
  }

  render() {
    const preparedTodos = getTodosWithUsers(
      this.state.todosFromServer, this.state.usersFromServer
    );

    return (
      <div className="App">
        <Header
          className="Header"
          todoArr={this.state.todosFromServer}
        />
        <TodoForm
          users={this.state.usersFromServer}
          todos={this.state.todosFromServer}
          addNewTodo={this.handleSubmit}
        />
        <TodoList preparedTodos={preparedTodos} />
      </div>
    );
  }
}
