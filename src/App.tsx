import React from 'react';
import './App.scss';

import { Todo } from './types/Todo';
import { User } from './types/User';

import users from './api/users';

import { getUser } from './helpers/getUser';
import { todos } from './helpers/getTodos';

import { TodoList } from './components/TodoList';

type State = {
  currentTodo: Todo,
  todos: Todo[],
  re: RegExp,
  inputStatusMonitoring: boolean,
};

export class App extends React.Component<{}, State> {
  state = {
    currentTodo: {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: '',
      userId: 0,
      completed: false,
    },
    todos: [...todos],
    re: /^[A-Za-zА-Яа-я0-9 ]*$/i,
    inputStatusMonitoring: false,
  };

  handleChange = (event:
  React.FormEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => { // 2 types for events of input change ang select tag change
    const { name, value } = event.target as HTMLInputElement;

    if (value.match(this.state.re)) {
      this.setState((prevState => ({ // used prevState to avoid type script error (2345)
        ...prevState,
        currentTodo: {
          ...prevState.currentTodo,
          [name]: value,
        },
      })));
    }
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.currentTodo.userId && this.state.currentTodo.title.trim()) {
      const newTodo = {
        ...this.state.currentTodo,
        user: getUser(this.state.currentTodo.userId),
      };

      this.setState(prevState => ({
        ...prevState,
        todos: [
          ...prevState.todos,
          newTodo,
        ],
      }));

      this.iterateEventId();

      this.handleResetForm();
    } else {
      this.state.inputStatusMonitoring = true;

      this.forceUpdate();
    }
  };

  iterateEventId = () => {
    this.setState(prevState => ({
      ...prevState,
      currentTodo: {
        ...prevState.currentTodo,
        id: prevState.currentTodo.id + 1,
      },
    }));
  };

  handleResetForm = () => {
    this.setState(prevState => ({
      ...prevState,
      currentTodo: {
        ...prevState.currentTodo,
        title: '',
        userId: 0,
      },
    }));

    this.state.inputStatusMonitoring = false;
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label>
              Title:&nbsp;
              <input
                name="title"
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={this.state.currentTodo.title}
                onChange={this.handleChange}
              />
            </label>
            {!this.state.currentTodo.title.trim()
              && this.state.inputStatusMonitoring
              && (
                <span className="error">Please enter a title</span>
              )}
          </div>

          <div className="field">
            <label>
              User:&nbsp;
              <select
                data-cy="userSelect"
                name="userId"
                defaultValue="0"
                value={this.state.currentTodo.userId}
                onChange={this.handleChange}
              >
                <option value="0" disabled>Choose a user</option>
                {users.map(({ id, name }: User) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </label>
            {!this.state.currentTodo.userId
              && this.state.inputStatusMonitoring
              && (
                <span className="error">Please choose a user</span>
              )}
          </div>

          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
