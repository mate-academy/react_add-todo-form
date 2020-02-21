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

  buttonSubmit = (event) => {
    event.preventDefault();
    const { selectedUserId, id, inputTitle, users } = this.state;
    const { addTodo } = this.props;
    let error = false;
    const pattern = /[^\d\s\w]/g;

    if (inputTitle.trim().length < 3
      || inputTitle.trim().length > 30
      || pattern.test(inputTitle)
    ) {
      error = true;
      this.setState({
        inputError: true,
      });
    }

    if (selectedUserId === 0) {
      error = true;
      this.setState({
        selectError: true,
      });
    }

    if (!error) {
      addTodo({
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
            Please enter a valid title( Allow entering`spaces`,
              alphanumeric characters
                and minimum length 3 characters).
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
