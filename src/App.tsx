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
  hasNoTitle: boolean,
  hasNoUser: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    todosFromServer: preparedTodo,
    selectedUserName: '',
    title: '',
    user: null,
    hasNoTitle: false,
    hasNoUser: false,
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      hasNoTitle: false,
    });
  };

  addUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const selectedUser = users.find(user => user.name === value);

    this.setState({
      selectedUserName: value,
      user: selectedUser || null,
      hasNoUser: false,
    });
  };

  submitForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const {
      title,
      selectedUserName,
    } = this.state;

    if (!title) {
      this.setState({
        hasNoTitle: true,
      });
    } else if (!selectedUserName) {
      this.setState({
        hasNoUser: true,
      });
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
      hasNoTitle,
      hasNoUser,
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
              // required
              className="app__input"
              onChange={this.addTitle}
            />
          </label>
          <p className={hasNoTitle ? 'error' : 'disable'}>
            Please enter the title
          </p>
          <select
            name="user"
            // required
            className="app__select"
            value={selectedUserName}
            onChange={this.addUser}
          >
            <option value="">Choose a user</option>
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <p className={hasNoUser ? 'error' : 'disable'}>
            Please choose a user
          </p>
          <button
            type="submit"
            className="app__button"
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
