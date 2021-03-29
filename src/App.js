import React from 'react';
import { TodoList } from './TodoList';

import './App.css';

import fullTodos from './api/todos';
import users from './api/users';

const preparedTodos = fullTodos.map(
  todo => ({
    ...todo,
    user: users.find(({ id }) => id === todo.userId),
  }),
);

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    userId: '',
    hasTitleError: false,
    hasUserIdError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if (name === 'title') {
      this.setState({
        hasTitleError: false,
      });
    }

    if (name === 'userId') {
      this.setState({
        hasUserIdError: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (!title) {
      this.setState({
        hasTitleError: true,
      });
    }

    if (!userId) {
      this.setState({
        hasUserIdError: true,
      });
    }

    if (title && userId) {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          userId: Number(prevState.userId),
          id: prevState.todos.length + 1,
          title: prevState.title,
          completed: false,
          user: users.find(({ id }) => id === Number(prevState.userId)),
        }],
        title: '',
        userId: '',
      }));
    }
  };

  render() {
    const {
      todos,
      title,
      userId,
      hasTitleError,
      hasUserIdError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo</h1>
        {hasTitleError && (
          <p className="App__error">
            <span className="App__error-title">Error: </span>
            Please enter the title
          </p>
        )}
        {hasUserIdError && (
          <p className="App__error">
            <span className="App__error-title">Error: </span>
            Please choose a user
          </p>
        )}
        <form
          onSubmit={this.handleSubmit}
          className="App__form"
        >
          <label>
            Title:
            {' '}
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            User:
            {' '}
            <select
              name="userId"
              placeholder="Choose a user"
              value={userId}
              onChange={this.handleChange}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add</button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
