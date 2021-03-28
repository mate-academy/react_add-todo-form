import React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

export class TodosForm extends React.Component {
  state = {
    title: '',
    selectedUser: '',
    user: null,
    hasTitleError: false,
    hasSelectError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      hasTitleError: false,
    });
  }

  handleSelection = (event) => {
    const { name, value } = event.target;
    const { users } = this.props;

    this.setState({
      [name]: value,
      user: users.find(user => user.name === value),
      hasSelectError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const {
      user,
      title,
      selectedUser,
    } = this.state;

    if (title === '') {
      this.setState({
        hasTitleError: true,
      });
    }

    if (selectedUser === '') {
      this.setState({
        hasSelectError: true,
      });
    }

    if (title !== '' && selectedUser !== '') {
      const newTodo = {
        userId: user.id,
        id: uuid(),
        title,
        completed: false,
        user,
      };

      onSubmit(newTodo);

      this.setState({
        title: '', selectedUser: '',
      });
    }
  }

  render() {
    const {
      title,
      selectedUser,
      hasTitleError,
      hasSelectError,
    } = this.state;
    const { users } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={this.handleChange}
          />
          <select
            name="selectedUser"
            value={selectedUser}
            onChange={this.handleSelection}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
          >
            Add
          </button>
        </form>
        {hasTitleError && (
          <div>
            <p>Please enter the title</p>
          </div>
        )}
        {hasSelectError && (
          <div>
            <p>Please choose a user</p>
          </div>
        )}
      </>
    );
  }
}

TodosForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};
