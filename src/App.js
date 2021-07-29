import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    userId: '',
    id: todos.length + 1,
    title: '',
    completed: false,
    todos: [...todos],
    userSelectedError: false,
    todoSelected: false,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    if (name === 'userId') {
      this.setState({
        [name]: +value,
        userSelectedError: true,
      });
    } else {
      this.setState({
        [name]: value,
        todoSelected: true,
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  addTask = () => {
    const {
      id,
      title,
      completed,
      userId,
    } = this.state;

    if (title !== '' && userId !== '') {
      this.state.todos.push({
        userId,
        id,
        title,
        completed,
      });

      this.setState(state => ({
        id: state.id + 1,
        userId: '',
        title: '',
        todoSelected: !state.todoSelected,
        userSelectedError: !state.userSelectedError,
      }));
    }
  }

  usersWithTodos = () => (users.map(user => ({
    ...user,
    todos: this.state.todos.filter(todo => todo.userId === user.id),
  })))

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.onSubmit} className="App__form">
          <label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={this.state.title}
              required
              onChange={this.onChange}
            />
            {this.state.todoSelected
            || (
              <div>
                <span className="is-size-6">Please enter the title</span>
              </div>
            )
          }
          </label>

          <label>
            <select
              name="userId"
              value={this.state.userId}
              onChange={this.onChange}
              required
            >
              <option value="0">
                Choose user
              </option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {this.state.userSelectedError
            || (
              <div>
                <span className="is-size-6">Please choose a user</span>
              </div>
            )
          }
          </label>

          <button
            type="submit"
            className="button is-primary"
            onClick={this.addTask}
          >
            Add
          </button>
        </form>
        <TodoList usersWithTodos={this.usersWithTodos()} />
      </div>
    );
  }
}

export default App;
