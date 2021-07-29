import React, { Component } from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
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

    if (title.trim() && newUser) {
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

    if (!title.trim()) {
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
      <div className="App">
        <h1>
          Add todo form
        </h1>
        <h2>
          {`Users: ${users.length}`}
        </h2>

        <form onSubmit={this.addTodo}>
          {todoSelected
            && (
              <div>
                <p>Please fill in the title field</p>
              </div>
            )
          }
          <input
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />

          {userSelectedError
            && (
              <div>
                <p>Please fill in the User field</p>
              </div>
            )
          }
          <select
            value={selectedUserId}
            onChange={this.handleUserChange}
            className="select"
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
          <button type="submit">
            Add todo
          </button>
        </form>
        <TodoList todos={allTodos} />
      </div>
    );
  }
}
export default App;
