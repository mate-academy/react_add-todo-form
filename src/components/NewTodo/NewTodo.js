import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    selectedUser: 0,
    inputValue: '',
    textError: '',
    users: this.props.users,
  };

  handleClick = () => {
    const { selectedUser, inputValue } = this.state;

    if (!selectedUser && !inputValue) {
      this.setState({
        textError: 'Write text and select user',
      });
    } else if (!selectedUser && inputValue) {
      this.setState({
        textError: 'Select user',
      });
    } else if (selectedUser && !inputValue) {
      this.setState({
        textError: 'Write the text',
      });
    } else {
      this.setState({
        inputValue: '',
        selectedUser: 0,
        textError: '',
      });
      this.props.addNewTodo(selectedUser, inputValue);
    }
  }

  handleInput = ({ target }) => (
    this.setState({
      inputValue: target.value,
    })
  );

  handleSelected = ({ target }) => (
    this.setState({
      selectedUser: Number(target.value),
    })
  );

  render() {
    const {
      selectedUser,
      inputValue,
      users,
      textError,
    } = this.state;

    return (
      <form className="">
        <label htmlFor="title">
          Todo:
          <input
            id="title"
            className=""
            type="text"
            value={inputValue}
            onChange={this.handleInput}
            placeholder="Write your text here"
          />
        </label>

        <label htmlFor="title">
          User:
          <select
            id=""
            className=""
            value={selectedUser}
            onChange={this.handleSelected}
          >
            <option value={0}>Select user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>

        <button
          className=""
          type="button"
          onClick={this.handleClick}
        >
          Add
        </button>
        <p className="">
          {textError}
        </p>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};

export default NewTodo;
