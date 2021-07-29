import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map((todo) => {
  const copyTodo = { ...todo };

  copyTodo.user = users.find(person => person.id === todo.userId);

  return copyTodo;
});

export class App extends React.Component {
  state = {
    allTodos: preparedTodos,
    title: '',
    name: '',
    isTitle: false,
    isName: false,
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const { title, isTitle } = this.state;

    this.setState({
      [name]: type === 'checkbox'
        ? checked
        : value,
    });

    if (title || isTitle === true) {
      this.setState({ isTitle: false });
    }
  }

  addTodo = (event) => {
    event.preventDefault();

    const { title, name, allTodos } = this.state;

    if (title.trim() && name.trim()) {
      const newTodo = {
        title,
        user: { name },
        id: allTodos.length + 1,
      };

      this.setState(state => ({
        allTodos: [...allTodos, newTodo],
        title: '',
        name: '',
        isTitle: false,
        isName: false,
      }));
    }

    if (!title.trim()) {
      this.setState({
        isTitle: true,
      });
    }

    if (!name.trim()) {
      this.setState({
        isName: true,
      });
    }
  }

  render() {
    const { allTodos, title, name, isTitle, isName } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add ToDo form</h1>
        <form className="App__form" onSubmit={this.addTodo}>
          {isTitle
          && (
            <span style={{ color: 'red' }}>Write your ToDo:</span>
          )}
          <input
            type="text"
            name="title"
            placeholder="What u wanna ToDo?"
            value={title}
            onChange={this.handleChange}
            className="form-control"
          />
          {isName
            && (
              <span style={{ color: 'red' }}>Select SomeOne: </span>
            )}
          <select
            name="name"
            value={name}
            onChange={this.handleChange}
            className="form-select form-select-lg mb-3"
          >
            <option value="">
              Choose user
            </option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-success">
            Add Todo
          </button>
        </form>
        <TodoList todos={allTodos} />
      </div>
    );
  }
}
