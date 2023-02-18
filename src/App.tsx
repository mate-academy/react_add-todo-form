import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { todos } from './helpers/getTodos';
import users from './api/users';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { getUser } from './helpers/getUser';

type State = Todo;

export class App extends React.Component<{}, State> {
  state = {
    id: Math.max(...todos.map(todo => todo.id)) + 1,
    title: '',
    userId: 0,
    completed: false,
  };

  inputStatusMonitoring = false; // this property used in order to comply with this requirement: "errors should appear only after clicking the `Add` button"

  handleChange = (event:
  React.FormEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => { // 2 types for events of input change ang select tag change
    const { name, value } = event.target as HTMLInputElement;

    if (value.match(/^[A-Za-zА-Яа-я0-9 ]*$/i)) {
      this.setState((prevState => ({ // used prevState to avoid type script error (2345)
        ...prevState,
        [name]: value,
      })));
    }
  };

  handleSubmit = () => {
    if (this.state.userId && this.state.title.length) {
      todos.push({
        ...this.state,
        user: getUser(this.state.userId),
      });
      this.iterateEventId();
      this.clearTheForm();
    } else {
      this.inputStatusMonitoring = true;
      this.forceUpdate();
    }
  };

  iterateEventId = () => {
    this.setState(state => ({
      id: state.id + 1,
    }));
  };

  clearTheForm = () => {
    this.setState({
      title: '',
      userId: 0,
    });
    this.inputStatusMonitoring = false;
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className="field">
            <label>
              Title:&nbsp;
              <input
                name="title"
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
            {!this.state.title && this.inputStatusMonitoring && (
              <span className="error">Please enter a title</span>
            )}
          </div>

          <div className="field">
            <label>
              User:&nbsp;
              <select
                data-cy="userSelect"
                name="userId"
                value={this.state.userId}
                onChange={this.handleChange}
              >
                <option value="">Choose a user</option>
                {users.map((user: User) => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
            </label>
            {!this.state.userId && this.inputStatusMonitoring && (
              <span className="error">Please choose a user</span>
            )}
          </div>

          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}
