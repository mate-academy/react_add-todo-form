import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../types/types';

// const initialState = {
//   title: '',
//   selectedUser: null,
//   hasError: false,
// }

export class Form extends React.Component {
  state = {
    choiceSelectUser: '',
    title: '',
    selectedUser: null,
    hasError: {
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

    this.setState({
      selectedUser: users.find(user => user.id === +event.target.value),
      choiceSelectUser: event.target.value,
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
        hasError: {
          hasTitle: false,
          hasSelectUser: false,
        },
        choiceSelectUser: '',
        title: '',
        selectedUser: null,
      });
    }

    if (!title) {
      this.setState({
        hasError: {
          hasTitle: true,
          hasSelectUser: false,
        },
      });
    }

    if (!selectedUser) {
      this.setState({
        hasError: {
          hasTitle: false,
          hasSelectUser: true,
        },
      });
    }
  }

  render() {
    const { choiceSelectUser, title, hasError } = this.state;
    const { hasTitle, hasSelectUser } = hasError;
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
            value={choiceSelectUser}
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
