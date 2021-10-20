/* eslint-disable import/no-duplicates */

import React from 'react';
import classNames from 'classnames';

import './App.css';

import ToDoList from './components/ToDoList/ToDoList';

import ToDoItem from './types/ToDoItem';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type State = {
  todos: ToDoItem[],
  newTitle: string,
  selectedUser: number,
  hasTitleError: boolean,
  hasUserError: boolean,
};

const readyTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(findingUser => findingUser.id === todo.userId),
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: readyTodos,
    newTitle: '',
    selectedUser: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    this.setState((state) => {
      if (!state.newTitle || !state.selectedUser) {
        return {
          ...state,
          hasTitleError: !state.newTitle,
          hasUserError: !state.selectedUser,
        };
      }

      const newTodo = {
        userId: this.state.selectedUser,
        id: Math.max(...this.state.todos.map(todo => todo.id)) + 1,
        title: this.state.newTitle,
        completed: false,
        user: usersFromServer.find(user => user.id === this.state.selectedUser),
      };

      return {
        newTitle: '',
        selectedUser: 0,
        todos: [...state.todos, newTodo],
        hasTitleError: false,
        hasUserError: false,
      };
    });
  };

  inputHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  };

  selectHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: +event.target.value,
      hasUserError: false,
    });
  };

  render() {
    const {
      todos,
      newTitle,
      selectedUser,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <form
          className="App__form"
          name="form"
          onSubmit={this.submitHandler}
        >
          <input
            type="text"
            placeholder="Add title here"
            name="title"
            value={newTitle}
            onChange={this.inputHandler}
            className={classNames({ App__error_field: hasTitleError, App__input: true })}
          />
          {hasTitleError && (
            <span className="App__error">
              Please enter a title
            </span>
          )}
          <select
            name="ToDoList"
            value={selectedUser}
            onChange={this.selectHandler}
            className={classNames({ App__error_field: hasUserError, App__select: true })}
          >
            <option value="0">
              Select a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && (
            <span className="App__error">
              Please select a user
            </span>
          )}
          <button type="submit" name="addBtn" className="App__button">Add</button>
        </form>
        <ToDoList todos={todos} />
      </div>
    );
  }
}

export default App;
