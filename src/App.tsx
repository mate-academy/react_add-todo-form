import React from 'react';
import { PreparedTodo } from './types/PreparedTodo';

import todos from './api/todos';
import users from './api/users';

import './App.css';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  query: string,
  stateTodos: PreparedTodo[],
  currentUserId: number,
  isCorrectQuery: boolean,
  isCorrectSelect: boolean,
};

class App extends React.PureComponent<{}, State> {
  state: State = {
    query: '',
    stateTodos: [...preparedTodos],
    currentUserId: 0,
    isCorrectQuery: true,
    isCorrectSelect: true,
  };

  queryChangeHandler = (inputValue: string) => {
    this.setState({
      query: inputValue,
      isCorrectQuery: true,
    });
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
        completed: false,
        user: users.find(user => user.id === currentUserId) || null,
      };

      this.setState({
        stateTodos: [...stateTodos, newTodo],
        currentUserId: 0,
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
    } = this.state;

    return (
      <>
        <form onSubmit={this.formSubmitHandler}>
          <p>
            <input
              type="text"
              onChange={event => this.queryChangeHandler(event.target.value)}
              value={query}
              placeholder="input title todo..."
            />
            {!isCorrectQuery && (
              <span> Please enter the title</span>
            )}
          </p>

          <label htmlFor="someId">
            <select
              name="select"
              id="someId"
              onChange={event => this.selectUserHandler(event)}
              value={currentUserId}
            >
              <option
                disabled
                value={0}
              >
                Choose User
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

          <button
            type="submit"
          >
            Add
          </button>
          {!isCorrectSelect && (
            <span> Choose a user</span>
          )}
        </form>

        <TodoList todos={stateTodos} />
      </>
    );
  }
}

export default App;
