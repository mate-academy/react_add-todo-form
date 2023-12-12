import React, { FormEventHandler } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './type/Todo';
import { User } from './type/User';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer
    .find(user => user.id === userId);

  return foundUser || null;
}

function getId(todos: Todo[]):number {
  return todos.reduce((max, todo) => Math.max(todo.id, max), 0) + 1;
}

export const todosFromServerWithUsers: Todo[] = todosFromServer
  .map(todo => ({ ...todo, user: getUser(todo.userId) }));

export class App extends React.Component {
  state = {
    todos: todosFromServerWithUsers,
    users: usersFromServer,
    title: '',
    userId: 0,
    titleError: false,
    userError: false,
  };

  handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    let userError = false;
    let titleError = false;

    if (this.state.userId === 0) {
      userError = true;
    }

    if (this.state.title.length === 0) {
      titleError = true;
    }

    this.setState({
      titleError,
      userError,
    });

    if (titleError || userError) {
      return;
    }

    const todo = {
      id: getId(this.state.todos),
      userId: this.state.userId,
      title: this.state.title,
      completed: false,
      user: getUser(this.state.userId),
    };

    this.addTodo(todo);
  };

  handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setTitle(event.target.value);
  };

  setTitle(value: string) {
    this.setState({ title: value, titleError: false });
  }

  handleSetUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setUserId(Number(event.target.value));
  };

  setUserId(id: number) {
    this.setState({ userId: id, userError: false });
  }

  addTodo(todo: Todo) {
    const { todos } = this.state;

    this.setState({ todos: [...todos, todo], title: '', userId: 0 });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form action="/api/todos" method="POST">
          <div className="field">
            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={this.state.title}
              onChange={(event) => this.handleSetTitle(event)}
            />
            {this.state.titleError
            && (<span className="error">Please enter a title</span>)}
          </div>

          <div className="field">
            <select
              value={this.state.userId}
              data-cy="userSelect"
              onChange={(event) => {
                this.handleSetUserId(event);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {this.state.users
                .map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
            {this.state.userError
            && (<span className="error">Please choose a user</span>)}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
            onClick={(event) => this.handleFormSubmit(event)}
          >
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
