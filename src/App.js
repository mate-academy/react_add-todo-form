import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todos from './api/todos';

import { List } from './components/List';
import { Form } from './components/Form';

const userById = userId => (
  usersFromServer.find(user => user.id === userId)
);

const todoList = todos.map(todo => ({
  ...todo,
  user: userById(todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: todoList,
  }

  addTodo = (newTitle, selectedUserId) => {
    this.setState(prev => ({
      todos: [...prev.todos, {
        id: todos.length + 1,
        title: newTitle,
        userId: selectedUserId,
        user: userById(selectedUserId),
      }],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form addTodo={this.addTodo} />
        <div className="list__container">
          <List todoList={this.state.todos} />
        </div>
      </div>
    );
  }
}
