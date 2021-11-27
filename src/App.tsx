import React from 'react';
import './App.css';

import { State } from './typedefs';

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

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!this.state.newTitle) {
              this.setState({ inputError: true });

              return;
            }

            if (this.state.newTitle.trim().length === 0) {
              this.setState({ inputError: true });

              return;
            }

            if (!this.state.user) {
              this.setState({ selectError: true });

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
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="add todo"
            value={this.state.newTitle}
            onChange={(ev) => {
              this.setState({
                newTitle: ev.target.value,
                inputError: false,
              });
            }}
          />
          {this.state.inputError && <span>Please enter the title</span>}

          <select
            name="person"
            value={this.state.user}
            onChange={(ev) => {
              this.setState({
                user: +ev.target.value,
                selectError: false,
              });
            }}
          >
            <option value={0}>
              Choose a user
            </option>
            {this.state.users.map(oneUser => (
              <option
                key={oneUser.id}
                value={oneUser.id}
              >
                {oneUser.name}
              </option>
            ))}
          </select>
          {this.state.selectError && <span>Please choose a user</span>}
          <button
            type="submit"
          >
            Add
          </button>
        </form>
        <ul>
          {this.state.todos.map(oneTodo => (
            <li key={oneTodo.id + Math.random()}>
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
