import React from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

import users from './api/users';

class App extends React.Component {
  state = {
    userName: '',
    todo: '',
    todos: [],
    userSelected: false,
    todoSelected: false,
  }

  addTodo = (event) => {
    event.preventDefault();

    this.setState(state => ({
      userSelected: !state.userName,
      todoSelected: !state.todo,
    }));

    if (!this.state.userName) {
      return;
    }

    if (!this.state.todo) {
      return;
    }

    this.setState(state => ({
      todos: [...state.todos, {
        name: state.userName,
        todo: state.todo,
        userId: users.find(user => user.name === state.userName).id,
        id: state.todos.length + 1,
      }],
      userName: '',
      todo: '',
    }));
  }

  handleUserChange = (event) => {
    this.setState({
      userSelected: false,
      userName: event.target.value,
    });
  }

  handleTodoChange = (event) => {
    this.setState({
      todoSelected: false,
      todo: event.target.value,
    });
  }

  render() {
    const { todo, userName, todos, userSelected, todoSelected } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.addTodo}>
          <label>
            <input
              type="text"
              name="todos"
              placeholder="Add todo"
              value={todo}
              onChange={this.handleTodoChange}
            />
          </label>
          {todoSelected
            && <span className="error">Please enter the title</span>}
          <br />
          <select
            name="user"
            value={userName}
            onChange={this.handleUserChange}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userSelected
            && <span className="error">Please choose a user</span>}
          <br />
          <button type="submit">Add</button>
        </form>
        <TodoList usersTodos={todos} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}

export default App;
