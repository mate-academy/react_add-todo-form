import React from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  todos: Todo[];
  title: string;
  userId: number;
  invalidTitle: boolean;
  invalidUser: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    title: '',
    userId: 0,
    invalidTitle: false,
    invalidUser: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      invalidTitle: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      invalidUser: false,
    });
  };

  addTodo = () => {
    const {
      userId,
      title,
      todos: allTodos,
    } = this.state;

    if (this.state.userId && this.state.title.trim()) {
      const newTodo = {
        user: users.find(user => user.id === this.state.userId) || null,
        userId,
        id: allTodos.length,
        title: title.trim(),
        completed: false,
      };

      this.setState((state) => ({
        todos: [...state.todos, newTodo],
        title: '',
        userId: 0,
      }));
    } else {
      this.showError();
    }
  };

  showError = () => {
    const { userId, title } = this.state;
    let invalidUser = false;
    let invalidTitle = false;

    if (!userId) {
      invalidUser = true;
    }

    if (!title.trim()) {
      invalidTitle = true;
    }

    this.setState({
      invalidUser,
      invalidTitle,
    });
  };

  render() {
    const {
      userId,
      title,
      todos: allTodos,
      invalidTitle,
      invalidUser,
    } = this.state;

    return (
      <div className="App">
        <div className="form">
          <h2>Add todo form</h2>
          <form onSubmit={(event) => {
            event.preventDefault();
          }}
          >
            <div>
              <label htmlFor="todo-title">
                <input
                  type="text"
                  id="todo-title"
                  value={title}
                  onChange={this.handleTitleChange}
                  placeholder="Title"
                />
              </label>
              {invalidTitle && (
                <span className="error">Please enter the title</span>
              )}
            </div>

            <div>
              <select
                name="user"
                value={userId}
                onChange={this.handleUserChange}
              >
                <option value="0">Choose a user</option>
                {users.map(user => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
              {invalidUser && (
                <span className="error">Please choose a user</span>
              )}
            </div>

            <button type="submit" onClick={this.addTodo}>Add</button>
          </form>
        </div>

        <div>
          <h2 className="list-title">Static list of todos</h2>
          <TodoList preparedTodos={allTodos} />
        </div>
      </div>
    );
  }
}

export default App;
