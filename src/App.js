import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodosTable from './components/TodosTable';
import TodoForm from './components/TodoForm';

// eslint-disable-next-line no-shadow
function getUsersNames(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
}

export default class App extends Component {
  minId = todos.length;

  state = {
    todos: getUsersNames(todos, users),
    userError: '',
    titleError: '',
  };

  addItem = (title, userId) => {
    if (title.length === 0) {
      this.setState({
        titleError: 'Title error',
        userError: '',
      });
    } else if (userId.length === 0) {
      this.setState({
        userError: 'User error',
        titleError: '',
      });
    } else {
      const newItem = {
        completed: false,
        id: this.minId = this.minId + 1,
        title,
        userId,
        user: users.find(user => user.id === userId),
      };

      this.setState({
        titleError: '',
        userError: '',
      });
      // eslint-disable-next-line no-shadow
      this.setState(({ todos }) => {
        const newArr = [
          ...todos,
          newItem,
        ];

        return ({ todos: newArr });
      });
    }
  };

  render() {
    // eslint-disable-next-line no-shadow
    const { todos, titleError, userError } = this.state;

    return (
      <>
        <TodoForm
          onItemAdded={this.addItem}
          users={users}
        />
        <TodosTable
          todoList={todos}
          titleError={titleError}
          userError={userError}
        />
      </>
    );
  }
}
