import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...todos],
    preparedTodos: [...preparedTodos],
    title: '',
    userId: null,
    users: [...users],
    notChoseUser: false,
    notEnterTitle: '',
  }

  handleSubmit = (event) => {
    if (this.state.userId < 1) {
      this.setState({
        notChoseUser: true,
      });
    } else if (this.state.notEnterTitle.length < 1) {
      this.setState({
        notEnterTitle: true,
      });
    } else {
      this.setState(prevState => ({
        todos: [
          ...prevState.todos,
          {
            id: prevState.todos.length + 1,
            userId: Number(prevState.userId),
            title: prevState.title,
          },
        ],
      }));

      this.setState(prevstate => ({
        preparedTodos: prevstate.todos.map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        })),
      }));

      this.setState({
        title: '',
        userId: 0,
      });
    }

    event.preventDefault();
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    if (name === 'userId') {
      this.setState({
        notChoseUser: false,
      });
    }

    if (name === 'title') {
      this.setState({
        notEnterTitle: false,
      });
    }

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form
          onSubmit={this.handleSubmit}
          className="form-todo"
        >
          <div className="form-group">
            <label htmlFor="todo-title">
              Please enter Todo title:
              <input
                className="form-control"
                id="todo-title"
                type="text"
                value={this.state.title}
                name="title"
                placeholder="Enter Todo Title"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <select
            className="form-control mb-2"
            value={this.state.userId}
            onChange={this.handleChange}
            name="userId"
          >
            <option value={0} selected>Choose a user</option>
            {this.state.users.map(user => (
              <option value={user.id}>
                {user.id}
                {' '}
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="btn btn-primary mb-2"
          >
            Add ToDo
          </button>
          <div>
            <div
              style={this.state.notChoseUser
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }}
            >
              Please Chose a User
            </div>
            <div
              style={this.state.notEnterTitle
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }}
            >
              Please Enter ToDo Title
            </div>
          </div>
        </form>
        <TodoList preparedTodos={this.state.preparedTodos} />
      </div>
    );
  }
}

export default App;
