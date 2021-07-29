import React from 'react';
import classNames from 'classnames';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';

const preparedTodos = todos.map((todo) => {
  const todoCopy = { ...todo };

  todoCopy.user = users.find(user => user.id === todo.userId);
  todoCopy.status = `${todo.completed ? 'completed' : 'in progress'}`;

  return todoCopy;
});

class App extends React.Component {
  state = {
    todoList: preparedTodos,
    userName: '',
    title: '',
    isTitleValid: true,
    isUserNameValid: true,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      todoList,
      userName,
      title,
    } = this.state;

    if (!userName) {
      this.setState({ isUserNameValid: false });
    } else {
      this.setState({ isUserNameValid: true });
    }

    if (!title) {
      this.setState({ isTitleValid: false });
    } else {
      this.setState({ isTitleValid: true });
    }

    if (!title || !userName) {
      return;
    }

    const user = users.find(person => person.name === userName);
    const newTodo = {
      userId: user.id,
      id: todoList.length + 1,
      title,
      completed: false,
      user,
      status: `in progress`,
    };

    this.setState(state => ({
      todoList: [...state.todoList, newTodo],
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
    const { todoList, isTitleValid, isUserNameValid } = this.state;

    return (
      <div className="App">
        <h1 className="title">Add todo form</h1>
        <form
          onSubmit={event => this.handleSubmit(event)}
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
              value={this.state.title}
              onChange={event => this.handleChange(event)}
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
              value={this.state.userName}
              onChange={event => this.handleChange(event)}
            >
              <option value="">
                Choose user here
              </option>
              {users.map(user => (
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
        <button type="submit" form="todo-form" className="btn btn-primary">
          Add
        </button>

        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
