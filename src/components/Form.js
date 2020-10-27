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

  render() {
    const { addUser, users } = this.props;
    const { task, user, userName, userError, titleError } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!task) {
            this.callTitleError();
          }

          if (!userName || userName === 'Choose a user') {
            this.callUserError();
          }

          if (task && userName && userName !== 'Choose a user') {
            addUser(user, task);
            this.setState({
              task: '',
              userName: '',
              user: '',
            });
          }
        }}

        className="form"
      >
        <label>
          {`To do `}
          <input
            placeholder="write a task"
            name="task"
            type="text"
            value={this.state.task}
            onChange={(event) => {
              this.setState({
                [event.target.name]: event.target.value,
                titleError: false,
              });
            }}
            className="form-control"
          />
        </label>

        {titleError
          ? <Error text="Please enter the task" />
          : ''}

        <label>
          {`Assign to `}
          <select
            name="userName"
            value={this.state.userName}
            className="form-control"
            onChange={(event) => {
              this.setState({
                [event.target.name]: event.target.value,
                userError: false,
              });
              this.setState(prevState => ({
                user: users.find(userToFind => (
                  userToFind.name === prevState.userName
                )),
              }));
            }}
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
  addUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserShape).isRequired,
};
