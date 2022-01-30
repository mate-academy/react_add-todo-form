import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

type State = {
  todos: Todo[];
  userId: number,
  todoTitle: string,
  isUserEmpty: boolean,
  isTitleEmpty: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todos],
    userId: 0,
    todoTitle: '',
    isUserEmpty: true,
    isTitleEmpty: true,
  };

  getNewTodo = () => {
    const { todoTitle, userId } = this.state;

    return ({
      userId: +userId,
      id: this.state.todos.length + 1,
      title: todoTitle,
      completed: false,
    });
  };

  addTodo = (todo: Todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  };

  handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.currentTarget.value,
      isTitleEmpty: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.currentTarget.value),
      isUserEmpty: false,
    });
  };

  clearState = () => {
    this.setState({
      userId: 0,
      todoTitle: '',
      isUserEmpty: true,
      isTitleEmpty: true,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isUserEmpty, isTitleEmpty } = this.state;

    if (isUserEmpty
        || isTitleEmpty
        || this.state.userId === 0
    ) {
      return;
    }

    this.addTodo(this.getNewTodo());
    this.clearState();
  };

  render() {
    const {
      isUserEmpty,
      isTitleEmpty,
      todoTitle,
      userId,
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

          {isTitleEmpty
              && <span className="box notification is-danger">Please enter the title</span>}

          <select
            className="select"
            value={userId}
            onChange={this.handleUserChange}
          >
            <option value="0">
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserEmpty
              && <span className="box notification is-danger">Please choose a user</span>}

          <button type="submit" className="button">
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
