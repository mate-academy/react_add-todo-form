import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type State = {
  title: string,
  todos: Todo[],
  selectedUser: User | null,
  selectValue: string,
  isUserSelected: boolean,
  isTitleEntered: boolean,
  showTitleFlag: boolean,
  showUserSelectFlag: boolean,
  isInputValid: boolean,
};

const maxInputLength = 20;
const validSymbols = 'qwertyuiopasdfghjklzxcvbnm ';

export class App extends React.PureComponent<{}, State> {
  state: State = {
    title: '',
    todos: todosFromServer,
    selectedUser: null,
    selectValue: '',
    isUserSelected: false,
    isTitleEntered: false,
    showTitleFlag: false,
    showUserSelectFlag: false,
    isInputValid: true,
  };

  titleAddHandler = (text: string) => {
    const inputValue: string = text.replace(/[^a-zа-яё\s]/gi, '');

    this.setState({ isInputValid: true });

    text.split('').forEach(char => {
      if (!validSymbols.includes(char.toLowerCase())) {
        this.setState({ isInputValid: false });
      }
    });

    this.setState({
      title: inputValue,
      isTitleEntered: text.length !== 0,
      showTitleFlag: false,
    });
  };

  selectUserHandler = (value: string) => {
    const id = +value;
    const user = usersFromServer.find(person => person.id === id);

    if (user) {
      const preparedUser = {
        id: user?.id,
        name: user?.name,
      };

      this.setState(state => ({
        selectedUser: preparedUser || state.selectedUser,
        selectValue: value,
        isUserSelected: true,
        showUserSelectFlag: false,
      }));
    }
  };

  addTodoHandler = () => {
    const {
      title,
      todos,
      selectedUser,
      isUserSelected,
      isTitleEntered,
    } = this.state;

    const todosIdentificators = todos.map(todo => todo.id);
    const newTodoIdentificator = Math.max(...todosIdentificators) + 1;
    let titleCheck = isTitleEntered;

    this.setState({
      showTitleFlag: true,
      showUserSelectFlag: true,
      isInputValid: true,
    });

    this.setState({ title: title.trim() });

    if (title.trim().length === 0) {
      this.setState({ isTitleEntered: false });
      titleCheck = false;
    }

    if (selectedUser && isUserSelected && titleCheck) {
      const preparedTodo: Todo = {
        id: newTodoIdentificator,
        title,
        userId: selectedUser?.id,
      };

      this.setState(state => ({
        todos: [...state.todos, preparedTodo],
      }));
    }
  };

  clearForm = () => {
    this.setState({
      title: '',
      selectedUser: null,
      selectValue: '',
      isTitleEntered: false,
      isUserSelected: false,
      showTitleFlag: false,
      showUserSelectFlag: false,
      isInputValid: true,
    });
  };

  submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.clearForm();
  };

  render() {
    const {
      title,
      todos,
      selectValue,
      isUserSelected,
      isTitleEntered,
      showTitleFlag,
      showUserSelectFlag,
      isInputValid,
    } = this.state;

    return (
      <>
        <form
          action="#"
          method="post"
          onSubmit={event => this.submit(event)}
          id="form"
        >
          <p>Title:</p>
          <input
            type="text"
            value={title}
            onChange={event => this.titleAddHandler(event.target.value)}
            placeholder="Please enter a title..."
            required
            maxLength={maxInputLength}
          />
          {!isInputValid && (
            <span>Use the correct characters: A-z А-я</span>
          )}
          {title.length === maxInputLength && (
            <span>{`Max title length is ${maxInputLength} characters`}</span>
          )}
          {(showTitleFlag && !isTitleEntered) && (
            <span>Please enter a title</span>
          )}
          <p>User:</p>
          <div>
            <label htmlFor="select">
              <select
                name="select"
                id="select"
                onChange={event => this.selectUserHandler(event.target.value)}
                value={selectValue}
                required
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                >
                  ---Choose user---
                </option>
                {usersFromServer.map(user => (
                  <option value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            {(showUserSelectFlag && !isUserSelected) && (
              <span>Please choose the user</span>
            )}
            <div>
              <button
                type="submit"
                onClick={this.addTodoHandler}
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <ol>
          {todos.map(todo => (
            <li key={todo.id}>
              <p>{`Task id: ${todo.id}`}</p>
              <p>{`Task title: ${todo.title}`}</p>
              <p>{`User: ${usersFromServer.find(person => person.id === todo.userId)?.name}`}</p>
            </li>
          ))}
        </ol>
      </>
    );
  }
}
