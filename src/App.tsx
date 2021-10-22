/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type State = {
  todos: Todo[],

  hasTitleError: boolean,
  title: string,

  hasUserError: boolean,
  newUserId: number,
};

class App extends React.PureComponent {
  state: State = {
    todos: preparedTodos,

    hasTitleError: false,
    title: '',

    hasUserError: false,
    newUserId: 0,
  };

  handleIdChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setState({
      newUserId: +event.target.value,
      hasUserError: false,
    });
  };

  handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      title: event.target.value,
      hasTitleError: false,
    });
  };

  handleFormSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((prevState: State) => {
      if (!prevState.title || !prevState.newUserId) {
        return {
          ...prevState,
          hasTitleError: !prevState.title,
          hasUserError: !prevState.newUserId,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id));

      const newTodo: Todo = {
        id: maxId + 1,
        title: prevState.title,
        user: getUserById(prevState.newUserId),
        completed: false,
      };

      return {
        title: '',
        newUserId: 0,
        newTodoId: 0,
        hasTitleError: false,
        hasUserId: false,

        todos: [
          ...prevState.todos,
          newTodo,
        ],
      };
    });
  };

  render() {
    const {
      todos,
      title,
      newUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleFormSumbit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                className="title"
                placeholder="Enter a title"
                maxLength={20}
                value={title}
                onChange={this.handleTitleChange}
              />
            </label>
            {hasTitleError && (
              <span className="error">
                Please, enter a title
              </span>
            )}
          </div>

          <div>
            <label>
              User:
              <select
                className="user"
                value={newUserId}
                onChange={this.handleIdChange}
              >
                <option key={0} value={0}>
                  Choose a name...
                </option>
                {usersFromServer.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>

            {hasUserError && (
              <span className="error">
                Please, choose a user
              </span>
            )}
          </div>

          <button
            type="submit"
          >
            Submit
          </button>
        </form>
        <TodoList todoList={todos} />
      </div>
    );
  }
}

export default App;
