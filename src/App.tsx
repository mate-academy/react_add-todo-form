import React from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { todos as todosFromServer } from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

interface State {
  todos: Todo[],
  todoTitle: string,
  userId: number,
  isUserUnselected: boolean,
  isTitleEmpty: boolean,
}

export class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    todoTitle: '',
    userId: 0,
    isUserUnselected: false,
    isTitleEmpty: false,
  };

  onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.target.value),
      isUserUnselected: false,
    });
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (value.length <= 80) {
      this.setState({
        todoTitle: event.target.value.replace(/[^A-Za-zа-яА-ЯёЁ0-9_\s]/g, ''),
        isTitleEmpty: false,
      });
    }
  };

  onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { userId, todoTitle } = this.state;

    if (userId === 0) {
      this.setState(({ isUserUnselected: true }));
    }

    if (todoTitle.trim() === '') {
      this.setState(({ isTitleEmpty: true }));
    }

    event.preventDefault();

    if (userId !== 0 && todoTitle.trim() !== '') {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            id: Math.max(...state.todos.map(todo => todo.id)) + 1,
            title: state.todoTitle,
            userId: state.userId,
            completed: false,
          },
        ],
      }));

      if (todoTitle.trim() !== '') {
        this.clearForm();
      }
    }
  };

  clearForm = () => {
    this.setState({
      todoTitle: '',
      userId: 0,
    });
  };

  changeStatus = (id: number) => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          // eslint-disable-next-line no-param-reassign
          todo.completed = !todo.completed;
        }

        return todo;
      }),
    }));
  };

  render() {
    const {
      todos,
      todoTitle,
      userId,
      isUserUnselected,
      isTitleEmpty,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form className="form">
          <label htmlFor="title">
            Title:
            <input
              title="Enter your todo, max 80 characters"
              required
              className="form__todo"
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title"
              value={todoTitle}
              onChange={this.onChange}
            />
          </label>
          {isTitleEmpty && <span id="error">Please enter the title</span>}

          <select
            className="form__select"
            title="Choose a user to make this todo"
            required
            name="user"
            id="user"
            value={userId}
            onChange={this.onSelect}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {isUserUnselected && <span id="error">Please choose a user</span>}
          <button
            className="button"
            type="submit"
            title="Click to add todo"
            onClick={this.onSubmit}
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} changeStatus={this.changeStatus} />
      </div>
    );
  }
}
