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
    const { todos } = this.state;
    const todoUser = users.find(({ id }) => id === userId);
    const maxId = Math.max(...todos.map(good => good.id));

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
      newTodoTitleError: !state.newTodoTitle,
      newTodoUserError: !state.newTodoUserId,
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
      newTodoTitle: event.target.value,
      newTodoTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTodoUserId: +event.currentTarget.value,
      newTodoUserError: false,
    });
  };

  render() {
    const {
      todos,
      newTodoTitle,
      newTodoUserId,
      newTodoTitleError,
      newTodoUserError,
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
            <option value="0" key="0" disabled>Choose a user</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {newTodoUserError && (
            <div className="error">
              Please choose a user
            </div>
          )}

          <div>
            <label htmlFor="todo" className="form-label">
              <span className="input-info">New Todo</span>
              <input
                type="text"
                placeholder="Enter todo"
                className="form-control"
                id="todo"
                value={newTodoTitle}
                onChange={this.handleTodoChange}
              />
              {newTodoTitleError && (
                <div className="error">
                  Please enter the title
                </div>
              )}
            </label>
          </div>

          <button type="submit" className="btn btn-primary">Add todo</button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
