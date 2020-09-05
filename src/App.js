import React, { PureComponent } from 'react';
import './App.css';
import { TodoList } from './TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const currentTodos = todosFromServer.map((todo) => {
  const { name } = usersFromServer.find(person => person.id === todo.userId);

  return {
    ...todo,
    name,
  };
});

export class App extends PureComponent {
  state = {
    user: '',
    todo: '',
    todos: currentTodos,
    noUserError: '',
    noTodoError: '',
  }

  addSelection = (event) => {
    event.preventDefault();

    if (!this.state.todo) {
      this.setState({
        noTodoError: 'Please enter the title',
      });
    }

    if (!this.state.user) {
      this.setState({
        noUserError: 'Please choose a user',
      });
    } else if (this.state.todo && this.state.user) {
      const userId = usersFromServer
        .find(user => user.name === this.state.user).id;

      const name = this.state.user;
      const id = this.state.todos.length + 1;
      const title = this.state.todo;

      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            name,
            id,
            title,
            userId,
          },
        ],
        todo: '',
        user: '',
      }));
    }
  }

  render() {
    const { user, todo, todos, noTodoError, noUserError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>

        <form
          className="form"
          onSubmit={(event) => {
            this.addSelection(event);
          }}
        >
          <select
            className="form__select"
            value={user}
            onChange={(event) => {
              this.setState({
                user: event.target.value,
                noUserError: '',
              });
            }}
          >
            <option value="">Choose a user</option>
            {
              usersFromServer.map(person => (
                <option key={person.id} value={person.name}>
                  {person.name}
                </option>
              ))
            }
          </select>

          <div className="form__error">{noUserError}</div>
          <label>
            <input
              type="text"
              className="form__todo"
              placeholder="Todo"
              name="todo"
              value={todo}
              onChange={(event) => {
                this.setState({
                  todo: event.target.value.trim(),
                  noTodoError: '',
                });
              }}
            />
          </label>

          <div className="form__error">{noTodoError}</div>
          <button type="submit" className="form__button">Add</button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}
