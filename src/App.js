import React from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

export class App extends React.PureComponent {
  state = {
    todos: [...todos],
    buttonIsPressedWithEmptyInput: false,
    title: '',
    userId: '',
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (title === '' || userId === '') {
      this.setState({ buttonIsPressedWithEmptyInput: true });

      return;
    }

    const newTodo = {
      userId: +userId,
      id: this.state.todos.length + 1,
      title,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      title: '',
      userId: '',
      buttonIsPressedWithEmptyInput: false,
    }));
  }

  render() {
    const preparedTodos = this.state.todos.map(
      todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }),
    );

    const { buttonIsPressedWithEmptyInput, title, userId } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>

          <form onSubmit={this.handleSubmit}>

            <p>
              <label htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                id="title"
                placeholder="Write title here"
                name="title"
                value={title}
                onChange={this.handleChange('title')}
              />
              {buttonIsPressedWithEmptyInput && title === ''
                ? <span style={{ color: 'red' }}>Please enter a title</span>
                : null
              }
            </p>

            <p>
              <label htmlFor="userId">User:</label>
              <select
                name="userId"
                id="userId"
                value={userId}
                onChange={this.handleChange('userId')}
              >
                <option value="">Choose a user</option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
              {buttonIsPressedWithEmptyInput && userId === ''
                ? <span style={{ color: 'red' }}>Please choose a user</span>
                : null
              }
            </p>

            <button
              type="submit"
            >
              Add
            </button>
          </form>

        </p>
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}
