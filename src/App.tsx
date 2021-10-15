import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TypeTodo } from './types';

import users from './api/users';
import todosFromServer from './api/todos';

type State = {
  title: string,
  titleLength: number,
  userName: string,
  todos: TypeTodo[],
  errors: {
    emptyTitle: boolean,
    noUserSelected: boolean,
  }
};

const preparedTodos = todosFromServer.map((todo) => {
  const user = users.find(person => person.id === todo.userId);

  if (user) {
    return {
      ...todo,
      user,
    };
  }

  return {
    ...todo,
    user: {
      name: 'User Not Found',
    },
  };
});

class App extends React.Component<{}, State> {
  state = {
    title: '',
    titleLength: 16,
    userName: '',
    todos: preparedTodos,
    errors: {
      emptyTitle: false,
      noUserSelected: false,
    },
  };

  setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const doesMatchFormatting = value.toLowerCase().match(/^[а-яa-z0-9 ]*$/);

    if (value.length > this.state.titleLength
      || !doesMatchFormatting) {
      return;
    }

    this.setState({
      title: value,
    });
  };

  setTitleLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      titleLength: +event.target.value,
    });
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userName: event.target.value,
    });
  };

  setErrors = () => {
    const { title, userName } = this.state;
    const titleWithoutSpaces = title.replace(/\s/g, '');
    const emptyTitle = titleWithoutSpaces === '';
    const noUserSelected = userName === '';

    this.setState((state) => {
      return {
        ...state,
        errors: {
          emptyTitle,
          noUserSelected,
        },
      };
    });

    return {
      emptyTitle,
      noUserSelected,
    };
  };

  addTodo = () => {
    const { emptyTitle, noUserSelected } = this.setErrors();
    const { todos, title, userName } = this.state;
    const user = users.find(person => person.name === userName);

    if (!user || emptyTitle || noUserSelected) {
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      user,
      completed: false,
    };

    this.setState((state) => {
      return {
        title: '',
        userName: '',
        todos: [
          ...state.todos,
          newTodo,
        ],
      };
    });
  };

  render() {
    const { emptyTitle, noUserSelected } = this.state.errors;

    return (
      <div>
        <div>
          <form className="form">

            <label htmlFor="todo-title">
              Title
              {' '}
              <input
                id="todo-title"
                type="text"
                value={this.state.title}
                onChange={this.setTitle}
              />
            </label>

            {emptyTitle && (
              <span className="error-message">
                Please enter a title
              </span>
            )}

            <br />

            <label htmlFor="todo-title-length">
              Title character limit:
              {' '}
              <input
                id="todo-title-length"
                type="number"
                min={10}
                max={20}
                value={this.state.titleLength}
                onChange={this.setTitleLength}
              />
            </label>

            <br />

            <select
              value={this.state.userName}
              onChange={this.setUser}
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.name}>{user.name}</option>
              ))}
            </select>

            {noUserSelected && (
              <span className="error-message">
                Please select a user
              </span>
            )}

            <br />

            <button
              type="button"
              onClick={this.addTodo}
            >
              Add
            </button>
          </form>
        </div>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
