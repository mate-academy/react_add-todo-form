import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { Select } from './components/Select/Select';

const userName = users.map(user => ({
  name: user.name,
  id: user.id,
}));

const todoList = [...todos];

class App extends Component {
  state = {
    todo: '',
    name: [],
    userId: 0,
    todoTextError: false,
    userError: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      todo: value.replace(/\s/, ' '),
      todoTextError: false,
    });
  }

  handleSelect = ({ target: { value } }) => {
    this.setState({
      userId: +value,
      userError: false,
    });
  }

  handleClick = () => {
    if (this.state.todo.trim().length === 0) {
      this.setState(prevState => ({ todoTextError: true }));
    }

    if (this.state.userId === 0) {
      this.setState(prevState => ({ userError: true }));
    }

    if (this.state.todo.trim().length !== 0 && this.state.userId !== 0) {
      todoList.push({
        title: this.state.todo,
        name: this.state.name,
        userId: this.state.userId,
        completed: false,
      });
      this.setState(prevState => ({ todo: '' }));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form>
          <input
            type="text"
            className="input"
            placeholder="Write your text"
            onChange={this.handleChange}
            value={this.state.todo}
          />
          {this.state.todoTextError && <div>Enter text</div>}
          <Select
            options={this.handleSelect}
            userName={userName}
          />
          <button
            type="button"
            onClick={this.handleClick}
          >
            ADD
          </button>
          {this.state.userError && <div>Choose a user</div>}
          <TodoList
            toggle={this.toggle}
            todoList={todoList}
          />
        </form>
      </div>
    );
  }
}

export default App;
