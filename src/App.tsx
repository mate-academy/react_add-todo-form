import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './TodoList';

import users from './api/users';
import todos from './api/todos';

let preparedTodos = todos.map(
  todo => {
    const user = users.find(person => (
      person.id === todo.userId
    )) || null;

    return { ...todo, user };
  },
);

interface State {
  userId: number;
  title: string;
  validateInput: boolean;
  validateSelect: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    userId: 0,
    title: '',
    validateInput: true,
    validateSelect: true,
  };

  chooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      validateSelect: true,
    });
  };

  inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      validateInput: true,
    });
  };

  validate = (id: number, title: string) => {
    let isValid = true;

    if (!id) {
      isValid = false;

      this.setState({
        validateSelect: false,
      });
    }

    if (!title) {
      isValid = false;

      this.setState({
        validateInput: false,
      });
    }

    return isValid;
  };

  addTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userId, title } = this.state;

    if (!this.validate(userId, title)) {
      return;
    }

    const newTodo = {
      id: Math.max(...preparedTodos.map(item => item.id)) + 1,
      user: users.find(person => person.id === userId) || null,
      userId,
      title,
      completed: false,
    };

    preparedTodos = [...preparedTodos, newTodo];
    this.setState({
      userId: 0,
      title: '',
    });
  };

  render() {
    const {
      userId, title, validateInput, validateSelect,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          action=""
          className="todoForm"
          onSubmit={this.addTodo}
        >
          <label htmlFor="title" className="form-label">
            <input
              id="title"
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              autoComplete="off"
              value={title}
              onChange={this.inputTitle}
            />

            {!validateInput && (
              <p
                className="alert alert-danger"
                role="alert"
              >
                Please enter the title
              </p>
            )}
          </label>

          <label htmlFor="userId" className="form-label">
            <select
              id="userId"
              name="userId"
              className="form-select"
              aria-label="Default select example"
              value={userId}
              onChange={this.chooseUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(person => {
                const { id, name } = person;

                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </select>

            {!validateSelect && (
              <p
                className="alert alert-danger"
                role="alert"
              >
                Please choose a user
              </p>
            )}
          </label>

          <button type="submit" className="btn btn-success button">
            Add
          </button>
        </form>
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
