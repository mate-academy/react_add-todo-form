import React from 'react';
import classNames from 'classnames';
import './App.css';

import usersfromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const preparedTodos = todosFromServer.map((todo) => {
  const todoCopy = { ...todo };

  todoCopy.user = usersfromServer.find(user => user.id === todo.userId);
  todoCopy.status = `${todo.completed ? 'completed' : 'in progress'}`;

  return todoCopy;
});

class App extends React.Component {
  state = {
    todos: preparedTodos,
    userName: '',
    title: '',
    isTitleValid: true,
    isUserNameValid: true,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, title } = this.state;

    if (!userName) {
      this.setState({ isUserNameValid: false });
    }

    if (!title) {
      this.setState({ isTitleValid: false });
    }

    if (!title || !userName) {
      return;
    }

    const user = usersfromServer.find(person => person.name === userName);
    const newTodo = {
      userId: user.id,
      id: this.state.todos.length + 1,
      title,
      completed: false,
      user,
      status: `in progress`,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      userName: '',
      title: '',
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let isValid;

    switch (name) {
      case ('title'):
        isValid = 'isTitleValid';
        break;

      case ('userName'):
        isValid = 'isUserNameValid';
        break;

      default:
        break;
    }

    this.setState({
      [name]: value,
      [isValid]: true,
    });
  }

  render() {
    const {
      todos,
      title,
      userName,
      isTitleValid,
      isUserNameValid,
    } = this.state;

    const { handleChange, handleSubmit } = this;

    return (
      <div className="App">
        <h1 className="title">Add todo form</h1>
        <form
          onSubmit={handleSubmit}
          className="form"
          id="todo-form"
        >
          <div className="input-container">
            <label className="form-label" htmlFor="title">Todo title:</label>
            <input
              id="title"
              className="form-control"
              type="text"
              name="title"
              placeholder="Type here"
              value={title}
              onChange={handleChange}
            />
            <span className={classNames('message', {
              'message--visible': !isTitleValid,
            })}
            >
              Please enter the title
            </span>
          </div>

          <div className="input-container">
            <label className="form-label" htmlFor="user">User:</label>
            <select
              id="user"
              className="form-select"
              name="userName"
              value={userName}
              onChange={this.handleChange}
            >
              <option value="">
                Choose user here
              </option>
              {usersfromServer.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            <span className={classNames('message', {
              'message--visible': !isUserNameValid,
            })}
            >
              Please choose a user
            </span>
          </div>
        </form>
        <button
          type="submit"
          form="todo-form"
          className="btn btn-primary"
        >
          Add
        </button>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
