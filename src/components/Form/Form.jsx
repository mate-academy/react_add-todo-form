import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../types/types';

export class Form extends React.Component {
  state = {
    title: '',
    selectedUser: null,
    hasErrors: {
      hasTitle: false,
      hasSelectUser: false,
    },
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSelectUser = (event) => {
    const { users } = this.props;
    const { value } = event.target;

    const searchUser = users.find(user => user.id === +value);

    this.setState({
      selectedUser: searchUser,
      hasErrors: {
        hasTitle: false,
        hasSelectUser: false,
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, selectedUser } = this.state;
    const { onAdd } = this.props;

    if (title && selectedUser) {
      const newTodo = {
        user: selectedUser,
        userId: selectedUser.id,
        id: title,
        title,
        completed: false,
      };

      onAdd(newTodo);
      this.setState({
        hasErrors: {
          hasTitle: false,
          hasSelectUser: false,
        },

        title: '',
        selectedUser: null,
      });
    }

    if (!title) {
      this.setState(prevState => ({
        hasErrors: {
          ...prevState.hasErrors,
          hasTitle: true,
        },
      }));
    }

    if (selectedUser === null) {
      this.setState(prevState => ({
        hasErrors: {
          ...prevState.hasErrors,
          hasSelectUser: true,
        },
      }
      ));
    }
  }

  render() {
    const { selectedUser, title, hasErrors } = this.state;
    const { hasTitle, hasSelectUser } = hasErrors;
    const { users } = this.props;

    return (
      <>
        {hasTitle && (
          <div>
            <h3>error</h3>
            <p>Please enter the title</p>
          </div>
        )}
        {hasSelectUser && (
          <div>
            <h3>error</h3>
            <p>Please choose a user</p>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={this.handleChangeTitle}
          />
          <select
            name="selectedUser"
            value={selectedUser !== null ? selectedUser.name : 'initial value'}
            onChange={this.handleSelectUser}
          >
            <option>
              Choice user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">
            Submit
          </button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  users: UserType.isRequired,
  onAdd: PropTypes.func.isRequired,
};
