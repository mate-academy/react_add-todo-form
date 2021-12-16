/* eslint-disable react/no-unused-state */
import React from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';
import { Todo } from './types';

const preparedTodos: Todo[] = todos.map((todo) => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

interface State {
  todos: Todo[];
  newTodoTitle: string;
  userId: number;
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    newTodoTitle: '',
    userId: 1,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const text = event.target.value;

    this.setState({
      newTodoTitle: text,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const userId = +event.target.value;

    this.setState({
      userId,
    });
  };

  handleSubmit = () => {
    const { userId, newTodoTitle } = this.state;

    if (!newTodoTitle) {
      return;
    }

    const nextID = Math.max(...todos.map(todo => todo.id)) + 1;

    const currentUser = users.find(user => user.id === userId);

    const newTodo: Todo = {
      id: nextID,
      userId,
      title: newTodoTitle,
      completed: false,
      user: currentUser,
    };

    this.setState((state) => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
      newTodoTitle: '',
      userId: 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <div className="App__form">
          <form
            name="newTodo"
            className="App__form--form"
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <input
              placeholder="Enter your task"
              type="text"
              name="newTodoTitle"
              onChange={this.handleTitleChange}
              value={this.state.newTodoTitle}
            />
          </form>
          <select
            className="App__form--select"
            name=""
            onChange={this.handleUserChange}
          >
            {users.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          <button
            className="App__form--button"
            type="submit"
            onClick={this.handleSubmit}
          >
            Add
          </button>
        </div>
        <p className="todos__container">
          <span className="todos__title">Latest Todos</span>
          <TodoList preparedTodos={this.state.todos} />
        </p>
      </div>
    );
  }
}

export default App;
