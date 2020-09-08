import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(task => ({
  ...task,
  user: { ...users.find(user => user.id === task.userId) },
}));

export class App extends React.Component {
  state = {
    username: '',
    todo: '',
    usernameError: '',
    todoError: '',
  };

  addTodo = () => {
    const { username, todo } = this.state;

    preparedTodos.push({
      title: todo,
      completed: false,
      id: preparedTodos.length + 1,
      user: {
        name: username,
      },
    });

    this.setState({
      username: '',
      todo: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.username
      ? this.setState({
        usernameError: '',
      })
      : this.setState({
        usernameError: 'You should select name',
      });

    this.state.todo
      ? this.setState({
        todoError: '',
      })
      : this.setState({
        todoError: 'You should input your task',
      });

    this.state.todo
      && this.state.username
      && this.addTodo();
  }

  render() {
    return (
      <div className="App">
        <h1>Todo app</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <select
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
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
          <p className="form__error">{this.state.usernameError}</p>

          <input
            type="text"
            name="todo"
            placeholder="What to do?"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <p className="form__error">{this.state.todoError}</p>

          <button type="submit">Add todo</button>
        </form>
        <TodoList list={preparedTodos} />
      </div>
    );
  }
}

export default App;
