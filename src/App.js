import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { List } from './components';

export class App extends React.Component {
  state = {
    newTodo: '',
    chosedUser: '',
    userTodos: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
  }

  handleTodo = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  submit = (event) => {
    const { chosedUser, newTodo } = this.state;

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
        id: prev.userTodos.length + 1,
        title: newTodo,
        completed: false,
        user: {
          name: chosedUser,
        },
      }],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="addTodo"
          onSubmit={this.submit}
        >
          <div className="input__wrapper">
            <div className="input__container">
              <select
                name="chosedUser"
                className="form-select"
                onChange={this.handleTodo}
              >
                <option>Choose a user</option>
                {users.map(user => (
                  <option key={user.id}>{user.name}</option>
                ))}
              </select>
              {this.state.hasTodoError && (
                <span className="error">Please enter the title</span>
              )}
            </div>
            <div className="input__container">
              <input
                type="text"
                name="newTodo"
                className="form-control form-control-lg"
                placeholder="Please enter the title"
                value={this.state.newTodo}
                onChange={this.handleTodo}
              />
              {this.state.hasNameError && (
                <span className="nameError">Please chose a user</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </form>
        <div className="list__container">
          <List list={this.state.userTodos} />
        </div>
      </div>
    );
  }
}
