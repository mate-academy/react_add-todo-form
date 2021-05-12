import React from 'react';
import { TodoList } from './TodoList';

import './App.css';

import initTodos from './api/todos';
import initUsers from './api/users';

const preparedTodos = initTodos.map(todo => (
  {
    ...todo,
    user: initUsers.find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    user: '',
    title: '',
    hasErrors: {
      userError: false,
      titleError: false,
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      [name]: value,
      hasErrors: {
        ...state.hasErrors,
        [name]: false,
      },
    }));
  }

  submitTodo = (event) => {
    event.preventDefault();

    const { user, title } = this.state;

    if (title && user) {
      this.setState((state) => {
        const newTodo = {
          title: state.title,
          userId: initUsers
            .find(person => person.name === state.user).id,
          user: initUsers
            .find(person => person.name === state.user),
          id: state.todos.length + 1,
        };

        return ({
          todos: [...state.todos, newTodo],
          user: '',
          title: '',
          hasErrors: {
            userError: false,
            titleError: false,
          },
        });
      });
    }

    if (!user) {
      this.setState(state => ({
        hasErrors: {
          ...state.hasErrors,
          userError: true,
        },
      }));
    }

    if (!title) {
      this.setState(state => ({
        hasErrors: {
          ...state.hasErrors,
          titleError: true,
        },
      }));
    }
  }

  render() {
    const { todos, user, title } = this.state;
    const { titleError, userError } = this.state.hasErrors;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {todos.length}
        </p>

        <form onSubmit={this.submitTodo}>
          <div>
            <label htmlFor="title">
              Enter title
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
              />
            </label>
            {titleError && (
              <div>
                Please enter the title
              </div>
            )}
          </div>
          <div>
            <label htmlFor="user">
              Select User
              <select
                type="text"
                name="user"
                value={user}
                onChange={this.handleChange}
              >
                <option value="">
                  Choose a user
                </option>
                {initUsers.map(person => (
                  <option
                    value={person.name}
                    key={person.id}
                  >
                    {person.name}
                  </option>
                ))}
              </select>
            </label>
            {userError && (
              <div>
                Please select a user
              </div>
            )}
          </div>
          <button
            type="submit"
          >
            click
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
