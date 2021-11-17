import React from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed?: boolean,
};

type State = {
  todos: Todo[],
  id: number,
  title: string,
  userId: number,
  hasTitleError: boolean,
  hasUserError: boolean,
};
class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todos],
    id: 3,
    title: '',
    userId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { id, title, userId } = this.state;

    const noError = this.checkError();

    if (!noError) {
      return;
    }

    const newTodo = {
      id,
      title,
      userId,
    };

    this.setState(prevState => ({
      id: prevState.id + 1,
      title: '',
      userId: 0,
      todos: [...prevState.todos, newTodo],
    }));
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.target.value),
    });
  };

  checkError = () => {
    this.setState((currentState) => {
      const { title, userId } = currentState;

      return {
        hasTitleError: !title,
        hasUserError: !userId,
      };
    });

    return Boolean(this.state.title && this.state.userId);
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          className="App__form"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="input-title" className="App__input">
            <input
              id="input-title"
              type="text"
              placeholder="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            {this.state.hasTitleError && !this.state.title && <p>Please enter the title</p>}
          </label>

          <label htmlFor="select-user" className="App__select">
            <select
              id="select-user"
              onChange={this.handleUser}
              value={this.state.userId}
            >
              <option>
                Choos user
              </option>
              {users.map(user => <option value={user.id}>{user.name}</option>)}
            </select>
            {this.state.hasUserError && !this.state.userId && <p>Please choose a user</p>}
          </label>

          <button
            type="submit"
            className="App__button"
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
