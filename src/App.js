import React from 'react';
import './App.css';
import { TodoList } from './components/Todolist/Todolist';

import users from './api/users';
import todos from './api/todos';

const todoWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    todos: todoWithUsers,
    hasSelected: false,
    hasInput: false,
    selectedId: '',
    title: '',
    newUser: null,
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
      hasInput: false,
    });
  }

  handleSelected = (event) => {
    this.setState({
      newUser: users.find(user => user.id === +event.target.value),
      selectedId: event.target.value,
      hasSelected: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, newUser } = this.state;

    if (title && newUser) {
      const newTodo = {
        user: newUser,
        userId: newUser.id,
        id: title,
        title,
        completed: false,
      };

      this.setState(state => ({
        todos: [...state.todos, newTodo],
        hasSelected: false,
        hasInput: false,
        selectedId: '',
        title: '',
        newUser: null,
      }));
    }

    if (!title) {
      this.setState({
        hasInput: true,
      });
    }

    if (!newUser) {
      this.setState({
        hasSelected: true,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        {this.state.hasInput
        && (
          <div>
            <h3>error</h3>
            <p>Please enter the title</p>
          </div>
        )
        }
        {this.state.hasSelected
        && (
          <div>
            <h3>error</h3>
            <p>Please choose a user</p>
          </div>
        )
        }
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <select
            value={this.state.selectedId}
            onChange={this.handleSelected}
          >
            <option>
              Choice user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">
            Submit
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
