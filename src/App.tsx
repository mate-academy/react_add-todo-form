import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { todos } from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { User } from './types/User';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  todos: Todo[],
  title: string,
  user: User | null,
  selectUserName: string,
  needShowTitleError: boolean,
  needShowUserError: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    selectUserName: '',
    title: '',
    user: null,
    needShowTitleError: false,
    needShowUserError: false,
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      needShowTitleError: false,
    });
  };

  addUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const selectedUser = users.find(user => user.name === value);

    this.setState({
      selectUserName: value,
      user: selectedUser || null,
    });
  };

  submitForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const {
      title,
    } = this.state;

    if (!title) {
      this.setState({
        needShowTitleError: true,
      });
    } else if (!this.state.user) {
      this.setState({
        needShowUserError: true,
      });
    } else {
      this.setState((state) => ({
        todos: [
          ...state.todos,
          {
            title: state.title,
            user: state.user,
            id: state.todos.length + 1,
            userId: state.user ? state.user.id : 0,
            completed: true,
          },
        ],
        title: '',
        selectUserName: '',
        user: null,
      }));
    }
  };

  render() {
    const {
      title,
      selectUserName,
      needShowTitleError,
      needShowUserError,
    } = this.state;

    return (
      <div className="app">
        <form onSubmit={this.submitForm} className="app__form">
          <h1 className="app__title">Add todo form</h1>
          <label htmlFor="title" className="app__label">
            <h2 className="app__subtitle">create title</h2>
            <input
              id="title"
              className="app__input"
              type="text"
              title="Enter your info"
              name="title"
              value={title}
              onChange={this.addTitle}
            />
          </label>
          <select
            name="user"
            className="app__select-name"
            value={selectUserName}
            onChange={this.addUser}
          >
            <option value="">Choose a user</option>
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {needShowTitleError && <span id="error" className="app__error">Please enter the title</span>}
          {needShowUserError && <span id="error" className="app__error">Please choose a user</span>}

          <button
            type="submit"
            className="app__btn"
          >
            Create Todo
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
