import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(element => ({
  ...element,
  user: users.find(user => user.id === element.userId) || null,
}));

type State = {
  todos: Todo[],
  title: string,
  user: string,
  error: string,
};

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    title: '',
    user: '',
    error: '',
  };

  addTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const currentUser = users.find(user => user.name === this.state.user);

    if (!this.state.title.trim()) {
      this.setState({ error: 'Please enter the title' });

      return;
    }

    if (!this.state.user) {
      this.setState({ error: 'Please choose a user' });

      return;
    }

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

    this.setState((state) => (
      {
        todos: [...state.todos, newTodo],
        title: '',
        user: '',
      }
    ));
  };

  render() {
    const todoList = [...this.state.todos];

    return (
      <div className="App">

        <div>
          <h1>Add todo form</h1>
          {this.state.error && (
            <div style={{ color: 'red' }}>
              <p>{this.state.error}</p>
            </div>
          )}
          <form onSubmit={this.addTodo}>

            <input
              type="text"
              placeholder="Title"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  error: '',
                });
              }}
            />

            <select
              value={this.state.user}
              onChange={(event) => {
                this.setState({
                  user: event.target.value,
                  error: '',
                });
              }}
            >
              <option>Choose a user</option>
              {users.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>

            <button type="submit">Add</button>
          </form>
        </div>
        <TodoList preparedTodos={todoList} />
      </div>
    );
  }
}

export default App;
