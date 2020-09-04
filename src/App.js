import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { Select } from './components/Select/Select';

import users from './api/users';
import todos from './api/todos';

const todoList = [...todos];

class App extends React.Component {
  state = {
    title: '',
    name: '',
    userId: 0,
    titleError: false,
    userError: false,
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value.trimStart(),
      titleError: false,
    });
  }

  handleSelect = (event) => {
    this.setState({
      userId: event.target.value,
      userError: false,
    });
  }

  handleSubmit = () => {
    const { title, userId, name } = this.state;

    if (title.length < 1) {
      this.setState(prevState => ({ titleError: true }));
    }

    if (userId === 0) {
      this.setState(prevState => ({ userError: true }));
    }

    if (title.length >= 1 && this.state.userId !== 0) {
      todoList.push({
        title,
        name,
        userId,
        completed: false,
        id: todoList.length + 1,
      });
      this.setState(prevState => ({ title: '' }));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Todo form</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
        }}
        >
          <label htmlFor="todo">TODO:</label>
          <input
            id="todo"
            placeholder="Enter your todo"
            onChange={this.handleChange}
            value={this.state.title}
          />
          {this.state.titleError && (
            <div className="todos__error">Please, enter todos text</div>
          )}
          <Select users={users} handleSelect={this.handleSelect} />
          <button
            type="button"
            onClick={this.handleSubmit}
          >
            ADD
          </button>
          {this.state.userError && (
            <div className="todos__error">Please, choose a user</div>
          )}
        </form>
        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
