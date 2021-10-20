import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './Types';

const preparedTodos: Todo[] = todos.map(
  todo => {
    const preparedTodo: Todo = {
      ...todo,
      user: (users.find(
        user => user.id === todo.userId,
      )) || null,
    };

    return preparedTodo;
  },
);

type State = {
  supplementedTodos: Todo[];
  userId: number;
  title: string;
  emptyTitleError: string;
  noSelectionError: string;
};

class App extends React.Component<{}, State> {
  state = {
    supplementedTodos: preparedTodos,
    userId: 0,
    title: '',
    emptyTitleError: '',
    noSelectionError: '',
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!this.state.title) {
      this.setState({
        emptyTitleError: 'please enter the title',
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        noSelectionError: 'please choose a user',
      });

      return;
    }

    this.setState(state => ({
      supplementedTodos: [...state.supplementedTodos, {
        userId: state.userId,
        id: Math.max(...state.supplementedTodos.map(todo => todo.id)) + 1,
        title: state.title,
        completed: false,
        user: users.find(user => user.id === state.userId) || null,
      }],
      title: '',
      userId: 0,
    }));
  };

  render() {
    const {
      supplementedTodos,
      title,
      userId,
      emptyTitleError,
      noSelectionError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__heading">List of todos</h1>
        <form
          className="App__form"
          onSubmit={this.submitHandler}
        >
          <input
            className="App__input"
            type="text"
            name="todo"
            placeholder="enter the title"
            value={title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
                emptyTitleError: '',
              });
            }}
          />
          <span className="App__error">
            {emptyTitleError}
          </span>
          <select
            className="App__input"
            name="names"
            value={userId}
            onChange={(event) => {
              this.setState({
                userId: +event.target.value,
                noSelectionError: '',
              });
            }}
          >
            <option> choose a user </option>
            {users.map(person => (
              <option
                key={person.id}
                value={person.id}
              >
                {person.name}
              </option>
            ))}
          </select>
          <span className="App__error">
            {noSelectionError}
          </span>
          <button
            className="App__button"
            type="submit"
          >
            Add
          </button>
        </form>
        <TodoList
          prepTD={supplementedTodos}
        />
      </div>
    );
  }
}

export default App;
