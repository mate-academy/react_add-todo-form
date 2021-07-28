import React from 'react';
import './App.css';

import { TodoList } from './components/todoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(person => (
    person.id === todo.userId
  )),
}));

export default class App extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleHint: ' ',
    nameHint: ' ',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      titleHint: ' ',
      nameHint: ' ',
    });
  }

  addTodo = () => {
    const { title, userName } = this.state;

    if (title === '') {
      this.setState({
        titleHint: ' Please enter the title ',
      });
    }

    if (userName === '') {
      this.setState({
        nameHint: ' Choose a user ',
      });
    }

    if (title !== '' && userName !== '') {
      preparedTodos.push({
        title,
        completed: false,
        user: users.find(user => user.name === userName),
        id: preparedTodos[preparedTodos.length - 1].id + 1,
      });
    }

    this.forceUpdate();
  }

  render() {
    const { title, userName, titleHint, nameHint } = this.state;

    return (
      <div className="App">
        <h1>List of todos</h1>
        <TodoList todos={preparedTodos} />
        <form onSubmit={(event) => {
          event.preventDefault();
          this.addTodo();
          this.setState({
            title: '',
            userName: '',
          });
        }}
        >
          <input
            type="text"
            name="title"
            className="App__input"
            value={title}
            placeholder="enter the task"
            onChange={this.handleChange}
          />
          <span>{titleHint}</span>
          <select
            name="userName"
            className="App__input"
            onChange={this.handleChange}
            value={userName}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <span>{nameHint}</span>
          <button type="submit">
            Add a Task
          </button>
        </form>
      </div>
    );
  }
}
