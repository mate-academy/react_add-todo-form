import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    task: '',
    userName: '',
    user: '',
    userError: false,
    taskError: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { task, userName, user } = this.state;
    const { addUser } = this.props;

    if (!task) {
      this.setState({
        taskError: true,
      });

      return;
    }

    if (!userName) {
      this.setState({
        userError: true,
      });

      return;
    }

    addUser(user, task);
    this.setState({
      task: '',
      userName: '',
      userError: false,
      taskError: false,
    });
  }

  handleSelect = (event) => {
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
    const { userName, task, userError, taskError } = this.state;

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
          onChange={(event) => {
            this.setState({
              task: event.target.value,
            });
          }}
        />
        <div className="ui placeholder">
          <select
            name="userName"
            id="userName"
            value={userName}
            className="ui placeholder"
            onChange={this.handleSelect}
          >
            <option value="">Choose user</option>
            {users.map(person => (
              <option key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          {userError || taskError
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
