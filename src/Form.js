import React from 'react';
import PropTypes from 'prop-types';

const { uuid } = require('uuidv4');

export class Form extends React.Component {
  state = {
    selectedUserName: 'Choose User',
    title: '',
    shouldCreateTitleError: false,
    shouldCreateUserError: false,
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedUserName: event.target.value,
    });

    if (event.target.value !== 'Choose User') {
      this.setState({
        shouldCreateUserError: false,
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    if (event.target.value !== '') {
      this.setState({
        shouldCreateTitleError: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title === '') {
      this.setState({
        shouldCreateTitleError: true,
      });
    }

    if (this.state.selectedUserName === 'Choose User') {
      this.setState({
        shouldCreateUserError: true,
      });
    }

    if (this.state.selectedUserName === 'Choose User'
      || this.state.title === '') {
      return;
    }

    const todo = {
      userId: this.props.users.find(
        user => user.name === this.state.selectedUserName,
      ).id,
      id: uuid(),
      title: this.state.title,
      completed: false,
    };

    this.props.addTodo(todo);

    this.setState({
      selectedUserName: 'Choose User',
      title: '',
    });
  }

  render() {
    return (
      <>
        {this.state.shouldCreateTitleError && (
          <p className="error">
            Warning: Please enter the title!!!
          </p>
        )}
        {this.state.shouldCreateUserError && (
          <p className="error">
            Warning: Please choose a user
          </p>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <select
            value={this.state.selectedUserName}
            onChange={this.handleSelectChange}
          >
            <option>
              Choose User
            </option>
            {this.props.users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <button
            type="submit"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
