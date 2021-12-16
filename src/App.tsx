import React from 'react';
import './App.css';

import { Todo } from './types/Todo';
import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/todoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => {
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

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  setNewUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      user: event.target.value,
    });
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
      this.setState({ error: 'Please enter the task' });

      return;
    }

    if (!this.state.user) {
      this.setState({ error: 'Please choose a user' });

      return;
    }

    this.addTodo();
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">
              Write down a task
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Write down here"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </label>
          </div>

          <select
            name="selectUser"
            id="selectUser"
            value={this.state.user}
            onChange={this.setNewUser}
          >
            <option value="" disabled selected>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          <button type="submit">
            Add
          </button>
        </form>

        {this.state.error
        && <p>{this.state.error}</p>}

        <div>
          <TodoList preparedTodos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
