import React from 'react';
import './App.css';
import { TodoList } from './components/Todolist/Todolist';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    hasTitle: false,
    selectedUserId: '',
    title: '',
    selectedUser: null,
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSelect = (event) => {
    this.setState({
      selectedUser: users.find(user => user.id === +event.target.value),
      selectedUserId: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, selectedUser } = this.state;

    if (title && selectedUser) {
      const newTodo = {
        user: selectedUser,
        userId: selectedUser.id,
        id: title,
        title,
        completed: false,
      };

      this.setState(state => ({
        todos: [...state.todos, newTodo],
        hasTitle: false,
        selectedUserId: '',
        title: '',
        selectedUser: null,
      }));
    }

    if (!title) {
      this.setState({
        hasTitle: true,
      });
    }

    if (!selectedUser) {
      this.setState({
        hasTitle: true,
      });
    }
  }

  render() {
    const {
      hasTitle,
      title,
      selectedUserId,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        {hasTitle
        && (
          <div>
            <h3>error</h3>
            <p>Please enter the title</p>
          </div>
        )
        }
        {hasTitle
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
            value={title}
            onChange={this.handleChange}
          />
          <select
            value={selectedUserId}
            onChange={this.handleSelect}
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
