import React from 'react';
import PropTypes from 'prop-types';

import './FormTodos.css';

export class FormTodos extends React.Component {
  state = {
    newTitle: '',
    choseName: 0,
    hasNameError: false,
    hasTitleError: false,
  };

  handleTitleAdd = (event) => {
    this.setState({
      newTitle: event.target.value,
      hasTitleError: false,
    });
  }

  handleChoseName = (event) => {
    this.setState({
      choseName: event.target.value,
      hasNameError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTitle, choseName } = this.state;

    this.setState(state => ({
      hasNameError: !state.newTitle,
      hasTitleError: !state.choseName,
    }));

    if (!newTitle || !choseName) {
      return;
    }

    this.props.addTodos(newTitle, choseName);

    this.setState({
      newTitle: '',
      choseName: 0,
    });
  }

  render() {
    const {
      newTitle,
      choseName,
      hasNameError,
      hasTitleError,
    } = this.state;

    const { users } = this.props;

    return (
      <form
        onSubmit={this.handleFormSubmit}
        className="form"
      >

        <label className="label_input">
          {`Write your task: `}
          <input
            type="text"
            className="input"
            value={newTitle}
            onChange={this.handleTitleAdd}
            placeholder="New title"
          />
          {hasTitleError && (
            <span className="error">
              Please enter the title:)
            </span>
          )}
        </label>

        <label className="label_select">
          {`Choes a name: `}
          <select
            value={choseName}
            onChange={this.handleChoseName}
            className="select"
          >
            <option value={0} className="option">
              Choes a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
                className="option"
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasNameError && (
            <span className="error">
              Please choose a user:)
            </span>
          )}
        </label>

        <button type="submit" className="button">
          Add
        </button>
      </form>
    );
  }
}

FormTodos.propTypes = {
  addTodos: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
