import React from 'react';
import PropTypes from 'prop-types';

export class AddTodoForm extends React.Component {
  state = {
    title: '',
    selectedUser: null,
    selectedUserError: false,
    titleError: false,
  }

  selectUserHandler = (e) => {
    const { value } = e.target;
    const foundedUser = this.props.users.find(user => user.name === value);

    this.setState({
      selectedUser: foundedUser,
      selectedUserError: false,
    });
  }

  changeTitleHandler = (e) => {
    const { value } = e.target;

    this.setState({
      title: value,
      titleError: false,
    });
  }

  reset = () => {
    this.setState({
      selectedUser: null,
      title: '',
    });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { selectedUser, title } = this.state;
    const { onAdd, onCreate } = this.props

    if (selectedUser === null) {
      this.setState({ selectedUserError: true });
    }

    if (title === '') {
      this.setState({ titleError: true });
    }

    if (selectedUser === null || title === '') {
      return;
    }

    const todo = onCreate(this.state);

    onAdd(todo)

    this.reset();
  }

  render() {
    const {
      title,
      selectedUser,
      selectedUserError,
      titleError,
    } = this.state;

    const { users } = this.props;

    return (
      <form onSubmit={this.onSubmitHandler}>
        <span className="error">
          {titleError && 'Please enter the title'}
        </span>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.changeTitleHandler}
        />
        <select
          name="selectedUser"
          value={selectedUser ? selectedUser.name : 'initial value'}
          onChange={this.selectUserHandler}
        >
          <option value="initial value" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <span className="error">
          {selectedUserError && 'Please choose a user'}
        </span>

        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
