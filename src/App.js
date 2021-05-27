import React from 'react';
import './App.css';
import { TodoList } from './TodoList';

import users from './api/users';
import todosFromServer from './api/todos';

const getUserById = userId => users.find(user => user.id === userId);

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUser,
    newTodoTitle: '',
    newTodoUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  }

  hendelFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, newTodoUserId } = this.state;

    this.setState({
      hasTitleError: !newTodoTitle,
      hasUserError: !newTodoUserId,
    });

    if (!newTodoTitle) {
      return;
    }

    if (!newTodoUserId) {
      return;
    }

    this.addTodo(newTodoTitle, newTodoUserId);
  };

  hendelTitleChange = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
    });
  }

  hendelUserChange = (event) => {
    this.setState({
      newTodoUserId: +event.target.value,
    });
  }

  addTodo(todoTitle, userId) {
    const { todos } = this.state;
    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: todoTitle,
      userId,
      user: getUserById(userId),
    };

    this.setState(
      { todos: [...todos, newTodo] },
    );

    this.setState({
      newTodoTitle: '',
      newTodoUserId: 0,
    });
  }

  render() {
    const {
      todos,
      newTodoTitle,
      newTodoUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoList todos={todos} />
        <form
          onSubmit={this.hendelFormSubmit}
          className="form"
        >
          <div className="form__wrapper-title">
            <input
              type="text"
              value={newTodoTitle}
              onChange={this.hendelTitleChange}
              placeholder="Enter title of todo"
              className="form__title-todo"

            />
            <span className="error">
              {hasTitleError && ` Please enter the title`}
            </span>
          </div>
          <div className="form__wrapper-user">
            <select
              value={newTodoUserId}
              onChange={this.hendelUserChange}
              className="form__select-user"

            >
              <option>Choose a user</option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}

                >
                  {user.name}
                </option>
              ))}
            </select>
            <span className="error">
              {hasUserError && ` Please choose a user`}
            </span>

          </div>
          <button
            type="submit"
            className="form__button-submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;
