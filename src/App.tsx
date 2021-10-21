import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

interface State {
  preparedTodos: Todo[],
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
    preparedTodos: todosWithUser,
    newTodoTitle: '',
    newTodoUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.newTodoTitle || !prevState.newTodoUserId) {
        return {
          ...prevState,
          hasTitleError: !prevState.newTodoTitle,
          hasUserError: !prevState.newTodoUserId,
        };
      }

      const maxId = Math.max(...prevState.preparedTodos.map(todo => todo.id));
      const newTodo: Todo = {
        userId: prevState.newTodoUserId,
        id: maxId + 1,
        title: prevState.newTodoTitle,
        completed: false,
        user: getUserById(prevState.newTodoUserId),
      };

      return {
        hasTitleError: false,
        newTodoTitle: '',

        hasUserError: false,
        newTodoUserId: 0,

        preparedTodos: [
          newTodo,
          ...prevState.preparedTodos,
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
      preparedTodos,
      newTodoTitle,
      newTodoUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">My Todo</h1>
        <div className="todo-form">
          <form
            onSubmit={this.handleFormSubmit}
          >
            <div>
              <input
                type="text"
                className="todo-form__field"
                value={newTodoTitle}
                onChange={this.handleTitleChange}
                placeholder="Todo title"
              />
              {hasTitleError && (
                <div className="error">
                  Please enter the title
                </div>
              )}
            </div>
            <div>
              <select
                className="todo-form__field"
                value={newTodoUserId}
                onChange={this.handleUserChange}
              >
                <option
                  value="0"
                  disabled
                >
                  Choose a user
                </option>
                {users.map(user => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {hasUserError && (
                <div className="error">
                  Please choose a user
                </div>
              )}
            </div>
            <button
              type="submit"
              className="todo-form__button"
            >
              Add
            </button>
          </form>
        </div>
        <TodoList preparedTodos={preparedTodos} />
      </div>
    );
  }
}

export default App;
