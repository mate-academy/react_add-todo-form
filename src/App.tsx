/* eslint-disable no-unneeded-ternary */
import React from 'react';
import './App.scss';

import { TodoList } from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

import { TodoWithUser } from './types/TodoWithUser';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getPreparedTodo(arrOfTodo: Todo[], arrOfUsers: User[]) {
  const findUser = (todo: Todo) => (
    arrOfUsers.find(user => user.id === todo.userId)
  );

  return arrOfTodo.map(todo => {
    return {
      ...todo,
      user: findUser(todo) || null,
    };
  });
}

const preparedTodo: TodoWithUser[] = getPreparedTodo(todos, users);

type State = {
  todosFromServer: TodoWithUser[],
  title: string,
  user: User | null,
  selectedUserName: string,
  hasTitle: boolean,
  hasUser: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    todosFromServer: preparedTodo,
    selectedUserName: '',
    title: '',
    user: null,
    hasTitle: false,
    hasUser: false,
  };

  addTitle = (event: { target: { value: string; }; }) => {
    this.setState({
      title: event.target.value,
      hasTitle: false,
    });
  };

  addUser = (event: { target: { value: string; }; }) => {
    const { value } = event.target;

    const selectedUser = users.find(user => user.name === value);

    this.setState({
      selectedUserName: value,
      user: selectedUser || null,
      hasUser: false,
    });
  };

  submitForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const {
      title,
      selectedUserName,
    } = this.state;

    if (!title || !selectedUserName) {
      if (!title) {
        this.setState({
          hasTitle: true,
        });
      }

      if (!selectedUserName) {
        this.setState({
          hasUser: true,
        });
      }
    } else {
      this.setState((state) => ({
        todosFromServer: [
          ...state.todosFromServer,
          {
            title: state.title,
            user: state.user,
            id: state.todosFromServer.length + 1,
            userId: state.user ? state.user.id : 0,
            completed: true,
          },
        ],
        title: '',
        selectedUserName: '',
        user: null,
      }));
    }
  };

  render() {
    const {
      title,
      todosFromServer,
      selectedUserName,
      hasTitle,
      hasUser,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Todos</h1>
        <form onSubmit={this.submitForm} className="app__form">
          <h2 className="app__add">add todo form</h2>
          <label htmlFor="title" className="app__label">
            <h3 className="app__subtitle">create title</h3>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              required
              className="app__input"
              onChange={this.addTitle}
            />
          </label>
          <p className={hasTitle ? 'error' : 'disable'}>Please enter the title</p>
          <select
            name="user"
            required
            className="app__select"
            value={selectedUserName}
            onChange={this.addUser}
          >
            <option value="">Choose a user</option>
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <p className={hasUser ? 'error' : 'disable'}>Please choose a user</p>
          <button
            type="submit"
            className="app__button"
            onClick={this.submitForm}
          >
            Create Todo
          </button>
        </form>
        <TodoList todos={todosFromServer} />
      </div>
    );
  }
}

export default App;
