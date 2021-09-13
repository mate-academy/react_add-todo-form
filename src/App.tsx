import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos: PreparedTodo[] = [...todosFromServer].map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId) || null;
  const preparedTodo = { ...todo, user };

  return preparedTodo;
});

interface State {
  userId: number;
  title: string;
  updatedTodos: Todo[];
  titleError: string;
  userError: string;
  counter: number;
}

export class App extends React.Component<{}, State> {
  state = {
    userId: 0,
    title: '',
    updatedTodos: [...preparedTodos],
    titleError: '',
    userError: '',
    counter: Math.max(...usersFromServer.map(user => user.id)),
  };

  getValidData() {
    const { title, userId } = this.state;

    if (!title) {
      this.setState({
        titleError: 'Please enter the title',
      });

      return false;
    }

    if (!userId) {
      this.setState({
        userError: 'Please choose a user',
      });

      return false;
    }

    if (/[^A-Za-zА-Яа-яёЁ0-9\s]/.test(title)) {
      this.setState({
        titleError: 'Your title should have only cyrillic\'s and latin\'s letters and digits',
      });

      return false;
    }

    if (title.length > 30) {
      this.setState({
        titleError: 'Your title so long',
      });

      return false;
    }

    return true;
  }

  setCleanState() {
    this.setState({
      userId: 0,
      title: '',
      titleError: '',
      userError: '',
    });
  }

  getUpdatTodos() {
    const { userId, title, counter } = this.state;

    const todo = {
      userId,
      id: counter,
      title,
      completed: false,
      user: usersFromServer.find(user => (
        user.id === userId
      )),
    };

    this.setState((currentState) => ({
      counter: currentState.counter + 1,
    }));

    if (this.getValidData()) {
      this.setState((currentState) => ({
        updatedTodos: [...currentState.updatedTodos, todo],
      }));
      this.setCleanState();
    }
  }

  setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      titleError: '',
    });
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      userError: '',
    });
  };

  render() {
    const { title, userId } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            this.getUpdatTodos();
          }}
        >
          <div className="select">
            <input
              className="form__input"
              type="text"
              name="title"
              placeholder="add TODO"
              value={title}
              onChange={this.setTitle}
            />
            {this.state.titleError
              && (
                <div className="error">
                  {this.state.titleError}
                </div>
              )}
          </div>
          <div className="select">
            <select
              className="form__select"
              name="userId"
              value={userId}
              onChange={this.setUser}
            >
              <option>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.username}
                </option>
              ))}
            </select>
            {this.state.userError
            && (
              <div className="error">
                {this.state.userError}
              </div>
            )}
          </div>
          <button
            className="form__button"
            type="submit"
          >
            Add
          </button>
        </form>
        <TodoList todos={this.state.updatedTodos} />
      </div>
    );
  }
}
