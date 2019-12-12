import React from 'react';
import PropTypes from 'prop-types';
import users from './api/users';

class NewTodo extends React.Component {
  state = {
    textInInput: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasNameError: false,
  };

  choosePerson = (e) => {
    this.setState({
      selectedUserId: +(e.target.value),
      hasNameError: false,
    });
  };

  changeInput = (e) => {
    this.setState({
      textInInput: e.target.value,
      hasTitleError: false,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { textInInput, selectedUserId } = this.state;

    if (!textInInput || !selectedUserId) {
      this.setState({
        hasTitleError: !textInInput,
        hasNameError: !selectedUserId,
      });

      return;
    }

    this.props.addTodo(textInInput, selectedUserId);
    this.setState({
      textInInput: '',
      selectedUserId: 0,
    });
  };

  render() {
    const {
      textInInput, selectedUserId,
      hasTitleError, hasNameError,
    } = this.state;

    return (
      <form onSubmit={this.submitForm}>
        <select
          value={selectedUserId}
          onChange={this.choosePerson}
        >
          <option value="0">Select a person</option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <br />
        {hasTitleError && (
          <span className="form-error">Please enter a title</span>
        )}
        <br />
        <input
          type="text"
          value={textInInput}
          onChange={this.changeInput}
        />
        <br />
        <button type="submit">save</button>
        <br />
        {hasNameError && (
          <span className="form-error">Please select a person</span>
        )}
      </form>
    );
  }
}

NewTodo.propTypes = { addTodo: PropTypes.func.isRequired };

export default NewTodo;
