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
    todosToShow: preparedTodos,
    title: '',
    userName: '',
    titleErrorMessage: ' ',
    nameErrorMessage: ' ',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      titleErrorMessage: ' ',
      nameErrorMessage: ' ',
    });
  }

  addTodo = () => {
    const { title, userName } = this.state;

    if (title === '') {
      this.setState({
        titleErrorMessage: ' Please enter the title ',
      });
    }

    if (userName === '') {
      this.setState({
        nameErrorMessage: ' Choose a user ',
      });
    }

    if (title !== '' && userName !== '') {
      this.setState(state => (
        { todosToShow: [...state.todosToShow, {
          title,
          completed: false,
          user: users.find(user => user.name === userName),
          id: preparedTodos[preparedTodos.length - 1].id + 1,
        }] }));
    }
  }

  render() {
    const { todosToShow, title, userName,
      titleErrorMessage, nameErrorMessage } = this.state;

    return (
      <div className="App">
        <h1>List of todos</h1>
        <TodoList todos={todosToShow} />
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
          <span>{titleErrorMessage}</span>
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
          <span>{nameErrorMessage}</span>
          <button type="submit">
            Add a Task
          </button>
        </form>
      </div>
    );
  }
}
