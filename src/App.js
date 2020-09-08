import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    userId: '',
    title: '',
    titleError: false,
    userError: false,
    todosToRender: [...todos],
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.replace(/\ws+/g, '').trim(),
      userError: false,
      titleError: false,
    });
  }

  formsCheck = () => {
    const { userId, title, todosToRender } = this.state;

    if (userId && title) {
      todosToRender.push({
        userId,
        id: todosToRender.length + 1,
        title,
        completed: false,
      });

      this.setState({
        userId: '',
        title: '',
      });
    }

    if (!title) {
      this.setState({ titleError: true });
    }

    if (!userId) {
      this.setState({ userError: true });
    }
  }

  render() {
    const { title, userId, titleError, userError, todosToRender } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.formsCheck();
          }}
        >
          <p hidden={!titleError}>
            Please enter the title
          </p>

          <p hidden={!userError}>
            Please choose a user
          </p>

          <label>
            User:
            <select
              name="userId"
              onChange={this.handleChange}
              value={userId}
            >
              <option value="">
                Choose user!
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            TODO:
            <input
              onChange={this.handleChange}
              name="title"
              placeholder="your todo"
              value={title}
            />
          </label>

          <button type="submit">
            Add
          </button>
        </form>
        <TodoList todos={todosToRender} />
      </div>
    );
  }
}

export default App;
