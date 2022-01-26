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

    if (!userName || !title) {
      this.setState({
        hasTitleError: true,
        hasUserError: true,
      });

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
        title: '',
        userName: '',
      }));

      this.clearState();
    }
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      hasTitleError: false,
    });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userName: value,
      hasUserError: false,
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
              <span>
                Please enter your ToDo
              </span>
            )}
          </section>

          <section>
            <select
              name="user"
              value={userName}
              onChange={this.handleSelect}
            >
              <option>
                Please choose a user
              </option>
              {users.map((user) => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserError && (
              <span>
                Please choose user
              </span>
            )}
          </section>
          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
