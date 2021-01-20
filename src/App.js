import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: preparedTodos,
    title: '',
    user: '',
  };

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  addTodo = (event) => {
    event.preventDefault();

    if (this.state.title && this.state.user) {
      const newTodo = {
        id: Math.random() * 1000,
        title: this.state.title,
        completed: false,
        user: {
          name: this.state.user,
        },
      };

      this.setState(state => ({
        todos: [
          ...state.todos,
          newTodo,
        ],
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form>
          <input
            type="text"
            name="title"
            className="input"
            value={this.state.title}
            onChange={this.handleInput}
            placeholder="Title"
          />
          <select
            value={this.state.user}
            name="user"
            className="input"
            onChange={this.handleInput}
          >
            <option value="">
              Chose a user
            </option>
            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="button"
            onClick={this.addTodo}
          >
            Add new Todo!
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
