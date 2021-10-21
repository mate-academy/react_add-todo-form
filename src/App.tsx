import React, { Component } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todosList from './api/todos';
import './App.css';

type State = {
  todos: Todo[];
  name: string;
  title: string;
  hasNameError: boolean;
  hasTitleError: boolean;
};

export class App extends Component<{}, State> {
  state: State = {
    todos: todosList,
    name: '',
    title: '',
    hasNameError: false,
    hasTitleError: false,
  };

  submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.name || !prevState.title) {
        return {
          ...prevState,
          hasNameError: !prevState.name,
          hasTitleError: !prevState.title,
        };
      }

      const maxId = Math.max(
        ...prevState.todos.map(todo => todo.id),
      );
      const currentIndex = users.findIndex(
        user => prevState.name === user.name,
      );

      const newTodoItem = {
        id: maxId + 1,
        title: prevState.title,
        userId: users[currentIndex].id,
      };

      return {
        name: '',
        title: '',
        todos: [
          newTodoItem,
          ...prevState.todos,
        ],
      };
    });
  };

  nameChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
      hasNameError: false,
    });
  };

  titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      hasTitleError: false,
    });
  };

  render() {
    const {
      todos,
      name,
      title,
      hasNameError,
      hasTitleError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add a new todo</h1>
        <form className="submitForm App__form" onSubmit={this.submitFormHandler}>
          <div className="select submitForm__select">
            <select
              value={name}
              onChange={this.nameChangeHandler}
              className={classNames(
                'select__main', {
                  'select__main--empty': hasNameError,
                },
              )}
            >
              <option>Choose name</option>
              {users.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {hasNameError && (
              <span className="select__errorMessage">
                Please choose a user
              </span>
            )}
          </div>
          <div className="input submitForm__input">
            <input
              type="text"
              placeholder="Enter todo title"
              value={title}
              onChange={this.titleChangeHandler}
              className={classNames(
                'input__main', {
                  'input__main--empty': hasTitleError,
                },
              )}
            />
            {hasTitleError && (
              <span className="input__errorMessage">
                Please enter todo title
              </span>
            )}
          </div>
          <button
            type="submit"
            className="button submitForm__button"
          >
            Add
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
