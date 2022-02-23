import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './Components/TodoList';

type State = {
  todos: Todo[],
  title: string,
  userName: string,
  hasTitleError: boolean,
  hasUserError: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todos],
    title: '',
    userName: '',
    hasTitleError: false,
    hasUserError: false,
  };

  clearState = () => {
    this.setState({
      title: '',
      userName: '',
      hasTitleError: false,
      hasUserError: false,
    });
  };

  validateForm = () => {
    const { title, userName } = this.state;

    if (!userName) {
      this.setState((state) => ({
        hasUserError: !state.hasUserError,
      }));

      return false;
    }

    if (!title) {
      this.setState((state) => ({
        hasTitleError: !state.hasTitleError,
      }));

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = this.validateForm();

    if (isFormValid) {
      const { title, userName } = this.state;
      const newId = this.state.todos.length + 1;
      const newUser: User | null = users.find(user => user.name === userName) || null;

      if (!newUser) {
        return;
      }

      const newTodo = {
        userId: newUser.id,
        id: newId,
        completed: false,
        user: newUser,
        title,
      };

      this.setState((state) => ({
        todos: [...state.todos, newTodo],
      }));

      this.clearState();
    }
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userName: value,
    });
  };

  render() {
    const {
      title,
      userName,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Todos form</h1>
        <form
          action="post"
          onSubmit={this.handleSubmit}
        >
          <section>
            <input
              type="text"
              placeholder="Enter your todo"
              value={title}
              onChange={this.handleChangeTitle}
            />
            {hasTitleError && (
              <span style={{ color: 'red' }}>
                Please enter the title
              </span>
            )}
          </section>
          <br />
          <section>
            <select
              name="user"
              value={userName}
              onChange={this.handleSelect}
            >
              <option>
                Choose a user
              </option>
              {users.map((user) => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserError && (
              <span style={{ color: 'red' }}>
                Please choose a user
              </span>
            )}
          </section>
          <br />
          <button
            className="ui green button"
            type="submit"
          >
            Add ToDo
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
