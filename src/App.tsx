import React from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWhole: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App1 = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>Choose a user</option>
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">
            delectus aut autem
          </h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section>
    </div>
  );
};

type State = {
  todos: Todo[],
  users: User[],
  newTitle: string,
  newUser: string,
  titleWarning: boolean,
  userWarning: boolean,
};

export class App extends React.Component<{}, State> {
  state = {
    todos: todosWhole,
    users: usersFromServer,
    newTitle: '',
    newUser: '0',
    titleWarning: false,
    userWarning: false,
  };

  getId = () => {
    let maxId = 0;

    this.state.todos.map(todo => {
      if (maxId < todo.id) {
        maxId = todo.id;
      }

      return todo;
    });

    return maxId + 1;
  };

  verifyInput = () => {
    if (this.state.newTitle === '') {
      this.setState({ titleWarning: true });

      return false;
    }

    if (this.state.newUser === '0') {
      this.setState({ userWarning: true });

      return false;
    }

    return true;
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(this.state);
    event.preventDefault();

    if (!this.verifyInput()) {
      return;
    }

    const newTodo: Todo = {
      id: this.getId(),
      title: this.state.newTitle,
      completed: false,
      userId: +this.state.newUser,
      user: getUser(+this.state.newUser),
    };

    this.setState(oldState => ({
      ...oldState,
      todos: [...oldState.todos, newTodo],
      newTitle: '',
      newUser: '0',
    }));
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'newTitle') {
      this.setState(oldState => ({
        ...oldState,
        newTitle: value,
      }));
    } else if (name === 'newUser') {
      this.setState(oldState => ({
        ...oldState,
        newUser: value,
      }));
    }

    this.setState({ titleWarning: false });
    this.setState({ userWarning: false });
  };

  render() {
    const {
      todos,
      users,
      titleWarning,
      userWarning,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form action="/api/users" method="POST">
          <div className="field">
            <label>
              Title:
              <input
                name="newTitle"
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={this.state.newTitle}
                onChange={this.handleChange}
              />
            </label>
            {titleWarning
              && <span className="error">Please enter a title</span>}
          </div>

          <div className="field">
            <label>
              User:
              <select
                name="newUser"
                data-cy="userSelect"
                value={this.state.newUser}
                onChange={this.handleChange}
              >
                <option value="0" disabled>Choose a user</option>
                {users.map(user => (
                  <option value={user.id}>{user.name}</option>
                ))}
              </select>
            </label>

            {userWarning && <span className="error">Please choose a user</span>}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
            onClick={this.handleClick}
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}
