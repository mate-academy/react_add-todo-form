import React from 'react';
import './App.scss';
import classNames from 'classnames';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export class App extends React.Component {
  state = {
    users: [...users],
    todos: [...todos],
    title: '',
    user: '',
    titleError: false,
    userError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: !value,
    });
  }

  addTodo = () => {
    const { title, user } = this.state;

    if (!title.trim() || !user) {
      this.setState(state => ({
        titleError: !(state.title.trim()),
        userError: !(state.user),
      }));

      return;
    }

    this.setState(state => (
      (state.todos).push(
        {
          userId: +state.user,
          id: (state.todos).length + 1,
          title: state.title,
          completed: false,
        },
      )
    ));

    this.setState({
      title: '',
      user: '',
    });
  }

  render() {
    const { users: usersList, todos: todosList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="todosForm"
          name="todosForm"
          action="#0"
          method="GET"
        >
          <div className="todosForm__inputContainer">
            <label htmlFor="title">
              Title of todo
            </label>
            <input
              className="todosForm__inputField"
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Insert the title"
              onChange={this.handleChange}
            />
            <span className={classNames(
              'error',
              { visible: this.state.titleError },
            )}
            >
              Please enter the title
            </span>
          </div>
          <div className="todosForm__inputContainer">
            <label htmlFor="user">
              Select a user
            </label>
            <select
              className="todosForm__inputField"
              name="user"
              value={this.state.user}
              onChange={this.handleChange}
            >
              <option value="">Please choose a user</option>
              {usersList.map(user => (
                <option key={user.id} value={+user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <span className={classNames(
              'error',
              { visible: this.state.userError },
            )}
            >
              Please choose a user
            </span>
          </div>
          <button
            type="button"
            className="todosForm__addButton"
            onClick={this.addTodo}
          >
            Add
          </button>
        </form>
        <TodoList todos={todosList} users={usersList} />
      </div>
    );
  }
}
