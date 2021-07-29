import React, { Component } from 'react';
import todos from './api/todos';
import users from './api/users';
import './App.css';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends Component {
  state = {
    allTodos: preparedTodos,
    selectedUserId: '',
    newUser: null,
    title: '',
    userSelectedError: false,
    todoSelected: false,
  }

  addTodo = (event) => {
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

      this.setState(state => (
        {
          allTodos: [...state.allTodos, newTodo],
          selectedUserId: '',
          title: '',
          newUser: null,
          todoSelected: false,
          userSelectedError: false,
        }
      ));
    }

    if (!title) {
      this.setState({
        todoSelected: true,
      });
    }

    if (!newUser) {
      this.setState({
        userSelectedError: true,
      });
    }
  }

  handleUserChange = (event) => {
    const userId = event.target.value;

    this.setState(
      {
        newUser: users.find(user => user.id === +userId),
        selectedUserId: userId,
        userSelectedError: false,
      },
    );
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
      todoSelected: false,
    });
  }

  render() {
    const {
      allTodos,
      selectedUserId,
      title,
      todoSelected,
      userSelectedError,
    } = this.state;

    return (
      <div className="App card">
        <h1 className="title is-primary">
          Add todo form
        </h1>
        <h2 className="subtitle">
          {`Users: ${users.length}`}
        </h2>
        {todoSelected
        && (
          <div className="alert">
            <p>The task title must be filled</p>
          </div>
        )
        }
        {userSelectedError
        && (
          <div className="alert">
            <p>You need to select a user</p>
          </div>
        )
      }
        <form onSubmit={this.addTodo}>
          <input
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
          <select
            value={selectedUserId}
            onChange={this.handleUserChange}
          >
            <option>
              Choose a User
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
            }
          </select>
          <button
            сlassName="button is-light is-grey"
            type="submit"
          >
            Add todo
          </button>
        </form>
        <table>
          <TodoList
            todos={allTodos}
            className="table"
          />
        </table>
      </div>
    );
  }
}

export default App;
