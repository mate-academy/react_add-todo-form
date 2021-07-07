import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { Select } from './components/Select/Select';

const userNames = users.map(user => ({
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
      userId: Number(value),
      userError: false,
    });
  }

  handleClick = () => {
    const { todo, name, userId } = this.state;

    if (todo.trim().length === 0) {
      this.setState({
        todoTextError: true,
      });
    }

    if (userId === 0) {
      this.setState({
        userError: true,
      });
    }

    if (todo.trim().length !== 0 && userId !== 0) {
      todoList.push({
        title: todo,
        name,
        userId,
        completed: false,
      });
      this.setState({
        todo: '',
      });
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
            userNames={userNames}
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
