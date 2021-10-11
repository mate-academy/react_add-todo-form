import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TypeTodo } from './types';

import users from './api/users';
import todosFromServer from './api/todos';

const enAlph = 'abcdefghijklmnopqrstuvwxyz';
const ruAlph = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const numbers = '0123456789';
const space = ' ';
const alphabet = enAlph + ruAlph + numbers + space;

type State = {
  title: string,
  titleLength: number,
  user: string,
  todos: TypeTodo[],
  errors: {
    emptyTitle: boolean,
    noUserSelected: boolean,
  }
};

const preparedTodos = todosFromServer.map((todo) => {
  const user = users.find(person => person.id === todo.userId);
  let name = '';

  if (user) {
    name = user.name;
  } else {
    name = 'Name not found';
  }

  return {
    ...todo,
    user: name,
  };
});

class App extends React.Component<{}, State> {
  state = {
    title: '',
    titleLength: 16,
    user: '',
    todos: preparedTodos,
    errors: {
      emptyTitle: false,
      noUserSelected: false,
    },
  };

  setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newSymbol = value.charAt(value.length - 1).toLowerCase();

    if (value.length > this.state.titleLength
      || !alphabet.includes(newSymbol)) {
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
      user: event.target.value,
    });
  };

  setErrors = () => {
    const { title, user } = this.state;

    this.setState((state) => {
      return {
        ...state,
        errors: {
          emptyTitle: title === '',
          noUserSelected: user === '',
        },
      };
    });
  };

  addTodo = () => {
    this.setErrors();
    const { todos, title, user } = this.state;

    if (title === '' || user === '') {
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
        user: '',
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
            {/* eslint-disable-next-line */}
            <label htmlFor="todo-title"> Title</label>
            {' '}
            <input
              id="todo-title"
              type="text"
              value={this.state.title}
              onChange={this.setTitle}
            />
            {emptyTitle && (
              <span className="error-message">
                Please enter a title
              </span>
            )}
            <br />
            {/* eslint-disable-next-line */}
            <label htmlFor="todo-title-length">Title character limit:</label>
            {' '}
            <input
              id="todo-title-length"
              type="number"
              min={10}
              max={20}
              value={this.state.titleLength}
              onChange={this.setTitleLength}
            />
            <br />
            <select
              value={this.state.user}
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
