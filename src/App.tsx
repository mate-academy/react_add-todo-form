import React from 'react';
import classnames from 'classnames';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
// import { User } from './types/User';

type State = {
  todosList: Todo[];
  newTitle: string,
  newUserId: number,
  hasTitleError: boolean,
  hasUserError: boolean,
};

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId)
    || null,
  }
));

const preparedUsers = [...users];

export class App extends React.Component<{}, State> {
  state: State = {
    todosList: preparedTodos,
    newTitle: '',
    newUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.newTitle || !prevState.newUserId) {
        return {
          ...prevState,
          hasTitleError: !prevState.newTitle,
          hasUserError: !prevState.newUserId,
        };
      }

      const maxId = Math.max(...prevState.todosList.map(user => user.id));

      const newUser: Todo = {
        id: maxId + 1,
        title: prevState.newTitle,
        userId: prevState.newUserId,
      };

      return {
        hasTitleError: false,
        newTitle: '',

        hasUserError: false,
        newUserId: 0,

        todosList: [
          newUser,
          ...prevState.todosList,
        ],
      };
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.currentTarget.value,
      hasTitleError: false,
    });
  };

  handleIdUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUserId: +event.currentTarget.value,
      hasUserError: false,
    });
  };

  render() {
    const {
      todosList,
      newTitle,
      newUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <h3>
          {newTitle}
          -
          {newUserId}
        </h3>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              className={classnames({
                'field-error': hasTitleError,
              })}
              type="text"
              value={newTitle}
              onChange={this.handleTitleChange}
              placeholder="Enter a title"
            />
            {hasTitleError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </div>

          <select
            value={newUserId}
            onChange={this.handleIdUserChange}
            className={classnames({
              'field-error': hasUserError,
            })}
          >
            <option value="0"> Choose a user</option>
            {preparedUsers.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">
              Please select a user
            </span>
          )}

          <button type="submit">Add user</button>
        </form>
        <TodoList preparedTodos={todosList} />
      </div>
    );
  }
}
