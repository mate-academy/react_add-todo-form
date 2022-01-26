import React from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import classNames from 'classnames';
import { TodoList } from './TodoList';

import users from './api/users';
import todosFromServer from './api/todos';

type State = {
  title: string,
  user: string,
  todos: Todo[],
  hasTitleError: boolean,
  hasUserError: boolean,
  checkSymbols: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    user: '',
    todos: todosFromServer,
    hasTitleError: false,
    hasUserError: false,
    checkSymbols: false,
  };

  handelTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      hasTitleError: false,
      checkSymbols: false,
    });
  };

  handelUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      user: value,
      hasUserError: false,
    });
  };

  getNewTodo = () => {
    const { todos, title, user } = this.state;

    return {
      id: todos.length + 1,
      title,
      userId: +user,
    };
  };

  addTodo = () => {
    this.setState(state => ({
      todos: [...state.todos, this.getNewTodo()],
    }));
  };

  clearState = () => {
    this.setState({
      title: '',
      user: '',
    });
  };

  validateInputs = () => {
    const { title, user } = this.state;

    if (!title || !user || !this.validateTextInput(title)) {
      this.setState({
        hasTitleError: !title,
        hasUserError: !user,
        checkSymbols: !this.validateTextInput(title),
      });

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidInputs = this.validateInputs();

    if (isValidInputs) {
      this.addTodo();
      this.clearState();
    }
  };

  validateTextInput = (text: string) => {
    return !text.match(/[^a-z0-9а-я ]/i);
  };

  render() {
    const {
      hasTitleError, hasUserError, checkSymbols, title, user, todos,
    } = this.state;

    return (
      <div className="
        App
        is-flex
        is-flex-direction-column
        is-align-items-center
        has-text-black"
      >
        <h1 className="title">Add todo form</h1>
        <form
          onSubmit={this.handleSubmit}
          className="is-flex"
        >
          <section>
            <label
              htmlFor="text"
              className="is-flex is-align-items-center"
            >
              <span className="subtitle m-0 mr-3">Todo:</span>
              <input
                type="text"
                name="title"
                id="text"
                placeholder="Add todo text"
                className={classNames(
                  'input is-success is-inline mr-4', { 'is-danger': hasTitleError || checkSymbols },
                )}
                value={title}
                onChange={this.handelTitleChange}
              />
            </label>
            {hasTitleError && (
              <span className="has-text-danger">
                Please choose a user
              </span>
            )}
            {checkSymbols && (
              <span className="has-text-danger">
                Text should contain only English
                <br />
                or Russian letters, digits or spaces
              </span>
            )}

          </section>

          <section>
            <label
              htmlFor="person"
              className="
                is-flex
                is-align-items-center"
            >
              <span className="subtitle m-0 mr-3">User:</span>
              <div
                className={classNames('select is-success', { 'is-danger': hasUserError })}
              >
                <select
                  id="person"
                  name="person"
                  value={user}
                  onChange={this.handelUserChange}

                >
                  <option value="">
                    Choose a user
                  </option>
                  {users.map(selectedUser => (
                    <option
                      key={selectedUser.id}
                      value={selectedUser.id}
                    >
                      {selectedUser.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            {hasUserError && (
              <span className="has-text-danger">
                {' Please enter the title'}
              </span>
            )}
          </section>

          <button type="submit" className="button ml-4">Add</button>
        </form>

        <p className="m-4">
          <TodoList todos={todos} />
          <span className="m-2">Total </span>
          {todos.length}
          <span className="m-2">Tasks </span>
        </p>
      </div>
    );
  }
}

export default App;
