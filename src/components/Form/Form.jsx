import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    task: '',
    chosenUser: '',
    userError: '',
    taskError: '',
  }

  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  handleInput = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      taskError: '',
    });
  }

  handleSelect = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      userError: '',
    });
  }

  clearForm = () => {
    this.setState({
      task: '',
      chosenUser: '',
      userError: '',
      taskError: '',
    });
  }

  handleSubmit = () => {
    const { task, chosenUser } = this.state;

    const { onSubmit } = this.props;

    const errors = {};

    if (!task) {
      errors.taskError = 'Please enter the title';
    }

    if (!chosenUser) {
      errors.userError = 'Please choose a user';
    }

    if (!errors.taskError && !errors.userError) {
      onSubmit(task, chosenUser);
      this.clearForm();
    } else {
      this.setState({
        ...errors,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { task, chosenUser, taskError, userError } = this.state;

    return (
      <form
        // action="#"
        // method="get"
        className=""
        onSubmit={(event) => {
          event.preventDefault();
          this.handleSubmit();
        }}
      >
        <div className="is-flex is-justify-content-center p-5">
          <div className="field is-horizontal mx-2">
            <input
              className="input"
              type="text"
              name="task"
              value={task}
              placeholder="Task"
              onChange={this.handleInput}
            />
          </div>

          <div className="select mx-2">
            <select
              name="chosenUser"
              value={chosenUser}
              onChange={this.handleSelect}
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>

          </div>
          <button
            className="button is-primary mx-2"
            type="submit"
          >
            Add TODO
          </button>

        </div>
        <div className="pb-4">
          {taskError && <span>Please enter the title</span>}
          <br />
          {userError && <span>Please choose a user</span>}
        </div>

      </form>
    );
  }
}
