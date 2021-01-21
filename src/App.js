import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

const preparedTodos = todos
  .map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

class App extends React.Component {
  state = {
    userList: users,
    todoList: preparedTodos,
    newTask: '',
    selectedUser: '',
    titleFieldError: false,
    userFieldError: false,
  };

  handleChange = (event) => {
    this.setState({ titleFieldError: false });
    this.setState({ userFieldError: false });

    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.newTask) {
      this.setState({ titleFieldError: true });

      return;
    }

    if (!this.state.selectedUser) {
      this.setState({ userFieldError: true });

      return;
    }

    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          id: state.todoList.length + 1,
          userId: +state.selectedUser,
          completed: false,
          title: state.newTask,
          user: state.userList.find(user => user.id === +state.selectedUser),
        }],
      newTask: '',
      selectedUser: '',
    }));
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>TODO list</h1>
          <div className="header__info">
            <span>
              {`Tasks to do: ${this.state.todoList.length}`}
            </span>
            <span className="header__done" />
            <span>
              People involved:
              {` ${users.length}`}
            </span>
          </div>
        </div>
        <TodoList todos={this.state.todoList} />
        <form className="form-box" onSubmit={this.handleSubmit}>
          <div>Add a new task:</div>
          <div className="form-box__element">
            <input
              type="text"
              name="newTask"
              placeholder="Task description"
              value={this.state.newTask}
              onChange={this.handleChange}
            />
            {this.state.titleFieldError && (
              <span className="form-box__error">
                Please, enter the title
              </span>
            )}
          </div>
          <div className="form-box__element">
            <select
              name="selectedUser"
              value={this.state.selectedUser}
              onChange={this.handleChange}
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {this.state.userFieldError && (
              <span className="form-box__error">
                Please, choose a user
              </span>
            )}
          </div>
          <div className="form-box__element">
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
