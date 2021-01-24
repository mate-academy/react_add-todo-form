import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './TodoList/TodoList';

const todoListUser = todos.map(user => ({
  ...user,
  user: users.find(man => man.id === user.userId).name,
}));

class App extends React.Component {
  state = {
    todosList: todoListUser,
    inputTitle: '',
    selectValue: 'Choose a user',
    errorTitle: false,
    errorSelect: false,
  };

  checkedTitle = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorTitle: false,
    });
  }

  checkedUser = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorSelect: false,
    });
  }

  addTodo = (event) => {
    event.preventDefault();
    const { inputTitle, selectValue } = this.state;

    if (inputTitle.trim().length === 0) {
      this.setState({ errorTitle: true });
    }

    if (selectValue === 'Choose a user') {
      this.setState({ errorSelect: true });
    }

    if (inputTitle.trim().length === 0 || selectValue === 'Choose a user') {
      return;
    }

    const newTodo = {
      title: this.state.inputTitle,
      user: this.state.selectValue,
      id: Math.random(),
    };

    this.setState(prevState => ({
      todosList: [newTodo, ...prevState.todosList],
      inputTitle: '',
      selectValue: 'Choose a user',
    }));
  }

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>

        <form onSubmit={this.addTodo} method="POST">
          <label htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            name="inputTitle"
            id="title"
            placeholder="Title"
            value={this.state.inputTitle}
            onChange={this.checkedTitle}
          />

          <label htmlFor="user">
            {' '}
            Select user:
          </label>
          <select
            id="user"
            name="selectValue"
            value={this.state.selectValue}
            onChange={this.checkedUser}
          >
            <option>Choose a user</option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          <button type="submit" onClick={this.checkSelectError}>
            Add
          </button>

        </form>

        {this.state.errorTitle && (
          <p className="app__error">Please enter the title</p>
        )}
        {this.state.errorSelect && (
          <p className="app__error">Please choose a user</p>
        )}

        <TodoList todos={this.state.todosList} />

      </div>
    );
  }
}

export default App;
