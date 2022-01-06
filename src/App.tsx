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
        title: 'you should add a todo',
        titleError: !state.titleError,
      }));

      return;
    }

    if (!this.state.title.match(/^[a-zA-Z0-9]/)) {
      this.setState(state => ({
        title: 'only letters and digits',
        titleError: !state.titleError,
      }));
    }

    if (!this.state.name.length) {
      this.setState(state => ({
        name: 'you should add a user',
        nameError: !state.nameError,
      }));

      return;
    }

    const todoId = () => {
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
      addedTodos: state.addedTodos.filter(item => item.id !== id),
    }));
  };

  render() {
    const { addedTodos } = this.state;

    return (
      <div className="App">
        <h1>Todos list</h1>

        <TodoList preparedTodos={addedTodos} />

        <h2>Here you can add you todo to the list</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            name="title"
            className={classNames({ title__error: this.state.titleError })}
            placeholder="Add todo"
            value={this.state.title}
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
            onFocus={(e) => {
              if (e.target.value === 'you should add a todo' || e.target.value === 'only letters and digits') {
                this.setState(state => ({
                  title: '',
                  titleError: !state.titleError,
                }));
              }
            }}
          />
          <select
            name="name"
            id="name"
            value={this.state.name}
            className={classNames({ user__error: this.state.nameError })}
            onChange={(event) => {
              this.setState({
                name: event.target.value,
              });
            }}
            onFocus={(e) => {
              if (e.target.value === 'you should add a user') {
                this.setState(state => ({
                  nameError: !state.nameError,
                }));
              }
            }}
          >
            <option value="">Choose a responsible person</option>
            <option value="you should add a user" hidden>you should add a user</option>
            {users.map(user => (
              <option
                key={user.name}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
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
