import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }),
);

class App extends React.PureComponent {
  state = {
    preparedTodos,
    title: '',
    username: 'Choose a user',
    isTitleEntered: true,
    isUserSelected: true,
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { preparedTodos: todosWithUsrers, title, username } = this.state;

    if (!title || username === 'Choose a user') {
      if (!title) {
        this.setState({ isTitleEntered: false });
      }

      if (username === 'Choose a user') {
        this.setState({ isUserSelected: false });
      }

      return;
    }

    const selectedUser = users.find(
      user => user.username === username,
    );

    const todo = {
      title,
      id: todosWithUsrers.length + 1,
      completed: false,
      user: selectedUser,
      userId: selectedUser.id,
    };

    this.setState(state => ({
      preparedTodos: [
        ...state.preparedTodos,
        todo,
      ],
    }));
  }

  render() {
    const {
      preparedTodos: todosWithUsers,
      isUserSelected,
      isTitleEntered,
    } = this.state;

    return (
      <div className="App">
        <form
          className="form box"
          onSubmit={this.handleSubmit}
        >
          <h1 className="title">ADD TASK</h1>
          <div className="field">
            <label
              className="label"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              id="title"
              className="input"
              type="text"
              name="title"
              placeholder="enter title of task"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          {
            !isTitleEntered && (
              <p className="inputs-error">please enter title</p>
            )
          }

          <div className="field select is-fullwidth">
            <select
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            >
              <option>
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          {
            !isUserSelected && (
              <p className="inputs-error">please choose a user</p>
            )
          }

          <div className="buttons is-centered">
            <button
              className="button is-success is-outlined"
              type="submit"
              onClick={() => {
                const { title, username } = this.state;

                this.setState({
                  isTitleEntered: !!title,
                  isUserSelected: username !== 'Choose a user',
                });
              }}
            >
              Add
            </button>
          </div>
        </form>
        <TodoList todos={todosWithUsers} />
      </div>
    );
  }
}

export default App;
