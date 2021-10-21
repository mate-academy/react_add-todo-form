import React from 'react';

import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User, Todo } from './types';

interface State {
  todos: Todo[],
  newTodoTitle: string,
  newTodoUserId: number,
  hasTitleError: boolean,
  hasUserError: boolean,
}

function getUserById(userId: number): User | null {
  return users.find(user => user.id === userId)
    || null;
}

const todosWithUser = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: todosWithUser,
    newTodoTitle: '',
    newTodoUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(state => {
      if (!state.newTodoTitle || !state.newTodoUserId) {
        return {
          ...state,
          hasTitleError: !state.newTodoTitle,
          hasUserError: !state.newTodoUserId,
        };
      }

      const maxId = Math.max(...state.todos.map(todo => todo.id));
      const todo: Todo = {
        userId: state.newTodoUserId,
        id: maxId + 1,
        title: state.newTodoTitle,
        completed: false,
        user: getUserById(state.newTodoUserId),
      };

      return {
        hasTitleError: false,
        newTodoTitle: '',

        hasUserError: false,
        newTodoUserId: 0,

        todos: [
          todo,
          ...state.todos,
        ],
      };
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTodoUserId: +event.target.value,
      hasUserError: false,
    });
  };

  render() {
    const {
      newTodoUserId,
      newTodoTitle,
      hasUserError,
      hasTitleError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="todo-form" onSubmit={this.handleFormSubmit}>
          <label htmlFor="todo-title">
            Type a title -&gt;
            {' '}
            <input
              type="text"
              placeholder="Type here..."
              id="todo-title"
              value={newTodoTitle}
              onChange={this.handleTitleChange}
            />
          </label>
          {hasTitleError && (
            <div className="error">
              Please enter the title
            </div>
          )}
          <label htmlFor="todo-select">
            <select
              id="todo-select"
              value={newTodoUserId}
              onChange={this.handleUserChange}
            >
              <option
                value="0"
                defaultValue={0}
                disabled
              >
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id} key={user.id}>{ user.name }</option>
              ))}
            </select>
          </label>
          {hasUserError && (
            <div className="error">
              Please select a user
            </div>
          )}
          <button type="submit" className="btn btn-form">Add todo</button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
