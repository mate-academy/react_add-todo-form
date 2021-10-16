/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';

import './App.scss';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';

import TodoTypes from './types/TodoTypes';

type State = {
  todos: TodoTypes[];
  title: string;
  name: string;
  choosenUser: string;
  errorTitle: string;
};

class App extends React.Component<{}, State> {
  state = {
    todos: [...todos],
    title: '',
    name: '',
    choosenUser: '',
    errorTitle: '',
  };

  addTodo = () => {
    const { title, name } = this.state;

    if (!title) {
      this.setState({
        errorTitle: 'Please enter the title',
      });
    }

    if (!users.some(user => name === user.name)) {
      this.setState({
        choosenUser: 'Please choose a user',
      });
    }

    if (
      users.some(user => name === user.name)
      && title
    ) {
      this.setState((selectState) => {
        const createdNewId = selectState.todos[selectState.todos.length - 1].id + 1;
        const createdNewTitle = selectState.title;
        const currentUserIndex = users.findIndex((user) => user.name === selectState.name);
        const newTodo = {
          id: createdNewId,
          title: createdNewTitle,
          userId: users[currentUserIndex].id,
        };

        return {
          todos: [...selectState.todos, newTodo],
          title: '',
          errorTitle: '',
          choosenUser: '',
        };
      });
    }
  };

  render() {
    const {
      todos,
      title,
      name,
      choosenUser,
      errorTitle,
    } = this.state;

    return (
      <div className="App">
        <div className="App__container">
          <h1 className="App__title">Add todo form</h1>
          <form
            className="App__form"
            onSubmit={(event) => {
              event.preventDefault();
              this.addTodo();
            }}
          >
            <div className="App__select-box">
              <select
                name="users"
                value={name}
                className="App__select"
                onChange={(event) => this.setState({
                  name: event.target.value,
                  choosenUser: '',
                })}
              >
                <option className="App__select-item">Choose a user</option>
                {users.map(user => {
                  return (
                    <option>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="App__select-error">
              {choosenUser
                && choosenUser}
            </div>
            <div className="App__input-box">
              <input
                type="text"
                className="App__input"
                placeholder="Enter a text..."
                value={title}
                onChange={(event) => {
                  this.setState({
                    title: event.target.value,
                    errorTitle: '',
                  });
                }}
              />
            </div>
            <div className="App__input-error">
              {errorTitle
                && errorTitle}
            </div>
            <div className="App__button-box">
              <button
                type="submit"
                className="App__button"
              >
                Add
              </button>
            </div>
          </form>
          <p>
            <TodoList todos={todos} />
          </p>
        </div>
      </div>

    );
  }
}

export default App;
