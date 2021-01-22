import React from 'react';
import './App.css';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

function getUserById(userId) {
  return users.find(user => user.id === userId);
}

const todosWithUser = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId).name,
}));

class App extends React.Component {
  state = {
    todosNew: todosWithUser,
    todoTitle: '',
    todoUserId: 0,
    errorNoTitle: false,
    errorNoUser: false,
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form
          action="/api/todolist"
          method="Post"
          onSubmit={(event) => {
            event.preventDefault();

            this.setState((state) => {
              if (state.todoTitle.trim() !== '' && state.todoUserId !== 0) {
                const newTodo = {
                  id: state.todosNew.length + 1,
                  title: state.todoTitle,
                  userId: state.todoUserId,
                  user: getUserById(state.todoUserId).name,
                };

                return ({
                  todosNew: [...state.todosNew, newTodo],
                  todoTitle: '',
                  todoUserId: 0,
                });
              }

              if (state.todoTitle.trim() === ''
                && state.todoUserId === 0) {
                return ({
                  errorNoTitle: true,
                  errorNoUser: true,
                });
              }

              if (state.todoTitle.trim() === '') {
                return ({ errorNoTitle: true });
              }

              if (state.todoUserId === 0) {
                return ({ errorNoUser: true });
              }

              return state;
            });
          }}
        >
          <div className="form__field">
            <label htmlFor="new-todo-title">Todo title </label>
            <input
              type="text"
              name="todoTitle"
              value={this.state.todoTitle}
              onChange={(event) => {
                this.setState({
                  todoTitle: event.target.value,
                  errorNoTitle: false,
                });
              }}
              id="new-todo-title"
              placeholder="Todo title"
            />
            <div
              className={classNames(
                'error-msg',
                { hidden: !this.state.errorNoTitle },
              )}
            >
              Please enter the title
            </div>
          </div>

          <div className="form__field">
            <label htmlFor="new-todo-user">Todo user </label>
            <select
              name="todoUser"
              id="new-todo-user"
              value={this.state.todoUserId}
              onChange={(event) => {
                this.setState({
                  todoUserId: +event.target.value,
                  errorNoUser: false,
                });
              }}
            >
              <option>Please choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div
              className={classNames(
                'error-msg',
                { hidden: !this.state.errorNoUser },
              )}
            >
              Please choose a user
            </div>
          </div>

          <button type="submit">
            Add
          </button>
        </form>
        <TodoList todos={this.state.todosNew} />
      </div>
    );
  }
}

export default App;
