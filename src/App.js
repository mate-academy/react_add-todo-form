import React from 'react';
import './App.css';

import { TodoList } from './TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    input: '',
    selectedUser: '',
    todos: preparedTodos,
    showInputError: false,
    showUserError: false,
  }

  changeHandler = (event) => {
    const { name } = event.target;
    const errorType = name === 'input' ? 'showInputError' : 'showUserError';

    this.setState({
      [name]: event.target.value,
      [errorType]: false,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { input, selectedUser } = event.target.elements;

    if (this.state.input.trim() === '') {
      this.setState(
        {
          input: '',
          showInputError: true,
        },
      );

      return;
    }

    this.setState(
      {
        showInputError: false,
      },
    );

    if (this.state.selectedUser === '') {
      this.setState(
        {
          showUserError: true,
        },
      );

      return;
    }

    const addedTodo = {
      id: this.state.todos[this.state.todos.length - 1].id + 1,
      title: input.value,
      completed: false,
      user: {
        name: selectedUser.value,
      },
    };

    this.setState(state => ({
      input: '',
      selectedUser: '',
      showUserError: false,
      todos: [...state.todos, addedTodo],
    }));
  }

  render() {
    return (
      <div className="App">
        <form
          action="./api/todo.js"
          method="POST"
          onSubmit={this.submitHandler}
        >
          <label
            htmlFor="todo-imput"
            className="App__label"
          >
            ToDo

            <input
              type="text"
              id="todo-imput"
              value={this.state.input}
              name="input"
              placeholder="ToDo"
              onChange={this.changeHandler}
              required
            />

            {this.state.showInputError
              && <div className="App__error">Please enter the title</div>}
          </label>

          <label
            htmlFor="todo-user"
            className="App__label"
          >
            User
            <select
              name="selectedUser"
              id="todo-user"
              value={this.state.selectedUser}
              onChange={this.changeHandler}
            >
              <option value="">Select User</option>
              {users.map(user => <option key={user.id}>{user.name}</option>)}
            </select>

            {this.state.showUserError
              && <div className="App__error">Please choose a user</div>}
          </label>
          <button type="submit">Add</button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
