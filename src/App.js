import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import TodoList from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state ={
    todos: preparedTodos,
    todoTitle: '',
    userId: 0,
    errors: {
      todoTitle: false,
      userId: false,
    },
  };

  handleInput = (event) => {
    event.persist();

    this.setState(state => ({
      todoTitle: event.target.value.toLowerCase().replace(/[^A-Za-z0-9 ]/g, ''),
      errors: {
        ...state.errors,
        todoTitle: false,
      },
    }));
  };

  handleSelect = (event) => {
    event.persist();

    this.setState(state => ({
      userId: +event.target.value,
      errors: {
        ...state.errors,
        userId: false,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { todoTitle, userId } = this.state;

    if (!todoTitle || !userId) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          todoTitle: !state.todoTitle,
          userId: !state.userId,
        },
      }));

      return;
    }

    this.setState((prevState) => {
      const newTodo = {
        userId: this.state.userId,
        id: this.state.todos.length + 1,
        title: prevState.todoTitle,
        completed: false,
        user: users.find(user => user.id === this.state.userId),
      };

      return ({
        todos: [...prevState.todos, newTodo],
        todoTitle: '',
        userId: 0,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>List of todos</h1>
        <p className="App__sum">
          <span>Todos: </span>
          {this.state.todos.length}
        </p>

        <p className="App__sum">
          <span>Users: </span>
          {users.length}
        </p>

        <form
          action="#"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="todoTitle">Create new todo:</label>

            {this.state.errors.todoTitle && (
              <span className="error">
                Please enter todo
              </span>
            )}

            <input
              type="text"
              className={this.state.errors.todoTitle
                ? 'invalid'
                : ''}
              name="todoTitle"
              value={this.state.todoTitle}
              onChange={this.handleInput}
              id="todoTitle"
              placeholder="Please enter a new task"
            />

          </div>

          <div className="form__field">
            {this.state.errors.userId && (
              <span className="error">
                Please choose an executor
              </span>
            )}

            <select
              name="userId"
              id="userId"
              value={this.state.userId}
              onChange={this.handleSelect}
            >
              <option>Please choose an executor</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">
            Add new todo
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
