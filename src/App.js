import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { List } from './components/List';
import { Form } from './components/Form';

const todoList = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    newTodo: '',
    chosedUser: '',
    userTodos: todoList,
  }

  handleTodo = (event) => {
    const { name, value } = event.target;

    if (name === 'chosedUser') {
      this.setState({
        hasNameError: false,
      });
    } else if (name === 'newTodo') {
      this.setState({
        hasTodoError: false,
      });
    }

    this.setState({
      [name]: value,
    });
  }

  addTodo = (event) => {
    const { chosedUser, newTodo } = this.state;
    const numbers = this.state.userTodos.map(todo => todo.id);

    event.preventDefault();

    if (!chosedUser || !newTodo) {
      this.setState({
        hasNameError: !chosedUser,
        hasTodoError: !newTodo,
      });

      return;
    }

    this.setState(prev => ({
      chosedUser: '',
      newTodo: '',
      userTodos: [...prev.userTodos, {
        userId: users.find(user => user.name === chosedUser).id,
        id: Math.max(...numbers) + 1,
        title: newTodo,
        completed: false,
        user: {
          name: chosedUser,
        },
      }],
    }));
  }

  render() {
    const {
      newTodo,
      userTodos,
      hasNameError,
      hasTodoError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          add={this.addTodo}
          handleTodo={this.handleTodo}
          newTodo={newTodo}
          users={users}
          hasNameError={hasNameError}
          hasTodoError={hasTodoError}
        />
        <div className="list__container">
          <List list={userTodos} />
        </div>
      </div>
    );
  }
}
