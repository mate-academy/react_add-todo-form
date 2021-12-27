/* eslint-disable react/no-unused-state */
import React from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types';

const preparedTodos: Todo[] = todos.map((todo) => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

interface State {
  todos: Todo[];
  todoTitle: string;
  userId: number;
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    todoTitle: '',
    userId: 1,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const text = event.target.value;

    this.setState({
      todoTitle: text,
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
    const { userId, todoTitle } = this.state;

    if (!todoTitle) {
      return;
    }

    const nextID = Math.max(...todos.map(todo => todo.id)) + 1;

    const currentUser = users.find(user => user.id === userId);

    const newTodo: Todo = {
      id: nextID,
      userId,
      title: todoTitle,
      completed: false,
      user: currentUser,
    };

    this.setState((state) => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
      todoTitle: '',
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
              name="todoTitle"
              onChange={this.handleTitleChange}
              value={this.state.todoTitle}
            />
          </form>
          <select
            className="App__form--select"
            name=""
            onChange={this.handleUserChange}
          >
            <option>Choose a user</option>
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
