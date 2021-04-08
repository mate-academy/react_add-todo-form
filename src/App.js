import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Form } from './components/Form';

const todoList = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

export class App extends React.PureComponent {
  state = {
    list: todoList,
  }

  addNewUser = (userName, newTitle) => {
    this.setState(prev => ({
      list: [
        ...prev.list,
        {
          id: +new Date(),
          title: newTitle,
          completed: false,
          user: {
            name: userName,
          },
        },
      ],
    }));
  }

  render() {
    const { list } = this.state;

    return (
      <>
        <Form
          list={list}
          addNewUser={this.addNewUser}
        />
      </>
    );
  }
}
