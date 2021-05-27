import React from 'react';
import './App.css';

import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  name: usersFromApi.find(({ id }) => (
    id === todo.userId)).name,
}));

export class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodos = (newTitle, newName) => {
    const newId = this.state.todos.length + 1;
    const newTodo = {
      id: newId,
      title: newTitle,
      name: newName,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>List of todos</h1>
        <Form users={usersFromApi} onAdd={this.addTodos} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
