import React from 'react';
import PropTypes from 'prop-types';

import { Error } from './Error';
import { UserShape } from '../shapes/UserShape';

export class Form extends React.PureComponent {
  state = {
    task: '',
    userName: '',
    user: '',
    userError: false,
    titleError: false,
  };

  callUserError = () => {
    this.setState({
      userError: true,
    });
  }

  callTitleError = () => {
    this.setState({
      titleError: true,
    });
  }

  handleSubmit = (event) => {
    const { task, user, userName } = this.state;

    event.preventDefault();
    if (!task) {
      this.callTitleError();
    }

    if (!userName || userName === 'Choose a user') {
      this.callUserError();
    }

    if (task && userName && userName !== 'Choose a user') {
      this.props.addTodo(user, task);
      this.setState({
        task: '',
        userName: '',
        user: '',
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.replace(/[^\w ]/gi, ''),
      titleError: false,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      userError: false,
    });
    this.setState(prevState => ({
      user: this.props.users.find(userToFind => (
        userToFind.name === prevState.userName
      )),
    }));
  }

  render() {
    const { users } = this.props;
    const { task, userName, userError, titleError } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}

        className="form"
      >
        <label>
          To do (only letters and numbers allowed)
          <input
            placeholder="write a task"
            name="task"
            type="text"
            value={task}
            onChange={this.handleInputChange}
            className="form-control"
          />
        </label>

        {titleError
          ? <Error text="Please enter the task" />
          : ''}

        <label>
          Assign to
          <select
            name="userName"
            value={userName}
            className="form-control"
            onChange={this.handleSelectChange}
          >
            <option>Choose a user</option>
            {users.map(person => (
              <option key={person.id}>{person.name}</option>
            ))}
          </select>
        </label>

        {userError
          ? <Error text="Please choose a user" />
          : ''}

        <button type="submit" className="btn btn-dark">
          Add
        </button>

      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserShape).isRequired,
};
