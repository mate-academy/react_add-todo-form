import React from 'react';
import PropTypes from 'prop-types';

export class TodosForm extends React.Component {
  state = {
    title: '',
    selectedUser: '',
    user: null,
    titleError: false,
    selectError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSection = (event) => {
    const { name, value } = event.target;
    const { users } = this.props;

    this.setState({
      [name]: value,
      user: users.find(user => user.name === value),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { todo, onSubmit } = this.props;
    const {
      user,
      title,
      selectedUser,
    } = this.state;

    if (title === '') {
      this.setState({
        titleError: true,
      });
    } else {
      this.setState({
        titleError: false,
      });
    }

    if (selectedUser === '') {
      this.setState({
        selectError: true,
      });
    } else {
      this.setState({
        selectError: false,
      });
    }

    if (title !== '' && selectedUser !== '') {
      const newTodo = {
        userId: user.id,
        id: todo.length + 1,
        title,
        completed: false,
        user,
      };

      onSubmit(newTodo);
    }

    this.setState({
      title: '', selectedUser: '',
    });
  }

  render() {
    const {
      title,
      selectedUser,
      titleError,
      selectError,
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
            onChange={this.handleSection}
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
        {titleError && (
          <div>
            <p>Please enter the title</p>
          </div>
        )}
        {selectError && (
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
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
    }),
  ).isRequired,
};
