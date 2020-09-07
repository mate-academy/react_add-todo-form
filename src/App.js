import React from 'react';
import { TodoList } from './TodoList';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(item => ({
  ...item,
  user: users.find(user => user.id === item.userId),
}));

class App extends React.Component {
  state = {
    todos: [
      ...preparedTodos,
    ],
    title: '',
    userName: '',
    userChoosedError: false,
    titleEnteredError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trimLeft(),
      userChoosedError: false,
      titleEnteredError: false,
    });
  }

  makeTodo = () => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          title: state.title,
          completed: false,
          user: users.find(user => user.name === state.userName),
        },
      ],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title) {
      this.setState({
        titleEnteredError: true,
      });

      return;
    }

    if (!this.state.userName) {
      this.setState({
        userChoosedError: true,
      });

      return;
    }

    this.makeTodo();
    this.setState({
      title: '',
      userName: '',
    });
  }

  render() {
    return (
      <>
        <div className="App">
          <h1 className="title">Static list of todos</h1>
          <form
            className="form"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />

            <p hidden={!this.state.titleEnteredError}>Please enter the title</p>

            <select
              className="form__item"
              name="userName"
              value={this.state.userName}
              onChange={this.handleChange}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <p hidden={!this.state.userChoosedError}>Please choose a user</p>

            <button
              className="form__item"
              type="submit"
            >
              Add
            </button>
          </form>
          <TodoList list={this.state.todos} />
        </div>
      </>
    );
  }
}

export default App;
