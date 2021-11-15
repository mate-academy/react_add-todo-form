import React from 'react';
import classNames from 'classnames';

import { TodoList } from './components/Todolist';
import { Todo } from './types/Todo';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

interface State {
  todos: Todo[],
  title: string,
  selectedUser: string,
  inputTitleError: boolean,
  selectUserError: boolean,
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: todosFromServer,
    title: '',
    selectedUser: '',
    inputTitleError: false,
    selectUserError: false,
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.selectedUser || !prevState.title) {
        return {
          ...prevState,
          inputTitleError: !prevState.title,
          selectUserError: !prevState.selectedUser,
        };
      }

      const maxId = Math.max(
        ...prevState.todos.map(todo => todo.id),
      );

      const index = users.findIndex(
        user => prevState.selectedUser === user.name,
      );

      const newTodo = {
        id: maxId + 1,
        title: prevState.title,
        userId: users[index].id,
      };

      return {
        title: '',
        selectedUser: '',
        todos: [
          ...prevState.todos,
          newTodo,
        ],
      };
    });
  };

  titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      inputTitleError: false,
    });
  };

  userChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value,
      selectUserError: false,
    });
  };

  render() {
    const {
      todos,
      selectedUser,
      title,
      selectUserError,
      inputTitleError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Create new task</h1>
        <form className="form" onSubmit={this.submitHandler}>
          <div className="form__input-container">
            <label className="form__label" htmlFor="todoTitle">
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={this.titleChangeHandler}
                id="todoTitle"
                className={classNames(
                  'form__input', {
                    'form__input--theme-error': inputTitleError,
                  },
                )}
              />
              {inputTitleError && (
                <span className="form__input-message">
                  Please enter the title
                </span>
              )}
            </label>
          </div>

          <div className="form__select-container">
            <select
              value={selectedUser}
              onChange={this.userChangeHandler}
              className={classNames(
                'form__select', {
                  'form__select--theme-error': selectUserError,
                },
              )}
            >
              <option className="form__select-option" value="">Choose user</option>
              {users.map(user => (
                <option className="form__select-option" key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {selectUserError && (
              <span className="select__error-message">
                Please choose a user
              </span>
            )}
          </div>
          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}
