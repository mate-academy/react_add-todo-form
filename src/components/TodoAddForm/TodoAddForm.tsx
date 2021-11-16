import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import './TodoAddForm.css';

interface Props {
  todos: Todo[],
  users: User[],
  onAdd: (newTitle: string, selectedUser: string) => void;
}

interface State {
  newTitle: string,
  selectedUser: string,
  inputTitleError: boolean,
  selectUserError: boolean,
  isFormShown: boolean;
}

export class TodoAddForm extends React.Component<Props, State> {
  state = {
    newTitle: '',
    selectedUser: '',
    inputTitleError: false,
    selectUserError: false,
    isFormShown: false,
  };

  showForm = () => {
    this.setState({ isFormShown: true });
  };

  titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
      inputTitleError: false,
    });
  };

  userChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value,
      selectUserError: false,
    });
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { newTitle, selectedUser } = this.state;

    this.checkError();

    if (newTitle && selectedUser) {
      onAdd(newTitle, selectedUser);
      this.setState({
        selectedUser: '',
        newTitle: '',
      });
    }
  };

  checkError = () => {
    this.setState((prevState) => {
      const { selectedUser, newTitle } = prevState;

      return {
        ...prevState,
        inputTitleError: !newTitle,
        selectUserError: !selectedUser,
      };
    });
  };

  render() {
    const {
      selectedUser,
      newTitle,
      selectUserError,
      inputTitleError,
      isFormShown,
    } = this.state;

    const { users } = this.props;

    return (
      isFormShown ? (
        <form className="form" onSubmit={this.submitHandler}>
          <div className="form__input-container">
            <label className="form__label" htmlFor="todoTitle">
              <input
                type="text"
                placeholder="Task title"
                value={newTitle}
                onChange={this.titleChangeHandler}
                id="todoTitle"
                className={classNames(
                  'form__input', {
                    'form__input--theme-error': inputTitleError,
                  },
                )}
              />
              {inputTitleError && (
                <span className="form__input-message">
                  Please enter the title
                </span>
              )}
            </label>
          </div>

          <div className="form__select-container">
            <select
              value={selectedUser}
              onChange={this.userChangeHandler}
              className={classNames(
                'form__select', {
                  'form__select--theme-error': selectUserError,
                },
              )}
            >
              <option className="form__select-option" value="">Choose user</option>
              {users.map(user => (
                <option className="form__select-option" key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {selectUserError && (
              <span className="select__error-message">
                Please choose a user
              </span>
            )}
          </div>
          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>
      )
        : (
          <button
            type="button"
            className="button-start"
            onClick={this.showForm}
          >
            Add new ToDo
          </button>
        ));
  }
}
