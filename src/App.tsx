import React, { ChangeEvent, FormEvent } from 'react';
import './App.css';

import users from './api/users';
import { Todos } from './types';
import todosFromServer from './api/todos';

interface State {
  todos: Todos[],
  titleTodo: string,
  selectUser: number,
  titleError: boolean,
  selectError: boolean,
}

export class App extends React.Component<{}, State> {
  state = {
    todos: todosFromServer,
    titleTodo: '',
    selectUser: 0,
    titleError: false,
    selectError: false,
  };

  inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      titleTodo: event.target.value,
      titleError: false,
    });
  };

  selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectUser: +event.target.value,
      selectError: false,
    });
  };

  submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { todos, titleTodo, selectUser } = this.state;

    if (!this.state.titleTodo || !this.state.selectUser) {
      return this.showErrors();
    }

    const newTodo = {
      id: todos.length + 1,
      title: titleTodo,
      userId: selectUser,
    };

    return this.setState(state => {
      return {
        todos: [...state.todos, newTodo],
        titleTodo: '',
        selectUser: 0,
        titleError: false,
        selectError: false,
      };
    });
  };

  showErrors = () => {
    this.setState(state => ({
      titleError: !state.titleTodo,
      selectError: !state.selectUser,
    }));
  };

  render() {
    const {
      todos,
      titleTodo,
      selectUser,
      titleError,
      selectError,
    } = this.state;

    // eslint-disable-next-line no-console
    console.log(this.state);

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="form"
          onSubmit={this.submitHandler}
        >
          <div className="form__input-container">
            <label htmlFor="title" className="form__label">
              <input
                className="form__input-field"
                id="title"
                type="text"
                name="title"
                placeholder="Input Title"
                value={titleTodo}
                onChange={this.inputHandler}
              />
              {titleError && <span className="form__input-error">Add what to do</span>}
            </label>
          </div>
          <div className="form__select-container">
            <select
              className="form__select"
              value={selectUser}
              onChange={this.selectHandler}
            >
              <option className="form__select-option" value="0" disabled>Choose User</option>
              {users.map(user => (
                <option className="form__select-option" key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            {selectError && <span className="form__select-error">Choose your slave</span>}
          </div>
          <button type="submit" className="add__button">
            Add
          </button>
        </form>
        <span>Users: </span>
        {todos.map(todo => (
          <div className="user__card">
            <h2 className="user__title">{`Todo Title: ${todo.title}`}</h2>
            <span className="user__id">{`Todo Id: ${todo.id} User Id: ${todo.userId}`}</span>
          </div>
        ))}
      </div>
    );
  }
}
