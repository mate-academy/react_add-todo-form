import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/todoList/TodoList';
import { User } from './Types/UserTypes';
import { Todo } from './Types/TodoTypes';

type State = {
  users: User[];
  todos: Todo[];
  inputError: boolean;
  selectError: boolean;
  newTask: string;
  newUserId: number;
};

class App extends React.Component<{}, State> {
  state: State = {
    users,
    todos,
    inputError: false,
    selectError: false,
    newTask: '',
    newUserId: 0,
  };

  handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      newTask: event.target.value,
      inputError: false,
    });
  };

  handleSelectId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUserId: +event.target.value,
      selectError: false,
    });
  };

  handleButtonAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.newTask || !prevState.newUserId) {
        return {
          ...prevState,
          inputError: !prevState.newTask,
          selectError: !prevState.newUserId,
        };
      }

      const newId = Math.max(...todos.map(({ id }) => id));
      const newTask: Todo = {
        userId: prevState.newUserId,
        id: newId + 1,
        title: prevState.newTask,
        completed: false,
      };

      return {
        newTask: '',
        newUserId: 0,
        inputError: false,
        selectError: false,
        todos: [
          ...prevState.todos,
          newTask,
        ],
      };
    });
  };

  render() {
    const {
      newTask,
      inputError,
      selectError,
      newUserId,
    } = this.state;

    return (
      <div className="App container">
        <h1 className="title is-1 ml-0">Add todo form</h1>

        <form
          className="box"
          onSubmit={this.handleButtonAdd}
        >
          <label
            className="label"
            htmlFor="input"
          >
            <p className="label__title has-text-left title is-5">
              You can create a new task here:
            </p>
            <input
              type="text"
              id="input"
              value={newTask}
              className="input is-normal"
              placeholder="Write new task here"
              onChange={this.handleInput}
            />
            {inputError && (
              <span className="tag is-danger is-medium mt-1">
                Please enter the title
              </span>
            )}
          </label>
          <label
            className="label label__select"
            htmlFor="select"
          >
            <p className="label__title has-text-left title is-5">
              Choose the user here:
            </p>
            <select
              className="select is-fullwidth"
              id="select"
              value={newUserId}
              onChange={this.handleSelectId}
            >
              <option value="0">Choose the user</option>
              {users.map(({ id, name }) => (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              ))}
            </select>
            {selectError && (
              <span className="tag is-danger is-medium mt-1">
                Please choose a user
              </span>
            )}
          </label>
          <button
            type="submit"
            className="button is-info is-medium is-fullwidth"
          >
            Add task
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
