import React from 'react';
import { PreparedTodo } from './types/PreparedTodo';

import todos from './api/todos';
import users from './api/users';

import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const maxQuery = 30;

type State = {
  query: string,
  stateTodos: PreparedTodo[],
  currentUserId: number,
  isCorrectQuery: boolean,
  isCorrectSelect: boolean,
  isQueryTooLong: boolean,
};

class App extends React.PureComponent<{}, State> {
  state: State = {
    query: '',
    stateTodos: [...preparedTodos],
    currentUserId: 0,
    isCorrectQuery: true,
    isCorrectSelect: true,
    isQueryTooLong: false,
  };

  queryChangeHandler = (inputValue: string) => {
    const text: string = inputValue.replace(/[^\da-zа-яё\s]/gi, '');

    if (text.length <= maxQuery) {
      this.setState({
        query: text,
        isCorrectQuery: true,
      });
    } else {
      this.setState({
        isQueryTooLong: true,
      });
    }
  };

  selectUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      currentUserId: +value,
      isCorrectSelect: true,
    });
  };

  formSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      query,
      currentUserId,
      stateTodos,
    } = this.state;
    const newId = Math.max(...stateTodos.map(todo => todo.id)) + 1;

    if (!query.trim().length) {
      this.setState({ isCorrectQuery: false });
    }

    if (!currentUserId) {
      this.setState({ isCorrectSelect: false });
    }

    if (currentUserId && query.trim().length) {
      const newTodo: PreparedTodo = {
        userId: currentUserId,
        id: newId,
        title: query,
        completed: Boolean(Math.round(Math.random())),
        user: users.find(user => user.id === currentUserId) || null,
      };

      this.setState({
        stateTodos: [...stateTodos, newTodo],
        currentUserId: 0,
        isQueryTooLong: false,
        query: '',
      });
    }
  };

  render() {
    const {
      stateTodos,
      query,
      currentUserId,
      isCorrectQuery,
      isCorrectSelect,
      isQueryTooLong,
    } = this.state;

    return (
      <>
        <div className="App">
          <form
            className="form"
            onSubmit={this.formSubmitHandler}
          >
            <div className="form__container">
              <input
                className="form__input"
                type="text"
                onChange={event => this.queryChangeHandler(event.target.value)}
                value={query}
                placeholder="input title todo..."
              />

              {!isCorrectQuery && (
                <span
                  className="form__alert form__alert--title"
                >
                  Please enter the title
                </span>
              )}

              {isQueryTooLong && (
                <span
                  className="form__alert"
                >
                  {` Max query length: ${maxQuery}`}
                </span>
              )}
            </div>
            <div className="form__container">
              <label
                className="form__label"
                htmlFor="someId"
              >
                <select
                  className="form__select"
                  name="select"
                  id="someId"
                  onChange={event => this.selectUserHandler(event)}
                  value={currentUserId}
                >
                  <option
                    disabled
                    value={0}
                  >
                    choose user
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
              </label>

              {!isCorrectSelect && (
                <span
                  className="form__alert"
                >
                  Choose a user
                </span>
              )}
            </div>
            <div className="form__container">
              <button
                className="form__button"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>

          <TodoList todos={stateTodos} />
        </div>
      </>
    );
  }
}

export default App;
