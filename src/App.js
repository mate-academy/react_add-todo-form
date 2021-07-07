import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const preparedTodos = todosFromServer.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }),
);

export class App extends React.Component {
  state = {
    todos: preparedTodos,
    titleError: false,
    userError: false,
    user: '',
    title: '',
  }

  addTodo = (event) => {
    this.setState({
      title: event.target.value,
      titleError: false,
    });
  }

  chooseUser = (event) => {
    this.setState({
      user: event.target.value,
      userError: false,
    });
  }

  submitForm = (event) => {
    const { todos, title, user } = this.state;

    event.preventDefault();

    if (!title) {
      this.setState({ titleError: 'Please write a task' });

      return;
    }

    if (!user) {
      this.setState({ userError: 'Please choose a user' });

      return;
    }

    this.setState({
      todos: [...todos, {
        userId: users.find(person => person.name === user).id,
        id: todos.length + 1,
        title,
        completed: false,
        user: users.find(person => person.name === user),
      }],
      title: '',
      user: '',
    });
  }

  render() {
    const { todos, title, titleError, userError } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={this.submitForm}
          className="form"
        >
          <input
            value={title}
            type="text"
            placeholder="Add todo"
            onChange={this.addTodo}
            className="todo-form"
          />
          <select
            className="user-form"
            onChange={this.chooseUser}
            value={this.state.user}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button
            className="btn"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className={titleError || userError ? 'error' : ''}>
          {titleError}
          {userError}
        </div>
        <TodoList list={todos} />
      </div>
    );
  }
}
