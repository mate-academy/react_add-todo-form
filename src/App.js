import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

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
    todosWithUsers: [...preparedTodos],
    title: '',
    username: 'Choose a user',
    submitsCount: 0,
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

    this.setState({ submitsCount: 1 });

    if (!this.state.title || this.state.username === 'Choose a user') {
      return 0;
    }

    const todo = {
      title: this.state.title,
      id: this.state.todosWithUsers.length + 1,
      completed: false,
      userId: users.find(user => user.username === this.state.username).id,
      user: users.find(user => user.username === this.state.username),
    };

    this.setState(state => ({
      todosWithUsers: [
        ...state.todosWithUsers,
        todo,
      ],
    }));

    return 0;
  }

  render() {
    const { todosWithUsers, username, title, submitsCount } = this.state;

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

          {!title && submitsCount > 0 ? (
            <p className="inputs-error">please enter title</p>
          ) : (<></>)}

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
                <option key={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          {username === 'Choose a user' && submitsCount > 0 ? (
            <p className="inputs-error">please choose a user</p>
          ) : (<></>)}

          <div className="buttons is-centered">
            <button
              className="button is-success is-outlined"
              type="submit"
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
