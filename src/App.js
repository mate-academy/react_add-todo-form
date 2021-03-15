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
    todoList: preparedTodos,
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

  handleSelect = (event) => {
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
    const { hasInput, hasSelected, title, selectedId, todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        {hasInput
        && (
          <div>
            <h3>error</h3>
            <p>Please enter the title</p>
          </div>
        )
        }
        {hasSelected
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
            value={selectedId}
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
        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
