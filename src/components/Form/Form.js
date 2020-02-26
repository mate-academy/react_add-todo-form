import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
import 'bulma';

export class Form extends React.Component {
  state = {
    users: [...this.props.users],
    id: 3,
    selectedUserId: 0,
    inputTitle: '',
    inputError: false,
    selectError: false,
  };

  inputTitleChange = (event) => {
    const { target: { value } } = event;

    this.setState({
      inputTitle: value,
      inputError: false,
    });
  };

  selectChange = (event) => {
    const { target: { value } } = event;

    this.setState({
      selectedUserId: +value,
      selectError: false,
    });
  };

  submitValidation = () => {
    const { inputTitle, selectedUserId } = this.state;
    const pattern = /[^\s\d\w]/g;

    return (selectedUserId === 0
      || (pattern.test(inputTitle) || inputTitle === ''));
  };

  buttonSubmit = (event) => {
    event.preventDefault();
    const pattern = /[^\s\d\w]/g;
    const {
      selectedUserId,
      id,
      inputTitle,
      users,
    } = this.state;

    if (this.submitValidation()) {
      this.setState(prevState => ({
        ...prevState.state,
        inputError: Boolean(pattern.test(inputTitle) || inputTitle === ''),
        selectError: Boolean(selectedUserId === 0),
      }));
    } else {
      this.props.addTodo({
        userId: selectedUserId.id,
        id,
        title: inputTitle,
        completed: false,
        user: users.find(user => user.id === selectedUserId),
      });
      this.setState(prevState => ({
        selectedUserId: 0,
        inputTitle: '',
        id: prevState.id + 1,
        inputError: false,
        selectError: false,
      }));
    }
  };

  render() {
    const {
      users,
      selectedUserId,
      inputTitle,
      inputError,
      selectError,
    } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.buttonSubmit}
        >
          <label className="label">
            <input
              className="input"
              type="text"
              name="todo"
              value={inputTitle}
              onChange={this.inputTitleChange}
            />
          </label>
          {inputError && (
            <span className="form__error form__error-title">
              Please enter a valid title.
            </span>
          )}
          <select
            id="select"
            className="form__select select"
            value={selectedUserId}
            onChange={this.selectChange}
            placeholder="Write title"
          >
            <option value={0}>
              Select user
            </option>
            {users.map(user => (
              <option
                className="option"
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {selectError && (
            <span className="form__error form__error-user">
              Please choose a user.
            </span>
          )}
          <button
            className="form__button button"
            type="submit"
          >
            Add TODO
          </button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};
