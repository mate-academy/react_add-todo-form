import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUser = [...todosFromServer].map(todo => ({
  ...todo,
  user: usersFromServer.find(
    (user) => todo.userId === user.id,
  ) || null,
}));

export class App extends React.Component {
  state = {
    todos: todosWithUser,
    users: usersFromServer,
    isTitleValid: true,
    title: '',
    isUserValid: true,
    user: '0',
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title': this.setState({ isTitleValid: true });

        break;

      case 'user': this.setState({ isUserValid: true });

        break;

      default:

        return;
    }

    this.setState({
      [name]: value,
    });

    // if (name === 'title') {
    //   this.setState({ isTitleValid: true });
    // }

    // if (name === 'user') {
    //   this.setState({ isUserValid: true });
    // }

    // this.setState({
    //   [name]: value,
    // });
  };

  addNewTodos = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title, user, todos, users,
    } = this.state;

    const titleRemovedSpace = title.trim();

    if (titleRemovedSpace === '' && user === '0') {
      this.setState({
        isTitleValid: false,
        isUserValid: false,
      });

      return;
    }

    if (titleRemovedSpace === '') {
      this.setState({ isTitleValid: false });

      return;
    }

    if (user === '0') {
      this.setState({ isUserValid: false });

      return;
    }

    const { id } = [...todos].sort((a, b) => b.id - a.id)[0];
    const userForNewTodo = users.find(
      user1 => user1.name === user,
    );

    const newTodo = {
      id: id + 1,
      title: title.replace(/[^a-zA-Zа-яА-Я0-9\s]+/g, ''),
      comleted: false,
      userId: userForNewTodo?.id,
      user: userForNewTodo,
    };

    this.setState({
      todos: [
        ...todos,
        newTodo,
      ],
      isTitleValid: true,
      title: '',
      isUserValid: true,
      user: '0',
    });
  };

  render() {
    const {
      isTitleValid, isUserValid, title, user, todos, users,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={this.addNewTodos}
        >
          <div className="field">
            <label>
              {'Title: '}
              <input
                name="title"
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={title}
                onChange={this.handleChange}
              />
            </label>

            {!isTitleValid && (
              <span
                className="error"
              >
                Please enter a title
              </span>
            )}
          </div>

          <div className="field">
            <label>
              {'User: '}
              <select
                data-cy="userSelect"
                name="user"
                value={user}
                onChange={this.handleChange}
              >
                <option
                  value="0"
                  disabled
                >
                  Choose a user
                </option>
                {users.map(optionUser => (
                  <option key={optionUser.id} value={optionUser.name}>
                    {optionUser.name}
                  </option>
                ))}
              </select>
            </label>

            {!isUserValid && (
              <span
                className="error"
              >
                Please choose a user
              </span>
            )}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>
        </form>

        <TodoList
          todos={todos}
        />
      </div>
    );
  }
}
