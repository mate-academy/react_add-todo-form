/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FormEvent } from 'react';
import todosFromServer from './api/todos';
import users from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodo } from './type/type';

type State = {
  todos: PreparedTodo[]
  title: string
  selectedUser: number
  errorTitle: boolean
  errorSelect: boolean
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: todosFromServer,
    title: '',
    selectedUser: 0,
    errorTitle: false,
    errorSelect: false,
  };

  showErrors = () => {
    this.setState(state => ({
      errorTitle: !state.title,
      errorSelect: !state.selectedUser,
    }));
  };

  handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { todos, title, selectedUser } = this.state;

    if (!this.state.title || !this.state.selectedUser) {
      return this.showErrors();
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      userId: selectedUser,
    };

    return this.setState(state => ({
      todos: [...state.todos, newTodo],
      title: '',
      selectedUser: 0,
      errorTitle: false,
      errorSelect: false,
    }));
  };

  handlerChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      errorTitle: false,
    });
  };

  handlerChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: +event.target.value,
      errorSelect: false,
    });
  };

  render() {
    const {
      title,
      selectedUser,
      errorTitle,
      errorSelect,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          action="POST"
          className="App--form"
          onSubmit={this.handlerSubmit}
        >
          <div className="App--title">
            Title:
            {' '}
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Enter todo"
              onChange={this.handlerChangeInput}
            />
            {errorTitle
              && <div>Please enter the title</div>}
          </div>

          <select
            className="App--select"
            name="selectedUser"
            value={selectedUser}
            onChange={this.handlerChangeSelect}
          >
            <option value="0">
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {errorSelect && <div>Please choose a user</div>}

          <button type="submit">
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
