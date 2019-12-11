import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodosTable from './components/TodosTable';
import TodoForm from './components/TodoForm';

function getUsersNames(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

export default class App extends Component {
  minId = todos.length;

  state = { todosList: getUsersNames(todos, users) };

  addItem = (title, userId) => (
    // eslint-disable-next-line no-return-assign
    this.setState(state => ({
      todosList: [
        ...state.todosList,
        {
          completed: false,
          id: this.minId = this.minId + 1,
          title,
          userId,
          user: users.find(user => user.id === userId),
        },
      ],
    }))
  );

  render() {
    const { todosList, titleError, userError } = this.state;

    return (
      <>
        <TodoForm
          onItemAdded={this.addItem}
          users={users}
        />
        <TodosTable
          todoList={todosList}
          titleError={titleError}
          userError={userError}
        />
      </>
    );
  }
}
