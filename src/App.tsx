import React from 'react';
import classnames from 'classnames';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

interface Todo {
  userId?: number | string;
  id: number;
  title: string;
  user: string | null;
}

interface State {
  todos: Todo[];
  newTitle: string;
  newName: string;
  hasNameError: boolean,
  hasTitleError: boolean,
}

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId)?.name || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    newTitle: '',
    newName: '',
    hasNameError: false,
    hasTitleError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.newName || !prevState.newTitle) {
        return {
          ...prevState,
          hasNameError: !prevState.newName,
          hasTitleError: !prevState.newTitle,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id));

      const newTodo: Todo = {
        id: maxId + 1,
        title: prevState.newTitle,
        user: prevState.newName,
      };

      return {
        hasTitleError: false,
        hasNameError: false,
        newName: '',
        newTitle: '',
        todos: [
          ...prevState.todos,
          newTodo,
        ],
      };
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newName: event.target.value,
      hasNameError: false,
    });
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>
          Add Todo
        </h1>
        <form onSubmit={this.handleFormSubmit}>

          <div>
            <input
              className={classnames({
                'field-error': this.state.hasTitleError,
              })}
              type="text"
              placeholder="Add a task"
              value={this.state.newTitle}
              onChange={this.handleTitleChange}
            />
            {this.state.hasTitleError && (
              <span className="error">
                Please enter a task
              </span>
            )}
          </div>
          <div>
            <select
              value={this.state.newName}
              onChange={this.handleNameChange}
              className={classnames({
                'field-error': this.state.hasNameError,
              })}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {this.state.hasNameError && (
              <span className="error">
                Please choose a name
              </span>
            )}
          </div>

          <button type="submit">
            Add
          </button>
        </form>

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.user}
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
