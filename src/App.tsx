import React from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { TodoPrepared } from './types/TodoPrepared';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId);

  return {
    user: user || null,
    ...todo,
  };
});

type State = {
  usersCopy: User[],
  todosCopy: TodoPrepared[],
  todoTitle: string,
  selectedUserId: number,
  isSelectUser: boolean,
  isEnterTitle: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    usersCopy: [...users],
    todosCopy: [...preparedTodos],
    todoTitle: '',
    selectedUserId: 0,
    isSelectUser: false,
    isEnterTitle: false,
  };

  handleValidation = () => {
    if (!this.state.todoTitle) {
      this.setState({
        isEnterTitle: true,
      });
    } else if (!this.state.selectedUserId) {
      this.setState({
        isSelectUser: true,
      });
    }

    return this.state.selectedUserId && this.state.todoTitle;
  };

  handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.target.value,
      isEnterTitle: false,
    });
  };

  handleSelecte = (event :React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: Number(event.target.value),
      isSelectUser: false,
    });
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.handleValidation()) {
      return;
    }

    this.setState((state) => ({
      todoTitle: '',
      selectedUserId: 0,
      isSelectUser: false,
      isEnterTitle: false,
      todosCopy: [
        ...state.todosCopy,
        {
          userId: state.selectedUserId,
          id: state.todosCopy.sort((a, b) => a.id - b.id)[state.todosCopy.length - 1].id,
          title: state.todoTitle,
          completed: false,
          user: users.find(person => person.id === state.selectedUserId) || null,
        },
      ],
    }));
  };

  render() {
    const {
      todoTitle,
      selectedUserId,
      isSelectUser,
      isEnterTitle,
      usersCopy,
      todosCopy,
    } = this.state;

    return (
      <div className="App">
        <div className="App__form-wrapper">
          <form className="App__form" onSubmit={this.handleSubmit}>
            <label className="App__title" htmlFor="title">
              Enter todo title:
              <input
                id="title"
                className="App__input-title"
                type="text"
                name="title"
                placeholder="Todo title"
                onChange={this.handleAddTitle}
                value={todoTitle}
              />
              <span className={classNames('App__error', { 'App__error--active': isEnterTitle })}>
                Please enter the title
              </span>
            </label>

            <label className="App__select-user" htmlFor="users">
              Select user:
              <select
                className="App__select"
                name="users"
                id="users"
                onChange={this.handleSelecte}
                value={selectedUserId}
              >
                <option
                  className="App__option"
                  value="0"
                  key="0"
                >
                  Choose a user
                </option>
                {
                  usersCopy.map(user => (
                    <option
                      className="App__option"
                      value={user.id}
                      key={user.id}
                    >
                      {user.name}
                    </option>
                  ))
                }
              </select>
              <span className={classNames('App__error', { 'App__error--active': isSelectUser })}>
                Please choose a user
              </span>
            </label>

            <button
              className="App__button"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
        <div className="App__todos-wrapper">
          <TodoList todoList={todosCopy} />
        </div>
      </div>
    );
  }
}

export default App;
