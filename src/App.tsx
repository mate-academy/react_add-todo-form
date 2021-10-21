import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Todo';
import { TodoList } from './TodoList';

type State = {
  todos: Todo[];

  newTodoTitle: string;
  newTodoTitleError: boolean;

  newTodoUserId: number;
  newTodoUserError: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todosFromServer],

    newTodoTitle: '',
    newTodoTitleError: false,

    newTodoUserId: 0,
    newTodoUserError: false,
  };

  addTodo = (title: string, userId: number) => {
    const todoUser = users.find(({ id }) => id === userId);
    const maxId = Math.max(...this.state.todos.map(good => good.id));

    const newTodo = {
      id: maxId + 1,
      title,
      userId: todoUser?.id || null,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newTodoTitle, newTodoUserId } = this.state;

    this.setState(state => ({
      newTodoTitleError: state.newTodoTitle === '',
      newTodoUserError: state.newTodoUserId === 0,
    }));

    if (!newTodoTitle || !newTodoUserId) {
      return;
    }

    this.setState({
      newTodoTitle: '',
      newTodoUserId: 0,
    });

    this.addTodo(newTodoTitle, newTodoUserId);
  };

  handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.currentTarget.value,
    });

    this.setState(state => ({
      newTodoTitleError: state.newTodoTitle === '',
    }));
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTodoUserId: +event.currentTarget.value,
    });

    this.setState(state => ({
      newTodoUserError: state.newTodoUserId === 0,
    }));
  };

  render() {
    const {
      todos, newTodoTitle, newTodoUserId, newTodoTitleError, newTodoUserError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="header">Add todo form</h1>
        <form onSubmit={this.handleFormSubmit}>
          <select
            className="form-select"
            value={newTodoUserId}
            onChange={this.handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          {newTodoUserError && (
            <div className="error">
              Please choose a user
            </div>
          )}

          <div>
            <label htmlFor="todo" className="form-label">
              <div>New todo</div>
              <input
                type="text"
                placeholder="Enter todo"
                className="form-control"
                id="todo"
                value={newTodoTitle}
                onChange={this.handleTodoChange}
              />
            </label>

            {newTodoTitleError && (
              <div className="error">
                Please enter the title
              </div>
            )}
          </div>

          <button type="button" className="btn btn-primary">Add todo</button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
