import React from 'react';
import classNames from 'classnames/bind';

import './form.scss';

interface Props {
  addTodo: (newTodo: Todo) => void;
  users: User[];
  lastId: number;
}

interface State {
  inputTitle: string;
  selectUserId: number;
  hasInputError: boolean;
  hasSelectError: boolean;
}

export class Form extends React.Component<Props, State> {
  state: State = {
    inputTitle: '',
    selectUserId: 0,
    hasInputError: false,
    hasSelectError: false,
  };

  inputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      inputTitle: value.replaceAll(/[^\w\d а-яёъь]/ig, ''),
      hasInputError: false,
    });
  };

  selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    this.setState({
      selectUserId: Number(value),
      hasSelectError: false,
    });
  };

  validation = (selectUserId: number, inputTitle: string) => {
    if (selectUserId === 0 || !inputTitle) {
      this.setState({
        hasInputError: !inputTitle,
        hasSelectError: !selectUserId,
      });

      return false;
    }

    return true;
  };

  resetInputs = () => {
    this.setState({
      inputTitle: '',
      selectUserId: 0,
      hasInputError: false,
      hasSelectError: false,
    });
  };

  formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { users, addTodo, lastId } = this.props;
    const {
      selectUserId,
      inputTitle,
    } = this.state;

    if (this.validation(selectUserId, inputTitle)) {
      const newTodo: Todo = {
        userId: selectUserId,
        id: lastId,
        title: inputTitle,
        completed: false,
        user: users.find(user => user.id === selectUserId) || null,
      };

      addTodo(newTodo);
      this.resetInputs();
    }
  };

  render() {
    const { users } = this.props;

    const {
      hasInputError,
      hasSelectError,
      inputTitle,
      selectUserId,
    } = this.state;

    return (
      <form
        onSubmit={this.formSubmit}
        className="form"
      >
        <h1 className="form__title">
          Create new TODO
        </h1>

        <label htmlFor="title">
          <span className="form__input-title">
            Title:
          </span>
          <input
            className={classNames('form__input', { 'form__input--error': hasInputError })}
            type="text"
            name="inputTitle"
            placeholder="Todo"
            id="title"
            value={inputTitle}
            onChange={this.inputTitle}
          />
        </label>
        {hasInputError && (
          <span className="form__error-text">
            Please enter the title
          </span>
        )}

        <label htmlFor="select">
          <span className="form__input-title">
            User:
          </span>
          <select
            className={classNames('form__select', { 'form__select--error': hasSelectError })}
            name="selectUser"
            id="select"
            value={selectUserId}
            onChange={this.selectUser}
          >
            <option value="0">Choose User</option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>

          {hasSelectError && (
            <span className="form__error-text">
              Please choose a user
            </span>
          )}
          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </label>
      </form>
    );
  }
}
