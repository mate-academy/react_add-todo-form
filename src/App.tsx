/* eslint-disable react/no-unused-state */
import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

const getUserById = (id: number) => users.find(user => user.id === id);

const preparedTodos: PreparedTodo[] = todos.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type State = {
  newTitle: string,
  selectedUserId: number,
  currentTodos: PreparedTodo[],
  hasTitleError: boolean,
  hasUserError: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    newTitle: '',
    selectedUserId: 0,
    currentTodos: [...preparedTodos],
    hasTitleError: false,
    hasUserError: false,

  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasUserError: false,
    });
  };

  getNewTodo = () => {
    const { newTitle, selectedUserId } = this.state;

    const newTodo: PreparedTodo = {
      title: newTitle,
      userId: selectedUserId,
      id: todos.length + 1,
      completed: false,
      user: getUserById(selectedUserId) || null,
    };

    return newTodo;
  };

  clearState = () => {
    this.setState({
      newTitle: '',
      selectedUserId: 0,
      hasUserError: false,
      hasTitleError: false,
    });
  };

  validateForm = () => {
    const { newTitle, selectedUserId } = this.state;

    if (!newTitle || !selectedUserId) {
      this.setState({
        hasTitleError: !newTitle,
        hasUserError: !selectedUserId,
      });

      return false;
    }

    return true;
  };

  addTodo = () => {
    this.setState(state => ({
      currentTodos: [...state.currentTodos, this.getNewTodo()],
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      this.addTodo();
      this.clearState();
    }
  };

  render() {
    const {
      newTitle,
      selectedUserId,
      currentTodos,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          onSubmit={this.handleSubmit}
          className="todo-title"
        >
          <section className="todo-text">
            <div className="todo-text__mean">Todo:</div>
            <input
              type="text"
              name="title"
              placeholder="Add todo text"
              value={newTitle}
              onChange={this.handleTitleChange}
              className="todo-text__value"
            />
            {hasTitleError && (
              <div>Please enter a title</div>
            )}
          </section>

          <section className="todo-user-selector">
            <div className="todo-user-selector__mean">User:</div>
            <select
              value={selectedUserId}
              name="user"
              onChange={this.handleUserChange}
              className="todo-user-selector__select"
            >
              <option
                value="0"
                className="todo-user-selector__select--def"
              >
                Please choose a user
              </option>
              {users.map((selectUser) => (
                <option
                  key={selectUser.id}
                  value={selectUser.id}
                >
                  {selectUser.name}
                </option>
              ))}
            </select>
            {hasUserError && (
              <div>Please choose an user</div>
            )}
          </section>

          <button type="submit" className="submit-button">Add</button>
        </form>

        <TodoList todos={currentTodos} />
      </div>
    );
  }
}

export default App;
