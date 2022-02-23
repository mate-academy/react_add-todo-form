import React from 'react';
import users from '../api/users';

interface State {
  inputValue: string,
  userName: string,
  hasUserError: boolean,
  hasTitleError: boolean,
}

interface Props {
  todos: Todo[],
  addTodo: (newTodo: Todo) => void;
}

export class AddGoodForm extends React.Component<Props, State> {
  state: State = {
    inputValue: '',
    userName: '',
    hasUserError: false,
    hasTitleError: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserNameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userName: event.target.value,
      hasUserError: false,
    });
  };

  getMaxId = () => {
    const maxValueId = this.props.todos.reduce((previousValue, currentValue) => (
      previousValue.id > currentValue.id ? previousValue : currentValue
    ));

    return maxValueId.id + 1;
  };

  getNewTodo = () => {
    const { userName, inputValue } = this.state;
    const person: User | null = users.find(user => user.name === userName) || null;

    if (!person) {
      return null;
    }

    const newTodo: Todo = {
      userId: person.id,
      id: this.getMaxId(),
      title: inputValue,
      completed: false,
      user: person,
    };

    return newTodo;
  };

  clearState = () => {
    this.setState({
      inputValue: '',
      userName: '',
      hasTitleError: false,
      hasUserError: false,
    });
  };

  validateForm = () => {
    const { userName, inputValue } = this.state;

    if (!userName || !inputValue.trim()) {
      this.setState({
        hasUserError: !userName,
        hasTitleError: !inputValue.trim(),
      });

      return false;
    }

    return true;
  };

  handleAddTodo = () => {
    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newTodo = this.getNewTodo();

      if (!newTodo) {
        return;
      }

      this.props.addTodo(newTodo);

      this.clearState();
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  render() {
    const { inputValue, hasTitleError, hasUserError } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="query"
          className="input"
          value={inputValue}
          placeholder="input title"
          onChange={this.handleTitleChange}
        />

        <select
          name="person"
          className="list"
          value={this.state.userName}
          onChange={this.handleUserNameSelect}
        >
          <option>Choose user</option>
          {users.map(user => (
            <option key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit" onClick={this.handleAddTodo}>
          Add
        </button>
        <div>
          {hasUserError && <span>Choose a user</span>}
          <br />
          {hasTitleError && <span>Choose a title</span>}
        </div>
      </form>
    );
  }
}
