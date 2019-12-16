import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectedUserId: 0,

    hasInputError: false,
    hasPersonError: false,

  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      hasInputError: false,
    });
  };

  handleSelect = (event) => {
    this.setState({
      selectedUserId: event.target.value,
      hasPersonError: false,
    });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();

    const { inputValue, selectedUserId } = this.state;

    if (!inputValue || !selectedUserId) {
      this.setState({
        hasInputError: !inputValue,
        hasPersonError: !selectedUserId,
      });

      return;
    }

    this.props.addTodo(inputValue, selectedUserId);

    this.setState({
      selectedUserId: 0,
      inputValue: '',
    });
  };

  render() {
    const { inputValue,
      selectedUserId,
      hasPersonError,
      hasInputError } = this.state;

    return (
      <form onSubmit={this.handleSubmitForm}>

        <input
          type="text"
          value={inputValue}
          onChange={this.handleChange}
          maxLength="30"
        />
        {hasInputError && (
          <p>Please, input the task!</p>
        )}

        <select onChange={this.handleSelect}>
          <option value={selectedUserId}>Select an user</option>
          {this.props.users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.username}
            </option>
          ))}
        </select>
        {hasPersonError && (
          <p>Please, choose the user!</p>
        )}

        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTodo;
