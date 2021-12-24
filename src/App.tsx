import React from 'react';
import classNames from 'classnames';
import todos from './api/todos';
import users from './api/users';
import './App.scss';
import { TodoList } from './Components/TodoList/TodoList';
import { Todo } from './types/Todo';

const todoFromServer = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  user: string,
  title: string,
  todos: Todo[],
  formError: string[],
};

class App extends React.Component<{}, State> {
  state = {
    user: '',
    title: '',
    todos: todoFromServer,
    formError: [''],
  };

  addTodo = () => {
    if (!this.state.user.length) {
      this.setState(state => ({ formError: [...state.formError, 'user'] }));

      return;
    }

    if (!this.state.title.trim().length) {
      this.setState(state => ({ formError: [...state.formError, 'title'] }));

      return;
    }

    const currentUser = users.find(user => user.name === this.state.user);
    const newTodo = {
      userId: currentUser?.id,
      id: this.state.todos.length + 1,
      title: this.state.title,
      completed: false,
      user: currentUser || null,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      title: '',
      user: '',
    }));
  };

  removeTodo = (event: any) => {
    this.setState(state => ({
      todos: [...state.todos].filter(todo => todo.id !== +event.target.dataset.key),
    }));
  };

  render() {
    return (
      <div className="App">
        <form className="App__form">
          <select
            className={classNames('App__select', {
              'App__form-error': this.state.formError.includes('user'),
            })}
            value={this.state.user}
            onChange={(event) => {
              this.setState(state => ({
                user: event.target.value,
                formError: [...state.formError].filter(error => error !== 'user'),
              }));
            }}
          >
            <option value="" disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <textarea
            className={classNames('App__textarea', {
              'App__form-error': this.state.formError.includes('title'),
            })}
            placeholder="Write a title"
            value={this.state.title}
            onChange={(event) => {
              this.setState(state => ({
                title: event.target.value,
                formError: [...state.formError].filter(error => error !== 'title'),
              }));
            }}
          />
          <button
            type="button"
            className="App__button"
            onClick={this.addTodo}
          >
            Add
          </button>
        </form>
        {!!this.state.todos.length && (
          <TodoList todos={this.state.todos} removeTodo={this.removeTodo} />
        )}
      </div>
    );
  }
}

export default App;
