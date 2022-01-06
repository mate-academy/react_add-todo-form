import React from 'react';

import { TodoList } from '../TodoList';
import { Todo } from '../../types/Todo';

import './App.css';
import './Form.css';

import users from '../../api/users';
import todos from '../../api/todos';

type State = {
  todos: Todo[],
  title: string,
  user: string,
  error: string,
};

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  };
});

export class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    title: '',
    user: '',
    error: '',
  };

  checkForm = () => {
    if (!this.state.title.trim()) {
      this.setState({ error: 'Please enter the title' });

      return;
    }

    if (!this.state.user) {
      this.setState({ error: 'Please choose a user' });

      return;
    }

    this.addTodo();
  };

  addTodo = () => {
    const currentUser = users.find(user => user.name === this.state.user);

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
        {this.state.error && (
          <div className="App__error">
            <p>{this.state.error}</p>
          </div>
        )}

        <div className="App__content">
          <h1>Add todo form</h1>
          <form
            className="Form"
            onSubmit={(event) => {
              event.preventDefault();
              this.checkForm();
            }}
          >
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
              name=""
              id=""
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

            <button
              type="submit"
            >
              Add
            </button>
          </form>
        </div>

        <TodoList todoList={todoList} />

      </div>
    );
  }
}
