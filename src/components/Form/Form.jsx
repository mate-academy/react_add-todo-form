import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../types/types';

export class Form extends React.Component {
  state={
    choiceSelect: '',
    title: '',
    selectedUser: null,
    hasError: false,
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSelect = (event) => {
    const { users } = this.props;

    this.setState({
      selectedUser: users.find(user => user.id === +event.target.value),
      choiceSelect: event.target.value,
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
        hasError: false,
        choiceSelect: '',
        title: '',
        selectedUser: null,
      });
    }

    if (!title) {
      this.setState({
        hasError: true,
      });
    }

    if (!selectedUser) {
      this.setState({
        hasError: true,
      });
    }
  }

  render() {
    const { choiceSelect, title, hasError } = this.state;
    const { users } = this.props;

    return (
      <>
        {hasError
          && (
            <div>
              <h3>error</h3>
              <p>Please enter the title</p>
            </div>
          )
          }
        {hasError
          && (
            <div>
              <h3>error</h3>
              <p>Please choose a user</p>
            </div>
          )
          }
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={this.handleChange}
          />
          <select
            value={choiceSelect}
            onChange={this.handleSelect}
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
