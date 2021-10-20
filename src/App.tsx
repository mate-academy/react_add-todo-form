import React from 'react';
import classnames from 'classnames';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Todo';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId)?.name || null,
}));

type State = {
  todos: Todo[],
  newTitle: string,
  newName: string,
  hasNameError: boolean,
  hasTitleError: boolean,
};

class App extends React.PureComponent<{}, State> {
  state: State = {
    todos: preparedTodos,
    newTitle: '',
    newName: '',
    hasNameError: false,
    hasTitleError: false,
  };

  handleForSubmit = (event: React.FormEvent) => {
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
        hasNameError: false,
        newName: '',
        hasTitleError: false,
        newTitle: '',
        todos: [
          newTodo,
          ...prevState.todos,
        ],
      };
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
    });
  };

  handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newName: event.target.value,
    });
  };

  render() {
    const {
      todos,
      newTitle,
      newName,
      hasNameError,
      hasTitleError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title">Add todo form</h1>

        <form className="form" onSubmit={this.handleForSubmit}>
          <div>
            <input
              className={classnames({
                'form__field-error': hasTitleError,
              })}
              type="text"
              placeholder="Add a task"
              value={newTitle}
              onChange={this.handleTitleChange}
            />
            {hasTitleError && (
              <div className="form__error">
                Please enter the title
              </div>
            )}
          </div>

          <div>
            <select
              className={classnames({
                'form__field-error': hasNameError,
              })}
              value={newName}
              onChange={this.handleNameChange}
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {hasNameError && (
              <div className="form__error">
                Please choose a user
              </div>
            )}
          </div>

          <button className="form__button" type="submit">
            Add
          </button>
        </form>

        <ul className="todo-list">
          {todos.map(todo => (
            <li className="todo-item" key={todo.id}>
              <div>
                {`Name: ${todo.user}`}
              </div>
              <div>
                {`Task: ${todo.title}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
