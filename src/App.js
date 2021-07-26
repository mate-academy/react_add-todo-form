import React from 'react';
import classNames from 'classnames';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/ListOfTodos';

class App extends React.Component {
  state = {
    userId: '',
    id: todos.length + 1,
    title: '',
    completed: false,
    todos: [...todos],
  }

  onChange = (event) => {
    const { name, value } = event.target;

    if (name === 'userId') {
      this.setState({
        [name]: +value,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  addTodo = () => {
    const { id, title, completed, userId } = this.state;

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

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form onSubmit={(event) => {
          event.preventDefault();
        }}
        >

          <label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={this.state.title}
              required
              onChange={this.onChange}
            />

            <div className={classNames(this.state.title
              ? 'titleEntered'
              : 'titleNotEntered')}
            >
              Please enter the title
            </div>
          </label>

          <label>
            <select
              name="userId"
              value={this.state.userId}
              onChange={this.onChange}
              required
            >
              <option value="" disabled>
                Choose a user
              </option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <div className={classNames(this.state.userId
              ? 'userSelected'
              : 'userNotSelected')}
            >
              Please, select a user
            </div>
          </label>

          <button
            type="submit"
            onClick={this.addTodo}
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
