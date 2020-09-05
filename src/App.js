import React, { PureComponent } from 'react';
import './App.css';
import { TodoList } from './TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const currentTodos = todosFromServer.map((todo) => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  return (user)
    ? {
      ...user,
      todoTitle: todo.title,
    }
    : '';
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

    if (!this.state.user) {
      this.setState({
        noUserError: 'Please choose a user',
      });
    } else if (!this.state.todo) {
      this.setState({
        noTodoError: 'Please enter the title',
      });
    } else {
      const selectedUser = usersFromServer.find(user => (
        user.name === this.state.user
      ));

      selectedUser.todoTitle = this.state.todo;

      this.setState(state => ({
        todos: [
          ...state.todos,
          selectedUser,
        ],
        todo: '',
        user: '',
      }));
    }
  }

  checkForInput = (input) => {
    if (input) {
      this.setState({ noTodoError: '' });
    }
  }

  checkForUser = (input) => {
    if (input) {
      this.setState({ noUserError: '' });
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
          action="#"
          method="get"
          className="form"
          onSubmit={(event) => {
            this.addSelection(event);
          }}
        >
          <select
            className="form__select"
            value={user}
            onChange={(event) => {
              const { value } = event.target;

              this.setState({ user: value });
              this.checkForUser(value);
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
                const { value } = event.target;

                this.setState({ todo: value.trim() });
                this.checkForInput(value);
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
