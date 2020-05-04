import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    id: 3,
    title: '',
    userId: 0,
    errorInput: false,
    errorSelect: false,
  }

  selectUserName = (event) => {
    this.setState({
      userId: +event.target.value,
      errorSelect: false,
    });
  }

  handleChangeInput = (event) => {
    this.setState({
      title: event.target.value,
      errorInput: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { id, title, userId } = this.state;
    const { addTodo } = this.props;

    if (title && userId) {
      addTodo(id, title, userId);

      this.setState({
        id: id + 1,
        title: '',
        userId: 0,
        errorInput: false,
        errorSelect: false,
      });
    }

    if (!title) {
      this.setState({
        errorInput: true,
      });
    }

    if (!userId) {
      this.setState({
        errorSelect: true,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, userId, errorInput, errorSelect } = this.state;
    let errorMessageInput;
    let errorMessageSelect;

    if (!errorInput) {
      errorMessageInput = '';
    } else {
      errorMessageInput = 'Please enter the correct title';
    }

    if (!errorSelect) {
      errorMessageSelect = '';
    } else {
      errorMessageSelect = 'Please choose a user';
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Please enter the title of todo"
          value={title}
          onChange={this.handleChangeInput}
        />
        <p className="error">{errorMessageInput}</p>
        <select
          onChange={this.selectUserName}
          value={userId}
        >
          <option disabled value="0">
            Choose a User
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <p className="error">{errorMessageSelect}</p>
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
