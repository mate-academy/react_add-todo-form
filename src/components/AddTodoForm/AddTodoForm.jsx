import React from 'react';
import PropTypes from 'prop-types';

export class AddTodoForm extends React.Component {
  state = {
    title: '',
    selectedUser: null,
    selectedUserError: false,
    titleError: false,
  }

  userHandler = (e) => {
    const { value } = e.target;
    const foundedUser = this.props.users.find(user => user.name === name);

    console.log(foundedUser);

    this.setState({
      selectedUser: foundedUser,
      selectedUserError: false,
    });
  }

  titleHandler = (e) => {
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
    console.log(this.state.selectedUser);
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { selectedUser, title } = this.state;

    console.log(this.state.selectedUser);

    if (selectedUser === null) {
      this.setState({ selectedUserError: true });
    }

    if (title === '') {
      this.setState({ titleError: true });
    }

    if (selectedUser === null || title === '') {
      return
    }

    this.props.onAdd(this.state);
    this.reset();
  }

  render() {
    const {
      title,
      selectedUser,
      selectedUserError,
      titleError
    } = this.state;
    return (
      <form onSubmit={this.onSubmitHandler}
      >
        <span className="error">
          {titleError && 'Please enter the title'}
        </span>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.titleHandler}
        />
        <select
          name="selectedUser"
          value={selectedUser ? selectedUser.name : ''}
          onChange={this.userHandler}
        >
          <option >
            Choose a user
          </option>
          {this.props.users.map(user => (
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
    )
  }
}

AddTodoForm.PropTypes = {
  onAdd: PropTypes.func.isRequired,
  users: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired
}
