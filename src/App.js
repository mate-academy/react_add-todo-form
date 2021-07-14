import React from 'react';
import './App.css';
import { TodoList } from './Components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    user: '',
    titleTodo: '',
    isFinishTodo: false,
    validUser: true,
    validTitleTodo: true,
    listTodos: [...todos],
  }

  resetForm = () => (
    this.setState({
      user: '',
      titleTodo: '',
      isFinishTodo: false,
    })
  );

  validForm = () => {
    let response = true;
    const { user, titleTodo } = this.state;

    if (!user) {
      this.setState({ validUser: false });
      response = false;
    }

    if (!titleTodo) {
      this.setState({ validTitleTodo: false });
      response = false;
    }

    return response;
  };

  addNewTodo = (e) => {
    const { user, titleTodo, listTodos, isFinishTodo } = this.state;

    e.preventDefault();

    if (!this.validForm()) {
      return;
    }

    this.setState(state => ({
      listTodos: [...state.listTodos, {
        userId: +user,
        id: (
          listTodos.find(todo => (
            listTodos.every(iterationTodo => (
              iterationTodo.id <= todo.id
            )))).id + 1),
        title: titleTodo,
        completed: isFinishTodo,
      }],
    }));

    this.resetForm();
  };

  handleChange = ({ target }) => {
    if (target.type === 'checkbox') {
      return this.setState({ [target.id]: target.checked });
    }

    let validStateInput;

    if (target.id === 'titleTodo') {
      validStateInput = 'validTitleTodo';
    }

    if (target.id === 'user') {
      validStateInput = 'validUser';
    }

    return this.setState({
      [target.id]: target.value,
      [validStateInput]: true,
    });
  };

  render() {
    const {
      user, titleTodo, listTodos,
      isFinishTodo, validUser, validTitleTodo,
    } = this.state;

    return (
      <div className="App">
        <form className="form--new-Todo">
          <h3>
            Add new todo :)
          </h3>
          <label>
            {validUser
              ? 'Choose a user:'
              : (
                <strong className="form--error">
                  Please choose User!!!
                </strong>
              )}

            <select
              name="user"
              id="user"
              value={user}
              onChange={this.handleChange}
            >
              <option value="">
                Choose a user
              </option>

              {users.map(iterationUser => (
                <option
                  key={iterationUser.id}
                  value={iterationUser.id}
                >
                  {iterationUser.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            {validTitleTodo
              ? 'Title todo:'
              : (
                <strong className="form--error">
                  Please enter title todo!!!
                </strong>
              )}
            <input
              name="titleTodo"
              id="titleTodo"
              placeholder="enter title todo :)"
              value={titleTodo}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Is finish todo:
            <input
              type="checkbox"
              name="isFinishTodo"
              id="isFinishTodo"
              placeholder="enter title todo :)"
              checked={isFinishTodo}
              onChange={this.handleChange}
            />
          </label>

          <button
            type="button"
            onClick={this.addNewTodo}
          >
            Add new todo
          </button>
        </form>

        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList list={listTodos} users={users} />
      </div>
    );
  }
}

export default App;
