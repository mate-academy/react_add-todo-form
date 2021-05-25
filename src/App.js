import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

function findUser(usersList, id) {
  return (
    usersList.find(user => user.id === id)
  );
}

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: findUser(users, todo.userId),
  }
));

class App extends React.PureComponent {
  state = {
    currentTodosList: preparedTodos,
    maxTitleLength: 15,
    title: '',
    user: '',
    titleError: false,
    userError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title || !this.state.user) {
      if (!this.state.title) {
        this.setState({ titleError: true });
      }

      if (!this.state.user) {
        this.setState({ userError: true });
      }

      return;
    }

    this.setState((state) => {
      const newTodo = {
        userId: +state.user,
        id: uuidv4(),
        title: state.title,
        completed: false,
        user: findUser(users, +state.user),
      };

      return {
        currentTodosList: [
          ...state.currentTodosList,
          newTodo,
        ],
        title: '',
        user: '',
        titleError: false,
        userError: false,
      };
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { title, maxTitleLength } = this.state;

    if (name === 'title' && title.length === maxTitleLength) {
      // eslint-disable-next-line
      alert('You already entered maximum length of title');

      return;
    }

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  render() {
    const {
      currentTodosList,
      title,
      user,
    } = this.state;

    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__input-wrapper">
            <label className="form__label" htmlFor="title">
              Title of new Todo
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter the title of Todo"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            {this.state.titleError && (
              <span className="form__error">
                Please enter the title
              </span>
            )}
          </div>

          <div className="form__input-wrapper">
            <label className="form__label" htmlFor="title">
              Users list
            </label>

            <select
              id="usersList"
              name="user"
              value={user}
              onChange={this.handleChange}
            >
              <option value="">
                Choose the user
              </option>

              {users.map(({ id, name }) => (
                <option key={id} value={id}>
                  {`${name}`}
                </option>
              ))}
            </select>
            {this.state.userError && (
              <span className="form__error">
                Please choose a user
              </span>
            )}
          </div>

          <button type="submit">
            Add ToDo
          </button>
        </form>

        <div className="todosList">
          <h2>List of todos</h2>

          <p>
            <span>Todos: </span>
            {currentTodosList.length}
          </p>

          <p>
            <span>Users: </span>
            {users.length}
          </p>

          <TodoList todos={currentTodosList} />
        </div>
      </div>
    );
  }
}

export default App;
