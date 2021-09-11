import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './types/PreparedTodo';

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface State {
  userId: number;
  title: string;
  updatedTodos: Todo[];
  visibleTitleError: string;
  visibleUserError: string;
}

export class App extends React.Component<{}, State> {
  state = {
    userId: 0,
    title: '',
    updatedTodos: [...todosFromServer],
    visibleTitleError: '',
    visibleUserError: '',
  };

  getUpdatTodos() {
    const todo = {
      userId: this.state.userId,
      id: this.state.updatedTodos.length + 1,
      title: this.state.title,
      completed: false,
    };

    if (!this.state.title) {
      this.setState({ visibleTitleError: 'Please enter the title' });
    }

    if (!this.state.userId) {
      this.setState({ visibleUserError: 'Please choose a user' });
    }

    if (this.state.title && this.state.userId) {
      this.setState((currentState) => ({
        updatedTodos: [...currentState.updatedTodos, todo],
        userId: 0,
        title: '',
        visibleTitleError: '',
        visibleUserError: '',
      }));
    }
  }

  render() {
    const { title, userId } = this.state;

    const preparedTodos: PreparedTodo[] = this.state.updatedTodos.map(todo => {
      const user = usersFromServer.find(person => person.id === todo.userId) || null;
      const preparedTodo = { ...todo, user };

      return preparedTodo;
    });

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
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  visibleTitleError: '',
                });
              }}
            />
            {this.state.visibleTitleError
              && (
                <div>
                  {this.state.visibleTitleError}
                </div>
              )}
          </div>
          <div className="select">
            <select
              className="form__select"
              name="userId"
              value={userId}
              onChange={(event) => {
                this.setState({
                  userId: +event.target.value,
                  visibleUserError: '',
                });
              }}
            >
              <option
                value=""
                selected
              >
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <>
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.username}
                  </option>
                </>
              ))}
            </select>
            {this.state.visibleUserError
            && (
              <div>
                {this.state.visibleUserError}
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
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}
