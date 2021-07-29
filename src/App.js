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
    toDos: preparedTodos,
    title: '',
    userName: '',
    isTitleValid: false,
    isNameValid: false,
  }

  handleChangeInput = (event) => {
    const { title, isTitleValid } = this.state;

    this.setState({
      title: event.target.value,
    });

    if (title || isTitleValid) {
      this.setState({ isTitleValid: false });
    }
  }

  handleChangeSelect = (event) => {
    const { userName, isNameValid } = this.state;

    this.setState(({
      userName: event.target.value,
    }));

    if (userName || isNameValid) {
      this.setState({ isNameValid: false });
    }
  }

  addTodo = (event) => {
    event.preventDefault();

    const { title, userName, toDos } = this.state;

    if (title.trim() && userName.trim()) {
      const newTodo = {
        title,
        user: { name: userName },
        id: toDos.length + 1,
      };

      this.setState(state => ({
        toDos: [...toDos, newTodo],
        title: '',
        userName: '',
        isTitleValid: false,
        isNameValid: false,
      }));
    }

    if (!title.trim()) {
      this.setState({
        isTitleValid: true,
      });
    }

    if (!userName.trim()) {
      this.setState({
        isNameValid: true,
      });
    }
  }

  render() {
    const { toDos, title, userName, isTitleValid, isNameValid } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add ToDo form</h1>
        <form className="App__form" onSubmit={this.addTodo}>
          {isTitleValid
          && (
            <span style={{ color: 'red' }}>Write your ToDo:</span>
          )}
          <input
            type="text"
            name="title"
            placeholder="What u wanna ToDo?"
            value={title}
            onChange={this.handleChangeInput}
            className="form-control"
          />
          {isNameValid
            && (
              <span style={{ color: 'red' }}>Select SomeOne: </span>
            )}
          <select
            name="userName"
            value={userName}
            onChange={this.handleChangeSelect}
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
        <TodoList todos={toDos} />
      </div>
    );
  }
}
