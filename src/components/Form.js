import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    task: '',
    userName: '',
    user: '',
  };

  render() {
    const { users, addUser } = this.props;
    const { userName, task, user } = this.state;

    return (
      <form
        className="ui focus input"
        onSubmit={(event) => {
          event.preventDefault();

          if (!task || !userName) {
            return;
          }

          addUser(user, task);
          this.setState({
            task: '',
            userName: '',
            user: '',
          });
        }}
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
        <select
          name="userName"
          id="userName"
          value={userName}
          className="ui placeholder"
          onChange={(event) => {
            this.setState({
              [event.target.name]: event.target.value,
            });
            this.setState(prevState => ({
              user: users.find(userToFind => (
                userToFind.name === prevState.userName
              )),
            }));
          }}
        >
          <option value="">Choose user</option>
          {users.map(person => (
            <option key={person.id}>
              {person.name}
            </option>
          ))}
        </select>
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
