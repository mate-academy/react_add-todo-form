import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

type State = {
  appTodos: Todo[];
  userId: number,
  todoTitle: string,
  hasUserError: boolean,
  hasTitleError: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    appTodos: [...todos],
    userId: 0,
    todoTitle: '',
    hasUserError: false,
    hasTitleError: false,
  };

  getNewTodo = () => {
    const { todoTitle, userId, appTodos } = this.state;

    return ({
      userId: +userId,
      id: appTodos.length + 1,
      title: todoTitle,
      completed: false,
    });
  };

  addTodo = (todo: Todo) => {
    this.setState(state => ({
      appTodos: [...state.appTodos, todo],
    }));
  };

  handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.currentTarget.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.currentTarget.value),
      hasUserError: false,
    });
  };

  clearState = () => {
    this.setState({
      userId: 0,
      todoTitle: '',
      hasUserError: false,
      hasTitleError: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { todoTitle, userId } = this.state;
    const newTodo = this.getNewTodo();

    if (todoTitle && userId) {
      this.addTodo(newTodo);
      this.clearState();
    } else if (!todoTitle) {
      this.setState({
        hasTitleError: true,
      });
    } else if (!userId) {
      this.setState({
        hasUserError: true,
      });
    }
  };

  render() {
    const {
      hasUserError,
      hasTitleError,
      todoTitle,
      userId,
      appTodos,
    } = this.state;

    return (
      <div className="App content">
        <h1>Add todo form</h1>

        <form onSubmit={this.handleSubmit}>

          <input
            type="text"
            className="input"
            placeholder="Title"
            value={todoTitle}
            onChange={this.handleTodoTitle}
          />

          {hasTitleError
              && <span className="box notification is-danger">Please enter the title</span>}

          <select
            className="select"
            value={userId}
            onChange={this.handleUserChange}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError
              && <span className="box notification is-danger">Please choose a user</span>}

          <button type="submit" className="button">
            Add
          </button>
        </form>

        <TodoList todos={appTodos} />
      </div>
    );
  }
}

export default App;
