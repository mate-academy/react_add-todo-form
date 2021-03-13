import React from 'react';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

import users from './api/users';
import initialTodos from './api/todos';

const todos = initialTodos.map((todo) => {
  const todoCopy = Object.assign({}, todo);

  todoCopy.user = findUser(todoCopy.userId);

  return todoCopy;
});

function findUser(id) {
  return users.find(user => user.id === id);
}

function addTodo(title, userId) {
  const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

  const todo = {
    userId,
    id: newTodoId,
    title,
    completed: false,
    user: findUser(userId),
  };

  todos.push(todo);
}

class App extends React.Component {
  state = {
    title: '',
    isTitleCorrect: true,
    userId: '',
    isUserIdCorrect: true,
  };

  handleChange = (event) => {
    let { value } = event.target;
    const { name } = event.target;

    if (name === 'title') {
      value = value.replace(/[^A-Za-z0-9 ]/g, '');
    }

    this.setState({
      [name]: value,
      [`is${name[0].toUpperCase() + name.slice(1)}Correct`]: true, // :)
    });
  }

  formSubmitHandler = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;

    let isDataCorrect = true;

    if (title.trim().length === 0) {
      this.setState({ isTitleCorrect: false });
      isDataCorrect = false;
    }

    if (userId.length === 0) {
      this.setState({ isUserIdCorrect: false });
      isDataCorrect = false;
    }

    if (isDataCorrect) {
      addTodo(title, Number(userId));
      this.clearForm();
    }
  }

  clearForm = () => {
    this.setState({
      title: '',
      userId: '',
    });
  }

  render() {
    const { title, userId, isTitleCorrect, isUserIdCorrect } = this.state;

    return (
      <div className="App">

        <h1 className="header">
          Add todo form
        </h1>

        { !isTitleCorrect && (
          <ErrorMessage
            title="Wrong title"
            message="Please enter the title."
          />
        )}

        { !isUserIdCorrect && (
          <ErrorMessage
            title="Wrong user"
            message="Please choose a user."
          />
        )}

        <form>
          <label htmlFor="title" className="label">
            <span className="label__text">Title:</span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Your todo"
              value={title}
              onChange={this.handleChange}
              className="input"
            />
          </label>

          <br />

          <label htmlFor="user" className="label">
            <span className="label__text">User:</span>
            <select
              name="userId"
              id="user"
              value={userId}
              onChange={this.handleChange}
              className="input"
            >
              <option
                value=""
              >
                Choose user
              </option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            onClick={this.formSubmitHandler}
            className="button"
          >
            Add todo!
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
