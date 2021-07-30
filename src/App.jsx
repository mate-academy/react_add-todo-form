import React, { PureComponent } from 'react';
import { TodoList } from './components/TodoList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import todos from './api/todos';
import users from './api/users';

export const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }),
);

export const preparedUsers = users.map(user => (
  <option
    key={user.id}
    value={user.id}
  >
    {user.name}
  </option>
));

export default class App extends PureComponent {
  state = {
    selectedTodos: preparedTodos,
    selectedUserId: 0,
    textInput: '',
    isUserEmptyError: false,
    isTextEmptyError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addTodo = (todo) => {
    this.setState(state => ({
      selectedTodos: [...state.selectedTodos, todo],
    }));
  }

  inputReset = () => {
    this.setState({
      textInput: '',
      selectedUserId: 0,
      isUserEmptyError: false,
      isTextEmptyError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { textInput, selectedUserId } = this.state;

    if (textInput === '') {
      this.setState({
        isTextEmptyError: true,
      });

      return;
    }

    if (selectedUserId === 0) {
      this.setState({
        isUserEmptyError: true,
      });

      return;
    }

    const newTodo = {
      userId: +selectedUserId,
      id: this.state.selectedTodos.length + 1,
      title: textInput,
      user: users.find(person => person.id === this.state.selectedUserId),
      completed: false,
    };

    this.addTodo(newTodo);
    this.inputReset();
  }

  render() {
    const {
      selectedTodos,
      textInput,
      selectedUserId,
      isTextEmptyError,
      isUserEmptyError,
    } = this.state;

    return (
      <div className="App container">
        <div>
          <form
            onSubmit={this.handleSubmit}
          >
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon1"
                >
                  Add
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="input new todo"
                name="textInput"
                value={textInput}
                onChange={this.handleChange}
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <select
                name={selectedUserId}
                value={selectedUserId}
                onChange={(event) => {
                  this.setState({ selectedUserId: Number(event.target.value) });
                }}
                className="custom-select"
              >
                <option value="0">
                  Choose a user
                </option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {isTextEmptyError && textInput === ''
                ? (
                  <span className="alert alert-primary">
                    Please enter the title
                  </span>
                )
                : null
              }
              {isUserEmptyError && selectedUserId === 0
                ? (
                  <span className="alert alert-secondary">
                    Please choose a user
                  </span>
                )
                : null
              }
            </div>

          </form>
          <TodoList tasks={selectedTodos} />
        </div>
        <div className="card">
          <div className="card-body">
            <p className="text-uppercase">Todos statistics</p>
            <p>
              <p>
                Todos quantity:
                {' '}
                <span>
                  {selectedTodos.length}
                </span>
              </p>

            </p>
            <p>
              <p>
                Users quantity:
                {' '}
                <span className="badge bg-secondary">
                  {users.length}
                </span>
              </p>
            </p>
          </div>

        </div>
      </div>
    );
  }
}
