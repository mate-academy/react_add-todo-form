import React from 'react';
import './App.css';

import { Todo } from './types/todo';
import { User } from './types/user';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList';

type State = {
  todos: Todo[];
  users: User[];
  title: string;
  selectedUser: string;
  userValidation: boolean;
  titleValidation: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos,
    users,
    title: '',
    selectedUser: '',
    userValidation: true,
    titleValidation: true,
  };

  changeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'title') {
      this.setState({ titleValidation: true });
    }

    if (name === 'selectedUser') {
      this.setState({ userValidation: true });
    }

    return this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, selectedUser } = this.state;
    const userFromSelect = this.state.users.find(user => user.name === selectedUser);

    if (!userFromSelect || !title.trim().length) {
      return this.showError();
    }

    const newTodo: Todo = {
      userId: userFromSelect.id,
      id: this.state.todos.length + 1,
      completed: false,
      title,
    };

    return this.setState((state) => ({
      todos: [...state.todos, newTodo],
      title: '',
      selectedUser: '',
    }));
  };

  showError = () => {
    if (!this.state.title.trim().length) {
      this.setState({
        titleValidation: false,
      });
    }

    if (!this.state.selectedUser.length) {
      this.setState({
        userValidation: false,
      });
    }
  };

  render() {
    const {
      userValidation,
      titleValidation,
      title,
      selectedUser,
    } = this.state;

    return (
      <div className="App">
        <form
          className="form"
          action=""
          method="GET"
          onSubmit={this.addTask}
        >
          <label
            htmlFor="todo-title"
            className="label"
          >
            Enter Task:
            <input
              id="todo-title"
              type="text"
              name="title"
              value={title}
              onChange={this.changeHandle}
            />
            {!titleValidation
              && (
                <span className="error">
                  Please enter a task
                </span>
              )}
          </label>
          <label
            htmlFor="select-user"
            className="label"
          >
            Choose a user:
            <select
              id="select-user"
              name="selectedUser"
              value={selectedUser}
              onChange={this.changeHandle}
            >
              <option value="">
                Select User
              </option>
              {
                users.map(user => (
                  <option
                    value={user.name}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))
              }
            </select>
            {!userValidation
              && (
                <span className="error">
                  Please choose a user
                </span>
              )}
          </label>
          <button
            type="submit"
            className="button"
          >
            Add Task
          </button>
        </form>

        <TodoList
          todos={todos}
          users={users}
        />
      </div>
    );
  }
}

export default App;
