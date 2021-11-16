import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromApi from './api/todos';
import { Todo } from './types/types';
import { Todos } from './components/Todos';

interface State {
  todos: Todo[];
  title: string;
  selectedUserId: number;
  hasTitleError: boolean;
  hasSelectError: boolean;
}

export class App extends React.Component<{}, State> {
  state = {
    todos: [...todosFromApi],
    title: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasSelectError: false,
  };

  changeTitleHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  changeUserHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
    });
  };

  addTodo = () => {
    const { title, selectedUserId, todos } = this.state;

    const newTodo = {
      id: todos.length + 1,
      title,
      userId: selectedUserId,
      completed: false,
    };

    this.setState({
      todos: [...todos, newTodo],
    });
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, selectedUserId } = this.state;

    if (!title) {
      this.setState({
        hasTitleError: true,
      });
    }

    if (selectedUserId === 0) {
      this.setState({
        hasSelectError: true,
      });
    }

    this.addTodo();

    this.setState({
      title: '',
      selectedUserId: 0,
    });
  };

  render() {
    const {
      todos,
      title,
      selectedUserId,
      hasTitleError,
      hasSelectError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.submitHandler}>
          <label htmlFor="title" className="App_label">
            Target
            {' '}
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="Enter some task"
              onChange={this.changeTitleHandle}
            />
          </label>
          <div>
            {
              hasTitleError && (
                'Please enter the title'
              )
            }

          </div>

          <label htmlFor="selectedUserId" className="App__label">
            User:
            {' '}
            <select
              name="users"
              id="selectedUserId"
              value={selectedUserId}
              onChange={this.changeUserHandle}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <div>
            {
              hasSelectError && (
                'Please choose a user'
              )
            }
          </div>
          <button
            type="submit"
          >
            Add Task
          </button>
        </form>

        <Todos todos={todos} />
      </div>
    );
  }
}
