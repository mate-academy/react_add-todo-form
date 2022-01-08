import React from 'react';
import classNames from 'classnames';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todos } from './components/types/Todos';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(item => {
  return {
    ...item,
    user: users.find(person => item.userId === person.id) || null,
  };
});

type State = {
  name: string;
  title: string;
  addedTodos: Todos[],
  titleError: boolean;
  nameError: boolean;
  maxTitleLength: number;
};

export class App extends React.Component<{}, State> {
  state = {
    title: '',
    name: '',
    addedTodos: [...preparedTodos],
    titleError: false,
    nameError: false,
    maxTitleLength: 20,
  };

  addTodo = () => {
    if (!this.state.title.trim().length) {
      this.setState(state => ({
        titleError: !state.titleError,
      }));

      return;
    }

    if (this.state.title.match(/[^a-zA-Zа-яА-Я0-9]/)) {
      this.setState(state => ({
        titleError: !state.titleError,
      }));
    }

    if (!this.state.name.length) {
      this.setState(state => ({
        nameError: !state.nameError,
      }));

      return;
    }

    const todoId = () => {
      if (this.state.addedTodos.length === 0) {
        return 1;
      }

      const array = this.state.addedTodos.map(item => item.id);
      const maxNum = Math.max(...array);

      return maxNum + 1;
    };

    const addedUser = users.find(user => user.name === this.state.name);
    const newTodo = {
      userId: addedUser?.id,
      id: todoId(),
      title: this.state.title.trim().slice(0, this.state.maxTitleLength),
      completed: false,
      user: addedUser || null,
    };

    this.setState(state => ({
      addedTodos: [...state.addedTodos, newTodo],
      title: '',
      name: '',
    }));
  };

  removeTodo = (id: number) => {
    this.setState(state => ({
      addedTodos: [...state.addedTodos].filter(item => item.id !== id),
    }));
  };

  render() {
    const { addedTodos } = this.state;

    return (
      <div className="App">
        <h1>Todos list</h1>

        <TodoList preparedTodos={addedTodos} removeTodo={this.removeTodo} />

        <h2>Here you can add you todo to the list</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Add todo"
            value={this.state.title}
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
            onFocus={() => {
              if (this.state.titleError) {
                this.setState(state => ({
                  titleError: !state.titleError,
                }));
              }
            }}
          />
          <span
            className={classNames('error', { error__show: this.state.titleError })}
          >
            You should add a todo using only letters and digits
          </span>
          <select
            name="name"
            id="name"
            value={this.state.name}
            onChange={(event) => {
              this.setState({
                name: event.target.value,
              });
            }}
            onFocus={() => {
              if (this.state.nameError) {
                this.setState(state => ({
                  nameError: !state.nameError,
                }));
              }
            }}
          >
            <option value="">Choose a responsible person</option>
            {users.map(user => (
              <option
                key={user.name}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <span
            className={classNames('error', { error__show: this.state.nameError })}
          >
            You should add user
          </span>
          <button
            type="submit"
            onClick={this.addTodo}
          >
            Add todo to the list
          </button>
        </form>
      </div>
    );
  }
}
