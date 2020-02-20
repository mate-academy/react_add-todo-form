import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
// import 'bulma';

export class Form extends React.Component {
  state = {
    users: [...this.props.users],
    id: 3,
    inputUser: '',
    inputTitle: '',
    inputError: false,
    selectError: false,
  };

  inputTitleChange = (event) => {
    this.setState({
      inputTitle: event.target.value,
      inputError: false,
    });
  };

  selectChange = (event) => {
    this.setState({
      inputUser: event.target.value,
      selectError: false,
    });
  };

  buttonSubmit = (event) => {
    event.preventDefault();
    const { inputUser, id, inputTitle, users } = this.state;
    const { addTodo } = this.props;
    let error = false;

    if (inputTitle.trim().length < 3 || inputTitle.trim().length > 30) {
      error = true;
      this.setState({
        inputError: true,
      });
    }

    if (inputUser < 2) {
      error = true;
      this.setState({
        selectError: true,
      });
    }

    if (!error) {
      addTodo({
        userId: inputUser.id,
        id,
        title: inputTitle,
        completed: false,
        user: users.find(user => user.name === inputUser),
      });
      this.setState(prevState => ({
        inputUser: '',
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
      inputUser,
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
            Please enter the title
            </span>
          )}
          <select
            id="select"
            className="form__select select"
            value={inputUser}
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
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          {selectError && (
            <span className="form__error form__error-user">
            Please choose a user
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
