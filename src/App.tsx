import React from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import './App.scss';
import { ToDoList } from './components/ToDoList';
import { ToDoWithoutUser } from './types/ToDoWithoutUser';
import { User } from './types/User';

interface State {
  todos: ToDoWithoutUser[],
  title: string,
  userId: number,
  hasUserError: boolean,
  hasTitleError: boolean,
  hasSymbolError: boolean,
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => userId === user.id)
      || null;
}

class App extends React.PureComponent<{}, State> {
  state = {
    todos: [...todosFromServer],
    title: '',
    userId: 0,
    hasUserError: false,
    hasTitleError: false,
    hasSymbolError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      const {
        todos,
        title,
        userId,
      } = prevState;

      if (!title || !userId) {
        return {
          ...prevState,
          hasTitleError: !title,
          hasUserError: !userId,
          hasSymbolError: false,
        };
      }

      const maxId: number = Math.max(...todos.map(todo => todo.id));
      const newToDo = {
        id: maxId + 1,
        userId,
        title,
        completed: false,
      };

      return {
        todos: [
          newToDo,
          ...todos,
        ],
        title: '',
        userId: 0,
        hasUserError: !userId,
        hasTitleError: !title,
        hasSymbolError: false,
      };
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/[^\w|\s]/.test(event.target.value)) {
      return this.setState({
        hasSymbolError: true,
        hasTitleError: false,
      });
    }

    return this.setState({
      title: event.target.value,
      hasSymbolError: false,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      hasUserError: false,
    });
  };

  render() {
    const {
      todos,
      title,
      userId,
      hasTitleError,
      hasSymbolError,
      hasUserError,
    } = this.state;

    const visibleToDo = todos.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    }));

    return (
      <div className="App">
        <h1 className="App-Title">List of what need to do</h1>
        <form
          onSubmit={this.handleFormSubmit}
          className="App-AddForm"
        >
          <input
            type="text"
            value={title}
            onChange={this.handleTitleChange}
            className="App-AddText"
          />
          <select
            onChange={this.handleUserChange}
            value={userId}
            className="App-AddSelect"
          >
            <option
              key={0}
              value={0}
              className="App-AddOption"
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="App-AddButton"
          >
            Add
          </button>
        </form>
        <div className="App-Errors">
          <p className="App-TextError">
            {hasTitleError && 'Please enter the title'}
            {hasSymbolError && 'use only letters and digits'}
          </p>
          <p className="App-UserError">
            {hasUserError && 'Choose a user'}
          </p>
        </div>
        <ToDoList todos={visibleToDo} />
      </div>
    );
  }
}

export default App;
