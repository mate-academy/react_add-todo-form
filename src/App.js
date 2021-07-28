import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

export class App extends React.Component {
  state = {
    fullTodos: preparedTodos,
    selectedUserId: '',
    newUser: null,
    title: '',
    hasSelectError: false,
    hasInputError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, newUser } = this.state;

    if (title && newUser) {
      const newTodo = {
        user: newUser,
        userId: newUser.id,
        id: title,
        title,
        completed: false,
      };

      this.setState(state => (
        {
          fullTodos: [...state.fullTodos, newTodo],
          selectedUserId: '',
          title: '',
          newUser: null,
          hasInputError: false,
          hasSelectError: false,
        }
      ));
    }

    if (!title) {
      this.setState({
        hasInputError: true,
      });
    }

    if (!newUser) {
      this.setState({
        hasSelectError: true,
      });
    }
  }

  handleSelection = (event) => {
    const userId = event.target.value;

    this.setState(
      {
        newUser: users.find(user => user.id === +userId),
        selectedUserId: userId,
        hasSelectError: false,
      },
    );
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
      hasInputError: false,
    });
  }

  render() {
    const {
      fullTodos,
      selectedUserId,
      title,
      hasInputError,
      hasSelectError,
    } = this.state;

    return (
      <div className="App">
        <h1>
          ADD TODO FORM
        </h1>
        {hasInputError
        && (
          <div>
            <h3>error</h3>
            <p>Please, write a title</p>
          </div>
        )
        }
        {hasSelectError
        && (
          <div>
            <h3>error</h3>
            <p>Please, choose a user</p>
          </div>
        )

        }
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
          <select
            value={selectedUserId}
            onChange={this.handleSelection}
          >
            <option>
              Choose a User
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
            }
          </select>
          <button type="submit">
            Submit
          </button>
        </form>
        <TodoList todos={fullTodos} />
      </div>
    );
  }
}
