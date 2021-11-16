import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

interface State {
  todos: Todo[],
  title: string,
  selectedUser: string,
  userNotSelected: boolean,
  titleNotEntered: boolean
}

class App extends React.Component<{}, State> {
  state = {
    todos,
    title: '',
    selectedUser: 'Choose Performancer',
    userNotSelected: false,
    titleNotEntered: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => (
      {
        ...state,
        [name]: value,
        titleNotEntered: false,
      }
    ));
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState((state) => (
      {
        ...state,
        [name]: value,
        userNotSelected: false,
      }
    ));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedUser = users.find((user) => (
      user.name === this.state.selectedUser
    ));

    if (!selectedUser || !this.state.title) {
      return this.isValid();
    }

    const newTodo: Todo = {
      userId: selectedUser?.id,
      id: this.state.todos.length + 1,
      title: this.state.title,
      completed: false,
    };

    return this.setState((state) => ({
      todos: [...state.todos, newTodo],
      title: '',
      selectedUser: 'no user selected',
    }));
  };

  isValid = () => {
    this.setState(state => ({
      titleNotEntered: !state.title,
      userNotSelected: state.selectedUser === 'Choose Performancer',
    }));
  };

  render() {
    const {
      title,
      selectedUser,
      titleNotEntered,
      userNotSelected,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form action="POST" onSubmit={this.handleSubmit}>
          {
            titleNotEntered
              ? 'Title is not found'
              : null
          }
          <label htmlFor="chooseTitle">
            <input
              type="text"
              name="title"
              id="chooseTitle"
              placeholder="Enter Todo"
              value={title}
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="chooseUser">
            <select
              name="selectedUser"
              id="chooseUser"
              value={selectedUser}
              onChange={this.handleSelectChange}
            >
              <option value="">
                Choose performancer
              </option>
              {users.map(user => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {
              userNotSelected
                ? 'User is not select'
                : null
            }
          </label>
          <button type="submit">
            Add Todo
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
