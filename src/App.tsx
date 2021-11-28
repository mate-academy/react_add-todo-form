import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

interface State {
  title: string,
  user: string,
  titleError: boolean,
  userError: boolean,
  restrictedSymbols: boolean,
}

type GenericEvent = HTMLInputElement | HTMLSelectElement;

const todoCopy = [...todos];

export class App extends React.Component<{}, State> {
  state = {
    title: '',
    user: '',
    titleError: false,
    userError: false,
    restrictedSymbols: false,
  };

  errorCheck = () => {
    this.setState(state => ({
      titleError: !state.title,
      userError: !state.user,
    }));
  };

  titleChange = (event: React.ChangeEvent<GenericEvent>) => {
    this.setState({
      title: event.target.value,
      titleError: false,
      restrictedSymbols: false,
    });
  };

  userChange = (event: React.ChangeEvent<GenericEvent>) => {
    this.setState({
      user: event.target.value,
      userError: false,
      restrictedSymbols: false,
    });
  };

  addTodo = () => {
    const { title, user } = this.state;

    if (!title || !user) {
      return this.errorCheck();
    }

    const findUser = users.find(person => person.name === this.state.user);

    const newTodo = {
      userId: findUser ? findUser.id : -1,
      id: todoCopy.length + 1,
      title: this.state.title,
      completed: false,
    };

    this.setState({
      title: '',
      user: '',
    });

    return todoCopy.push(newTodo);
  };

  checkSymbols = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.key.match(/[a-zа-яё]/gi)) {
      this.setState({ restrictedSymbols: true });
      event.preventDefault();
    }
  };

  render() {
    const { titleError, userError, restrictedSymbols } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="Todo-Form"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="text"
            name="title"
            className="Todo-Form__todo-title"
            placeholder="Enter Todo Title"
            value={this.state.title}
            onChange={this.titleChange}
            onKeyPress={this.checkSymbols}
          />
          <select
            name="user"
            value={this.state.user}
            className="Todo-Form__select-user"
            onChange={this.userChange}
          >
            <option>Select User</option>
            {users.map(person => (
              <option key={person.id}>{person.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="Todo-Form__add-todo"
            onClick={this.addTodo}
          >
            Add Todo
          </button>
        </form>
        <div className="Form__Warning">
          {titleError
            && (
              <div
                className="Form__Warning--title"
              >
                PLEASE ENTER THE TITLE
              </div>
            )}
          {userError
            && (
              <div
                className="Form__Warning--select"
              >
                PLEASE CHOOSE A USER
              </div>
            )}
          {restrictedSymbols
            && (
              <div
                className="Form__Warning--symbols"
              >
                PLEASE ENTER LATIN AND/OR CYRILLIC SYMBOLS ONLY
              </div>
            )}
        </div>

        <TodoList todos={todoCopy} />
      </div>
    );
  }
}
