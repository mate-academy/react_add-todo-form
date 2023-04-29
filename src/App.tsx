import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUser = [...todosFromServer].map(todo => ({
  ...todo,
  user: usersFromServer.find(
    (user) => todo.userId === user.id,
  ) || usersFromServer[0],
}));

export class App extends React.Component {
  state = {
    todos: todosWithUser,
    users: usersFromServer,
    validationTitle: true,
    title: '',
    validationUser: true,
    user: '0',
  };

  handleChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;

    if (name === 'title') {
      this.setState({ validationTitle: true });
    }

    if (name === 'user') {
      this.setState({ validationUser: true });
    }

    this.setState({
      [name]: value,
    });
  };

  addNewTodos = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const {
      title, user, todos, users,
    } = this.state;

    if (title === '' && user === '0') {
      this.setState({
        validationTitle: false,
        validationUser: false,
      });

      return;
    }

    if (title === '') {
      this.setState({ validationTitle: false });

      return;
    }

    if (user === '0') {
      this.setState({ validationUser: false });

      return;
    }

    const { id } = [...todos].sort((a, b) => b.id - a.id)[0];
    const userForNewTodo = users.find(
      user1 => user1.name === user,
    );

    const newTodo = {
      id: id + 1,
      title: title.replace(/[^a-zA-Zа-яА-Я0-9\s]+/g, ''),
      comlete: false,
      userId: userForNewTodo?.id,
      user: userForNewTodo,
    };

    this.setState({
      todos: [
        ...todos,
        newTodo,
      ],
      validationTitle: true,
      title: '',
      validationUser: true,
      user: '0',
    });
  };

  render() {
    const {
      validationTitle, validationUser, title, user, todos, users,
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

            {!validationTitle && (
              <>
                <span
                  className="error"
                >
                  Please enter a title
                </span>
              </>
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

            {!validationUser && (
              <>
                <span
                  className="error"
                >
                  Please choose a user
                </span>
              </>
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
          // users={users}
        />
      </div>
    );
  }
}
