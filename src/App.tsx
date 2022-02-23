import React from 'react';
import './App.css';

import { State } from './types';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component<{}, State> {
  state = {
    users: [...users],
    todos: [...todos],
    newTitle: '',
    user: 0,
    inputError: false,
    selectError: false,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.newTitle.trim().length === 0) {
      this.setState({ inputError: true, selectError: false });

      return;
    }

    if (!this.state.user) {
      this.setState({ selectError: true, inputError: false });

      return;
    }

    this.setState(state => {
      const newTodo = {
        userId: users.find(onesUser => onesUser.id === this.state.user)?.id,
        id: Date.now(),
        title: this.state.newTitle,
        completed: false,
      };

      return {
        newTitle: '',
        user: 0,
        todos: [
          ...state.todos,
          newTodo,
        ],
      };
    });
  };

  render() {
    const {
      newTitle,
      user,
      selectError,
      inputError,
    } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={this.handleSubmit}
        >
          <div className="form">
            <div className="inputs">
              <input
                type="text"
                className="input"
                name="title"
                placeholder="enter todo"
                value={newTitle}
                onChange={(el) => {
                  this.setState({
                    newTitle: el.target.value,
                    inputError: false,
                  });
                }}
              />
              <select
                name="person"
                className="input"
                value={user}
                onChange={(el) => {
                  this.setState({
                    user: +el.target.value,
                    selectError: false,
                  });
                }}
              >
                <option value={0}>
                  Choose a user
                </option>
                {users.map(oneUser => (
                  <option
                    key={oneUser.id}
                    value={oneUser.id}
                  >
                    {oneUser.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="button"
              >
                Add
              </button>
            </div>
            {inputError && <span className="error">Enter a title</span>}
            {selectError && <span className="error">Choose a user</span>}
          </div>
        </form>
        <ul className="todos">
          {this.state.todos.map(oneTodo => (
            <li className="todo" key={oneTodo.id}>
              <h3>{oneTodo.title}</h3>
              <p>{this.state.users.find(newUser => newUser.id === oneTodo.userId)?.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
