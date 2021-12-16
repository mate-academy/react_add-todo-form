/* eslint-disable no-console */
import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types';
import { TodoList } from './components/TodoList';
import { prepareTodos } from './prepareTodos';

type State = {
  todos: Todo[];
  title: string;
  userId: number;
  isUserSelected: boolean;
  isTitleWritten: boolean;
  tooBigTitle: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos,
    title: '',
    userId: 0,
    isUserSelected: true,
    isTitleWritten: true,
    tooBigTitle: false,
  };

  handleOnSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.validateSumbitData()) {
      return;
    }

    if (this.state.title.length > 60) {
      return;
    }

    this.setState(current => {
      const newTodo:Todo = {
        userId: current.userId,
        title: current.title,
        id: current.todos.length + 1,
        completed: false,
      };

      return {
        todos: [...current.todos, newTodo],
      };
    });

    this.setState({
      title: '',
      userId: 0,
    });
  };

  onChecked = (id:number) => {
    this.setState((st) => {
      const copy = [...st.todos];

      copy[id - 1].completed = !copy[id - 1].completed;

      return { todos: copy };
    });
  };

  validateSumbitData = () => {
    const { title, userId } = this.state;

    this.setState({
      isTitleWritten: title !== '',
      isUserSelected: userId !== 0,
    });

    return title && userId;
  };

  handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.target.value),
      isUserSelected: true,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleLen = event.target.value.length;

    this.setState({
      title: event.target.value,
      isTitleWritten: true,
      tooBigTitle: titleLen > 60,
    });
  };

  render(): React.ReactNode {
    const preparedTodos = prepareTodos(this.state.todos);

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <form className="App__form Form" onSubmit={this.handleOnSubmit}>
          <div className="Form__block-title">
            <div className="Form__err">
              {!this.state.isTitleWritten
                ? 'Please enter the title'
                : this.state.tooBigTitle && `Title length: ${this.state.title.length} of 60`}
            </div>
            <label className="Form__label" htmlFor="form-title">
              Your todo:
              <input
                className="Form__title"
                name="title"
                type="text"
                id="form-title"
                placeholder="type new todo here..."
                value={this.state.title}
                onChange={this.handleChangeTitle}
              />
            </label>

          </div>
          <div className="Form__block-btn">
            <div className="Form__block-user">
              <div className="Form__err">
                {!this.state.isUserSelected && 'Please choose a user'}
              </div>
              <label className="Form__label" htmlFor="form-select">
                Your user:
                <select
                  className="Form__user"
                  name="user"
                  id="form-select"
                  value={this.state.userId}
                  onChange={this.handleChangeUser}
                >
                  <option value={0} disabled>Choose a user</option>
                  {users.map(user => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <button
              className="Form__btn"
              type="submit"
            >
              Create new Todo
            </button>
          </div>
        </form>
        <TodoList todos={preparedTodos} onChecked={this.onChecked} />
      </div>
    );
  }
}

export default App;
