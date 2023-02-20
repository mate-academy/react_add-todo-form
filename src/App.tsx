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
    inputStatusMonitoring: false,
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const re = /^[A-Za-zА-Яа-я0-9 ]*$/i;

    if (value.match(re)) {
      this.setState((prevState => ({
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
      this.setState(prevState => {
        const newTodo = {
          ...this.state.currentTodo,
          user: getUser(this.state.currentTodo.userId),
        };

        return {
          ...prevState,
          currentTodo: {
            ...prevState.currentTodo,
            id: prevState.currentTodo.id + 1,
          },
          todos: [
            ...prevState.todos,
            newTodo,
          ],
        };
      });

      this.handleResetForm();
    } else {
      this.setState({
        inputStatusMonitoring: true,
      });
    }
  };

  handleResetForm() {
    this.setState(prevState => ({
      ...prevState,
      currentTodo: {
        ...prevState.currentTodo,
        title: '',
        userId: 0,
      },
    }));

    this.setState({
      inputStatusMonitoring: false,
    });
  }

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
