import React from 'react';
import PropTypes from 'prop-types';

import './TodoForm.css';

export class TodoForm extends React.PureComponent {
  state = {
    enteredValue: '',
    selectedUser: '',
    showValueError: false,
    showUserError: false,
    userID: 3,
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  addHandler = () => {
    const { addTodo } = this.props;
    const { enteredValue, selectedUser, userID } = this.state;

    if (!enteredValue.trim() || !selectedUser) {
      if (!enteredValue.trim()) {
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
      enteredValue: '',
      selectedUser: '',
      showValueError: false,
      showUserError: false,
      userID: prevState.userID + 1,
    }));

    addTodo({
      userId: userID,
      id: userID,
      title: enteredValue,
      completed: false,
      user: {
        name: selectedUser,
      },
    });
  }

  render() {
    const { userList } = this.props;
    const {
      enteredValue,
      selectedUser,
      showValueError,
      showUserError,
    } = this.state;

    return (
      <div>
        <form className="form" onSubmit={event => event.preventDefault()}>
          <label>
            <input
              type="text"
              name="enteredValue"
              placeholder="What to do?"
              value={enteredValue}
              onChange={this.changeHandler}
            />
          </label>

          {showValueError && <div>Input error</div>}

          <label>
            <select
              name="selectedUser"
              id="selectedUser"
              value={selectedUser}
              onChange={this.changeHandler}
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

          <button type="submit" onClick={this.addHandler}>
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
