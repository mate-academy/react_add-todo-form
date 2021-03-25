import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: usersFromApi.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    user: '',
    hasErrors: {
      title: false,
      user: false,
    },
  }

  changeValue = (event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      [name]: value,
      hasErrors: {
        ...prevState.hasErrors,
        [name]: false,
      },
    }));
  }

  submitTodo = (event) => {
    const { title, user } = this.state;

    event.preventDefault();

    if (title && user) {
      this.setState((prevState) => {
        const newTodo = {
          title: prevState.title,
          userId: usersFromApi
            .find(person => person.name === prevState.user).id,
          user: usersFromApi
            .find(person => person.name === prevState.user),
          id: prevState.todos.length + 1,
          completed: false,
        };

        return ({
          todos: [...prevState.todos, newTodo],
          user: '',
          title: '',
        });
      });
    }

    if (!title) {
      this.setState(prevState => ({
        hasErrors: {
          ...prevState.hasErrors,
          title: true,
        },
      }));
    }

    if (!user) {
      this.setState(prevState => ({
        hasErrors: {
          ...prevState.hasErrors,
          user: true,
        },
      }));
    }
  }

  render() {
    const { todos } = this.state;
    const { title, user, hasErrors } = this.state;

    return (
      <div className="todo">
        <h1>Add todo form</h1>

        <form
          className="form"
          onSubmit={this.submitTodo}
        >

          <div className="form__field">
            {hasErrors.title && (
              <p className="error-text">
                Please choose a user
              </p>
            )}

            <label htmlFor="title">
              Enter title
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.changeValue}
                id="title"
                className="todo__input"
                placeholder="Enter title"
              />
            </label>
          </div>

          <div className="form__field">
            {hasErrors.user && (
              <p className="error-text">
                Please choose a user
              </p>
            )}

            <label htmlFor="new-user">
              Select user
              <select
                name="user"
                id="new-user"
                className="todo__select"
                value={user}
                onChange={this.changeValue}
              >
                <option value="">Please choose a user</option>
                {usersFromApi.map(person => (
                  <option
                    value={person.name}
                    key={person.id}
                  >
                    {person.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
