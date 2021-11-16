import React from 'react';
import classNames from 'classnames';
import './App.css';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import users from './api/users';
import todos from './api/todos';

type State = {
  preparedTodos: Todo[],
  title: string,
  username: string,
  showMessageTitle: boolean,
  showMessageUser: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    preparedTodos: todos.map(todo => (
      {
        ...todo,
        user: users.find(user => user.id === todo.userId) || null,
      }
    )),
    title: '',
    username: '',
    showMessageTitle: false,
    showMessageUser: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      title: event.target.value.length > 10
        ? state.title
        : event.target.value.replace(/[^а-яА-Яa-zA-Z0-9\s]/, ''),
    }));
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      username: event.target.value,
    });
  };

  addNewTodo = () => {
    const newTodo = {
      ...this.state.preparedTodos.slice(-1),
      id: this.state.preparedTodos.length + 1,
      title: this.state.title,
      user: users.find(user => user.name === this.state.username) || null,
      userId: users[users.findIndex(user => user.name === this.state.username)].id || null,
    };

    return newTodo;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.title !== '' && this.state.username !== '') {
      this.setState(state => ({
        preparedTodos: [
          ...state.preparedTodos,
          this.addNewTodo(),
        ],
        title: '',
        username: '',
      }));
    }

    if (this.state.title === '') {
      this.setState({ showMessageTitle: true });
    } else {
      this.setState({ showMessageTitle: false });
    }

    if (this.state.username === '') {
      this.setState({ showMessageUser: true });
    } else {
      this.setState({ showMessageUser: false });
    }
  };

  render() {
    const {
      preparedTodos, title, username, showMessageTitle, showMessageUser,
    } = this.state;

    return (
      <div className="App">
        <>
          <h1>Add todo form</h1>

          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={this.handleTitleChange}
            />

            <span className={classNames('message-error', { show: showMessageTitle })}>
              Please enter the title
            </span>

            <select
              name="username"
              value={username}
              onChange={this.handleUserChange}
            >
              <option value="">Choose a user</option>
              {users.map(user => {
                return (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                );
              })}
            </select>

            <span className={classNames('message-error', { show: showMessageUser })}>
              Please choose a user
            </span>

            <button type="submit">Add</button>
          </form>

          <TodoList preparedTodos={preparedTodos} />
        </>
      </div>
    );
  }
}

export default App;
