import React from 'react';
import PropTypes from 'prop-types';

import './TodoForm.css';

export class TodoForm extends React.PureComponent {
  state = {
    todoTitle: '',
    selectedUser: '',
    showValueError: false,
    showUserError: false,
    userID: this.props.userList.length,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    const { addTodo } = this.props;
    const { todoTitle, selectedUser, userID } = this.state;

    event.preventDefault();

    if (!todoTitle.trim() || !selectedUser) {
      if (!todoTitle.trim()) {
        this.setState({ showValueError: true });
        setTimeout(() => (this.setState({ showValueError: false })), 2000);
      }

      if (!selectedUser) {
        this.setState({ showUserError: true });
        setTimeout(() => (this.setState({ showUserError: false })), 2000);
      }

      return;
    }

    this.setState(prevState => ({
      todoTitle: '',
      selectedUser: '',
      showValueError: false,
      showUserError: false,
      userID: prevState.userID + 1,
    }));

    addTodo({
      userId: userID,
      id: userID,
      title: todoTitle,
      completed: false,
      user: {
        name: selectedUser,
      },
    });
  }

  render() {
    const { userList } = this.props;
    const {
      todoTitle,
      selectedUser,
      showValueError,
      showUserError,
    } = this.state;

    return (
      <div>
        <form className="form">
          <label>
            <input
              type="text"
              name="todoTitle"
              placeholder="What to do?"
              value={todoTitle}
              onChange={this.handleChange}
            />
          </label>

          {showValueError && <div>Input error</div>}

          <label>
            <select
              name="selectedUser"
              id="selectedUser"
              value={selectedUser}
              onChange={this.handleChange}
            >
              <option>
                Choose a user
              </option>
              {userList.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {showUserError && <div>User error</div>}

          <button type="submit" onClick={this.handleSubmit}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

TodoForm.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};
