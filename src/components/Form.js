import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    task: '',
    userName: '',
    user: '',
    error: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { task, userName, user } = this.state;
    const { addUser } = this.props;

    if (!task || !userName) {
      this.setState({
        error: true,
      });

      return;
    }

    addUser(user, task);
    this.setState({
      task: '',
      userName: '',
      error: false,
    });
  }

  handleChange = (event) => {
    const { users } = this.props;

    this.setState({
      [event.target.name]: event.target.value,
    });
    this.setState(prevState => ({
      user: users.find(userToFind => (
        userToFind.name === prevState.userName
      )),
    }));
  }

  render() {
    const { users } = this.props;
    const { userName, task, error } = this.state;

    return (
      <form
        name="newUser"
        className="ui focus input"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="task"
          value={task}
          placeholder="Add your task"
          className="ui input"
          onChange={this.handleChange}
        />
        <div className="ui placeholder">
          <select
            name="userName"
            id="userName"
            value={userName}
            className="ui placeholder"
            onChange={this.handleChange}
          >
            <option value="">Choose user</option>
            {users.map(person => (
              <option key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          {error
            ? <p>Enter all data</p>
            : ''
          }
        </div>
        <button
          type="submit"
          className="ui button"
        >
          Add
        </button>

      </form>
    );
  }
}

Form.propTypes = {
  addUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
