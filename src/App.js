import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId),
  }),
);

class App extends Component {
  state = {
    initialTodos: preparedTodos,
    id: todos.length + 1,
    userId: '',
    title: '',
    completed: false,
    isTitleValid: true,
    isUserValid: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [name === 'title' ? 'isTitleValid' : 'isUserValid']: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      id,
      userId,
      title,
      completed,
    } = this.state;

    if (!userId) {
      this.setState({ isUserValid: false });
    }

    if (!title) {
      this.setState({ isTitleValid: false });
    }

    if (userId.length > 0 && title.length > 0) {
      const newTodo = {
        id,
        userId,
        title,
        completed,
        user: users.find(person => person.id === Number(userId)),
      };

      this.setState(state => ({
        initialTodos: [...state.initialTodos, newTodo],
        userId: '',
        title: '',
        id: state.id + 1,
        isTitleValid: true,
        isUserValid: true,
      }));
    }
  }

  render() {
    const {
      initialTodos,
      userId, title,
      isTitleValid,
      isUserValid,
    } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__label">
            <span><strong>Add Your Todo:</strong></span>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Title"
              value={title}
              className="form__input"
            />
            <span className="form__warn">
              {isTitleValid || ' Please, enter a title'}
            </span>
          </label>

          <label className="form__label">
            <span><strong>Choose a user:</strong></span>
            <select
              onChange={handleChange}
              name="userId"
              value={userId}
              className="form__input"
            >
              <option value="">
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
            <span className="form__warn">
              {isUserValid || ' Please, choose a user'}
            </span>
          </label>

          <button className="form__button" type="submit">Add</button>
        </form>
        <TodoList todos={initialTodos} />
      </div>
    );
  }
}

export default App;
