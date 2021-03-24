import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    user: null,
    userId: '',
    title: '',
    todos: preparedTodos,
    hasTitleError: false,
    hasUserError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.user && this.state.title !== '') {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          userId: prevState.user.id,
          id: prevState.todos.length + 1,
          title: prevState.title,
          user: prevState.user,
          completed: false,
          hasTitleError: false,
          hasUserError: false,
        }],
      }));
    }

    if (this.state.title === '') {
      this.setState({ hasTitleError: true });
    }

    if (!this.state.user) {
      this.setState({ hasUserError: true });
    }
  }

  handleSelection = (event) => {
    const userId = event.target.value;

    this.setState(
      {
        user: users.find(user => user.id === +userId),
        userId,
        hasUserError: false,
      },
    );
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if (this.state.title !== '') {
      this.setState({ hasTitleError: false });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form__error">
            {this.state.hasTitleError && (
              <div className="form__error__title">
                <h3>
                  Error
                </h3>
                <p>
                  Please enter the title
                </p>
              </div>
            )}

            {this.state.hasUserError && (
              <div className="form__error__select">
                <h3>
                  Error
                </h3>
                <p>
                  Please choose a user
                </p>
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={this.state.title}
              onChange={this.handleChange}
              pattern="([^\s][A-z0-9À-ž\s]+)"
            />

            <select
              name="user"
              value={this.state.userId}
              onChange={this.handleSelection}
            >
              <option>Select user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            <button type="submit">Add</button>
          </div>
        </form>

        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id} className="list__element">
              <div className="list__element__user">
                {`User: ${todo.user.name}`}
              </div>
              <div className="list__element__title">
                {`Title: ${todo.title}`}
              </div>
              <div className="list__element__completed">
                {`Completed: ${todo.completed ? 'true' : 'false'}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
