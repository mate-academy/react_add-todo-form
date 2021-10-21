import React from 'react';
import classNames from 'classnames';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return users.find(user => user.id === userId)
    || null;
}

const preparedTodos: TodoWithUser[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

interface State {
  todosNew: TodoWithUser[];
  newTitle: string;
  newUserId: number;

  hasNameError: boolean;
  hasFieldError: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    todosNew: preparedTodos,
    newTitle: '',
    newUserId: 0,
    hasNameError: false,
    hasFieldError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // create new Todo
    this.setState(prevState => {
      if (!prevState.newTitle || !prevState.newUserId) {
        return {
          ...prevState,
          hasNameError: !prevState.newTitle,
          hasFieldError: !prevState.newUserId,
        };
      }

      const maxId = Math.max(...prevState.todosNew.map(todo => todo.id));

      const newTodo: TodoWithUser = {
        id: maxId + 1,
        title: prevState.newTitle,
        userId: prevState.newUserId,
        user: getUserById(prevState.newUserId),
      };

      return {
        hasNameError: false,
        newTitle: '',

        hasFieldError: false,
        newUserId: 0,

        todosNew: [
          newTodo,
          ...prevState.todosNew,
        ],
      };
    });
  };

  handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      newTitle: event.target.value,
      hasNameError: false,
    });
  };

  handleUserChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState({
      newUserId: +event.target.value,
      hasFieldError: false,
    });
  };

  render() {
    const {
      todosNew,
      newTitle,
      newUserId,
      hasNameError,
      hasFieldError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__todo">Add todo form</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              className={classNames('field', {
                'field--error': hasNameError,
              })}
              type="text"
              value={newTitle}
              onChange={this.handleTitleChange}
            />
            {hasNameError && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </div>

          <div>
            <select
              className={classNames('choose', {
                'field--error': hasFieldError,
              })}
              value={newUserId}
              onChange={this.handleUserChange}
            >
              <option value="0">Choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {hasFieldError && (
              <span className="error">
                Please select an user
              </span>
            )}
          </div>

          <button type="submit" className="App__button">Add</button>
        </form>

        <p className="App__user">Users: </p>
        <p>
          <TodoList todos={todosNew} />
        </p>
      </div>
    );
  }
}

export default App;
