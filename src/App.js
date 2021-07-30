import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './component/TodoList';

const findUser = userId => users.find(user => user.id === userId);

const todosList = todos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosList,
    newTitleForRodo: '',
    newIdForTodo: 0,
    titleSubmitError: false,
    userSubmitError: false,
  }

  formSubmit = (event) => {
    event.preventDefault();
    const { newTitleForRodo, newIdForTodo } = this.state;

    this.setState({
      titleSubmitError: !newTitleForRodo,
      userSubmitError: !newIdForTodo,
    });

    if (!newTitleForRodo || !newIdForTodo) {
      return;
    }

    this.addTodo(newTitleForRodo, +newIdForTodo);

    this.setState({
      newTitleForRodo: '',
      newIdForTodo: 0,
    });
  }

  inputChange = (event) => {
    this.setState({
      newTitleForRodo: event.target.value, titleSubmitError: false,
    });
  }

  selectChange = (event) => {
    this.setState({
      newIdForTodo: event.target.value, userSubmitError: false,
    });
  }

  addTodo = (title, userId) => {
    const newTodo = {
      id: this.state.todos.length + 1,
      title,
      userId,
      completed: false,
      user: findUser(userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const {
      newTitleForRodo,
      newIdForTodo,
      titleSubmitError,
      userSubmitError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="addForm">Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          onSubmit={this.formSubmit}
        >
          <div>
            <input
              className="input"
              type="text"
              placeholder="title"
              value={newTitleForRodo}
              onChange={this.inputChange}
            />
            {titleSubmitError && (
              <span className="error">Please enter the title</span>
            )}
          </div>

          <div>
            <select
              className="select"
              value={newIdForTodo}
              onChange={this.selectChange}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {userSubmitError && (
              <span className="error">Please enter the title</span>
            )}
          </div>
          <button
            className="button"
            type="submit"
          >
            Add and send
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
