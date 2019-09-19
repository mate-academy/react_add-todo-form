import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

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
        textError: 'Error: Please, input title task and select person',
      });
    } else if (!selectedUser && inputValue) {
      this.setState({
        textError: 'Error: Please, select person',
      });
    } else if (selectedUser && !inputValue) {
      this.setState({
        textError: 'Error: Please, input title task',
      });
    } else {
      if (inputValue.length < 15) {
        this.setState({
          textError: 'Error: The small length of task. Min length 15 symbol',
        });
      } else {
        const { selectedUser, inputValue, } = this.state;

        this.setState({
          inputValue: '',
          selectedUser: 0,
          textError: '',
        });

        this.props.addNewTodo(selectedUser, inputValue);
      }
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
      textError
    } = this.state;

    return (
      <form className="form-add-todo">
        <label htmlFor="title">
          Todo:
          <input
            id="title"
            className="input-title"
            type="text"
            value={inputValue}
            onChange={this.handleInput}
            placeholder="Input your task"
          />
        </label>

        <label htmlFor="selected-user">
          User:
          <select
            id="selected-user"
            className="selected-user"
            value={selectedUser}
            onChange={this.handleSelected}
          >
            <option value={0}>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>

        <button
          className="button-add-user"
          type="button"
          onClick={this.handleClick}
        >
          Add
        </button>
        <p className="error">
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
