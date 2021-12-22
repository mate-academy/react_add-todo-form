import React from 'react';
import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/todoList/TodoList';
import './App.css';

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  };
});

type State = {
  todos: Todo[];
  title: string;
  user: string;
  error: string;
};

export class App extends React.Component <{}, State> {
  state: State = {
    todos: [...preparedTodos],
    title: '',
    user: '',
    error: '',
  };

  handleChange = (event: { currentTarget: { name: string; value: string; }; }): void => {
    const { name, value } = event.currentTarget;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
      error: '',
    }));
  };

  addTodo = () => {
    const currentUser = users.find(user => user.name === this.state.user) || null;

    if (!currentUser) {
      return;
    }

    const newTodo = {
      userId: currentUser.id,
      title: this.state.title,
      id: this.state.todos.length + 1,
      user: currentUser,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      title: '',
      user: '',
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!this.state.title) {
      this.setState({ error: 'You need add todo' });

      return;
    }

    if (!this.state.user) {
      this.setState({ error: 'You need select user' });

      return;
    }

    this.addTodo();
  };

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">
                Please add todo
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="title"
                  placeholder="please add todo"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <span>Please select user</span>
            <select
              name="user"
              id="selectUser"
              className="select-user"
              value={this.state.user}
              onChange={this.handleChange}
            >
              <option value="">
                select user
              </option>
              {users.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>

            <button
              type="submit"
              className="btn-submit"
            >
              Add
            </button>
            {this.state.error
            && <div className="error">{this.state.error}</div>}
          </form>
        </div>

        <div>
          <TodoList preparedTodos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
