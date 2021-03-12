import React from 'react';
import classNames from 'classnames';
import { TodoList } from './TodoList';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todoList: preparedTodos,
    title: '',
    user: '',
    hasErrors: {
      title: false,
      user: false,
    },
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      [name]: value,
      hasErrors: {
        ...state.errors,
        [name]: false,
      },
    }));
  };

  submitHandler = (event) => {
    const { title, user } = this.state;

    event.preventDefault();

    if (title && user) {
      this.setState((prevState) => {
        const newTodo = {
          userId: users.find(person => person.name === prevState.user).id,
          id: prevState.todoList.length + 1,
          title: prevState.title,
          completed: false,
          user: users.find(person => person.name === prevState.user),
        };

        return {
          todoList: [...prevState.todoList, newTodo],
          title: '',
          user: '',
        };
      });
    }

    if (!title) {
      this.setState(state => ({
        hasErrors: {
          ...state.hasErrors,
          title: true,
        },
      }));
    }

    if (!user) {
      this.setState(state => ({
        hasErrors: {
          ...state.hasErrors,
          user: true,
        },
      }));
    }
  }

  render() {
    const { title, user, hasErrors, todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo</h1>
        <form
          onSubmit={this.submitHandler}
        >
          <div className="form__field">
            <label className="form__label" htmlFor="title">
              Add title
            </label>
            <input
              id="title"
              placeholder="title"
              name="title"
              className={classNames(
                'form__input', { invalid: hasErrors.title },
              )}
              value={title}
              onChange={this.changeHandler}
            />
            {hasErrors.title
              && (
              <p className="form__notification">
                Please enter the title
              </p>
              )}
          </div>

          <div className="form__field">
            <span className="form__label">Select user</span>
            <select
              name="user"
              value={user}
              onChange={this.changeHandler}
              className={classNames('form__input', { invalid: hasErrors.user })}
            >
              <option value="">Please choose the user</option>
              {users.map(person => (
                <option key={person.id} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          {hasErrors.user
            && (
            <p className="form__notification">
              Please choose the user
            </p>
            )}
          <button type="submit">
            Add
          </button>
        </form>
        <TodoList todos={todoList} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}

export default App;
