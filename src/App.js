import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './component/TodoList/TodoList';
import { Select } from './component/Select/Select';

const userName = users.map(user => ({
  name: user.name,
  id: user.id,
}));

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
      title: event.target.value,
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
      });
      this.setState(prevState => ({ title: '' }));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form>
          <input
            type="text"
            placeholder="Write your TODO"
            onChange={this.handleChange}
            value={this.state.title}
          />
          {this.state.titleError && (
            <div className="todos__error">Please, enter todos text</div>
          )}
          <Select
            handleSelect={this.handleSelect}
            userName={userName}
          />
          <button
            type="button"
            onClick={this.handleSubmit}
          >
            ADD
          </button>
          {this.state.userError && (
            <div className="todos__error">Please, choose a user</div>
          )}
          <TodoList
            todoList={todoList}
          />
        </form>
      </div>
    );
  }
}

export default App;
