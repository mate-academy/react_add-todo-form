import './App.scss';
import React, { Component } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type State = {
  title: string,
  name: string,
  id: number,
  emptyTitle: boolean,
  emptyName: boolean,
};

const visibleTodos = [...todosFromServer];

export class App extends Component <{}, State> {
  state = {
    title: '',
    name: 'Choose a user',
    id: visibleTodos.length - 1,
    emptyTitle: false,
    emptyName: false,
  };

  findIndex = () => {
    let id = 0;

    usersFromServer.forEach(user => {
      if (user.name === this.state.name) {
        id = user.id;
      }
    });

    return id;
  };

  addNewTodo = () => {
    if (this.state.title === '') {
      this.setState({ emptyTitle: true });
    }

    if (this.state.name === 'Choose a user') {
      this.setState({ emptyName: true });
    }

    if (this.state.title === '' || this.state.name === 'Choose a user') {
      return;
    }

    if (!this.state.emptyTitle && !this.state.emptyName) {
      this.setState(state => ({ id: state.id + 1 }));
      visibleTodos.push({
        id: this.state.id,
        title: this.state.title,
        completed: false,
        userId: this.findIndex(),
      });
    }
  };

  handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;

    this.setState({
      title: text.replace(/[^a-z + A-Z + а-я + А-Я +\d]/g, ''),
    });

    this.setState({ emptyTitle: false });
  };

  handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ name: event.currentTarget.value });
    this.setState({ emptyName: false });
  };

  render() {
    const {
      title, name, emptyName, emptyTitle,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={this.handleInput}
            />

            {emptyTitle
              && (
                <span className="error">
                  Please enter a title
                </span>
              )}
          </div>

          <div className="field">
            <select
              data-cy="userSelect"
              name="name"
              value={name}
              onChange={this.handleSelect}
            >
              <option
                value=""
                disabled={name !== 'Choose a user'}
              >
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option
                  key={user.name}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {emptyName
              && (
                <span className="error">
                  Please choose a user
                </span>
              )}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
            onClick={this.addNewTodo}
          >
            Add
          </button>
        </form>

        <TodoList todos={visibleTodos} />
      </div>
    );
  }
}
