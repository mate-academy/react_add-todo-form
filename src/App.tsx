import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoWithUser } from './types/typesdef';
import { TodoList } from './componets/TodoList/TodoList';

const preparedTodos: TodoWithUser[] = todos.map((todo) => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

interface State {
  todoList: TodoWithUser[],
  title: string,
  selectedUser: string,
  isTitleEntered: boolean,
  isSelectedUser: boolean,
}

export class App extends React.Component<{}, State> {
  state = {
    todoList: preparedTodos,
    title: '',
    selectedUser: '',
    isTitleEntered: true,
    isSelectedUser: true,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      todoList,
      title,
      selectedUser,
    } = this.state;

    if (!title || !selectedUser) {
      return this.showMessageError();
    }

    const chosenUser = users.find(user => user.name === selectedUser);

    const newTodo: TodoWithUser = {
      userId: chosenUser?.id,
      id: todoList.length + 1,
      title: this.state.title,
      user: chosenUser || null,
    };

    return this.setState(state => ({
      todoList: [...state.todoList, newTodo],
      title: '',
      selectedUser: '',
    }));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
      isTitleEntered: true,
    }));
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
      isSelectedUser: true,
    }));
  };

  showMessageError = () => {
    this.setState(state => ({
      isTitleEntered: state.title !== '',
      isSelectedUser: state.selectedUser !== '',
    }));
  };

  render() {
    const {
      todoList,
      title,
      selectedUser,
      isTitleEntered,
      isSelectedUser,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          method="GET"
          className="form"
          onSubmit={this.handleSubmit}
        >
          <div className="mb-4">
            <label
              className="form__todo-title"
              htmlFor="todo-title"
            >
              Todo title
              <br />

              <input
                className="mt-2 form-control"
                type="text"
                placeholder="Enter todo title"
                id="todo-title"
                name="title"
                value={title}
                onChange={this.handleInputChange}
              />

              {!isTitleEntered && (
                <div className="error-msg">
                  *Please enter the title
                </div>
              )}
            </label>
          </div>

          <div className="mb-4">
            <select
              className="form-select"
              name="selectedUser"
              id=""
              value={selectedUser}
              onChange={this.handleSelectChange}
            >
              <option value="">
                Choose an user
              </option>

              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {!isSelectedUser && (
              <div className="error-msg">
                *Please choose an user
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-outline-success btn-lg"
          >
            Add task
          </button>
        </form>

        <TodoList todos={todoList} />
      </div>
    );
  }
}
