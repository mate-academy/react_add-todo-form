import React from 'react';
import './AddTodoForm.scss';

import usersFromServer from '../../api/users';
import { getUserById } from '../../helpers';

const maxInputLength = 30;
const inputValidetionExpression = /[^\da-zа-яё\s]/gi;

type Props = {
  addTodo: (newTodo: PreparedTodo) => void,
};

type State = {
  todoTitle: string,
  selectedUserId: number;
  isUserSelected: boolean,
  isTitleEntered: boolean,
  isInputValid: boolean,
  isInputLengthCorrect: boolean,
};

export class AddTodoForm extends React.Component<Props, State> {
  state: State = {
    todoTitle: '',
    selectedUserId: 0,
    isUserSelected: true,
    isTitleEntered: true,
    isInputValid: true,
    isInputLengthCorrect: true,
  };

  changeIputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const inputValue: string = value.replace(inputValidetionExpression, '');

    this.setState({
      isTitleEntered: true,
      isInputValid: true,
      isInputLengthCorrect: true,
    });

    if (value.length > maxInputLength) {
      this.setState({ isInputLengthCorrect: false });
    }

    if (inputValidetionExpression.test(value)) {
      this.setState({ isInputValid: false });
    }

    if ((value.length <= maxInputLength) && !(inputValidetionExpression.test(value))) {
      this.setState({
        todoTitle: inputValue,
      });
    }
  };

  selectUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const id = Number(value);

    this.setState({
      selectedUserId: id,
      isUserSelected: true,
    });
  };

  formSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { todoTitle, selectedUserId } = this.state;
    const title = todoTitle.trim();

    this.setState({
      isInputValid: true,
    });

    if (!title.length) {
      this.setState({
        todoTitle: '',
        isTitleEntered: false,
      });
    }

    if (!selectedUserId) {
      this.setState({
        isUserSelected: false,
      });
    }

    if (title.length && selectedUserId) {
      const newTodoId = Math.max(...usersFromServer.map(user => user.id)) + 1;
      const newTodo = {
        userId: selectedUserId,
        id: newTodoId,
        title,
        completed: false,
        user: getUserById(selectedUserId) || null,
      };

      this.props.addTodo(newTodo);

      this.clearForm();
    }
  };

  clearForm = () => {
    this.setState({
      todoTitle: '',
      selectedUserId: 0,
      isUserSelected: true,
      isTitleEntered: true,
      isInputValid: true,
      isInputLengthCorrect: true,
    });
  };

  render() {
    const {
      todoTitle,
      selectedUserId,
      isUserSelected,
      isTitleEntered,
      isInputValid,
      isInputLengthCorrect,
    } = this.state;

    return (
      <div className="form">
        <form
          className="form__content"
          onSubmit={this.formSubmit}
        >
          <p className="form__title">Title:</p>
          <input
            className="form__input"
            type="text"
            value={todoTitle}
            onChange={this.changeIputHandler}
            placeholder="Please input the title..."
          />
          <p className="form__warning">
            {!isInputLengthCorrect && (
              <span className="form__warning-message">{`*Title max length is ${maxInputLength} characters!`}</span>
            )}
            {(!isInputValid && isInputLengthCorrect) && (
              <span className="form__warning-message">*Use only letters, digits or backspaces please!</span>
            )}
            {!isTitleEntered && (
              <span className="form__warning-message">*Please enter a title!</span>
            )}
          </p>
          <p className="form__title form__title--user">User:</p>
          <label htmlFor="userSelect">
            <select
              className="form__input form__input--select"
              id="userSelect"
              value={selectedUserId}
              onChange={this.selectUserHandler}
            >
              <option
                value="0"
                disabled
                selected
                hidden
              >
                ---Choose user---
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <p className="form__warning">
            {!isUserSelected && (
              <span className="form__warning-message">*Please choose the user!</span>
            )}
          </p>
          <div className="form__submit">
            <button type="submit" className="form__button">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}
