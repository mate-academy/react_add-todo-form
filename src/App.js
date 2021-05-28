import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

const todosList = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosList,
    newTitle: '',
    titleError: false,

    newUserId: 0,
    userError: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newTitle, newUserId } = this.state;

    this.setState({
      titleError: !newTitle,
      userError: !newUserId,
    });

    if (!newTitle) {
      return;
    }

    if (!newUserId) {
      return;
    }

    this.addTodo(newTitle, +newUserId);

    this.clearTodo();
  }

  addTodo = (title, userId) => {
    const newTodo = {
      id: this.state.todos.length + 1,
      title,
      userId,
      user: users.find(user => user.id === userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  clearTodo = () => {
    this.setState({
      newTitle: '',
      newUserId: 0,
    });
  }

  render() {
    const {
      newTitle,
      newUserId,
      titleError,
      userError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          onSubmit={this.handleFormSubmit}
        >
          <div>
            <input
              type="text"
              placeholder="Enter todo"
              className="formInput"
              value={newTitle}
              onChange={(event) => {
                this.setState({
                  newTitle: event.target.value, titleError: false,
                });
              }}
            />

            {titleError && (
              <span className="error">
                Please enter todo
              </span>
            )}
          </div>

          <div>
            <select
              className="formSelect"
              value={newUserId}
              onChange={(event) => {
                this.setState({
                  newUserId: event.target.value, userError: false,
                });
              }}
            >
              <option value="">
                Choose a user
              </option>

              {users.map(user => (
                <option
                  key={user.name}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {userError && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </div>

          <button
            type="submit"
            className="button"
          >
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
