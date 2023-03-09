import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findUser(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

const todoList: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: findUser(todo.userId),
  }
));

type State = {
  todos: Todo[],
  title: string,
  showTitleError: boolean,
  showUserError: boolean,
  userId: number,
};

export class App extends React.Component<{}, State> {
  state = {
    todos: todoList,
    title: '',
    showTitleError: false,
    showUserError: false,
    userId: 0,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      showTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.target.value),
      showUserError: false,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.userId && this.state.title.trim()) {
      const newTodo = {
        id: Math.max(...this.state.todos.map(todo => todo.id)) + 1,
        title: this.state.title,
        completed: false,
        userId: this.state.userId,
        user: findUser(this.state.userId),
      };

      this.setState(state => ({
        todos: [
          ...state.todos,
          newTodo,
        ],
        title: '',
        userId: 0,
        showTitleError: false,
        showUserError: false,
      }));
    }

    if (!this.state.userId) {
      this.setState({ showUserError: true });
    }

    if (!this.state.title.trim()) {
      this.setState({ showTitleError: true });
    }
  };

  render() {
    const {
      todos,
      title,
      showTitleError,
      showUserError,
      userId,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Title"
              value={title}
              onChange={this.handleTitleChange}
            />
            {showTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="user">User: </label>
            <select
              id="user"
              data-cy="userSelect"
              value={userId}
              onChange={this.handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {showUserError && (
              <span className="error">Please choose a user</span>
            )}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}
