import React from 'react';
import PropTypes from 'prop-types';

import users from '../../api/users';

export class AddTodoForm extends React.Component {
  state = {
    newTodoTitle: '',
    selectedUserId: 0,
    isTodoTypedIn: false,
    isUserSelected: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, selectedUserId } = this.state;

    this.setState({
      isTodoTypedIn: !newTodoTitle,
      isUserSelected: !selectedUserId,
    });

    if (!newTodoTitle || !selectedUserId) {
      return;
    }

    this.props.addTodo(newTodoTitle, selectedUserId);

    this.setState({
      newTodoTitle: '',
      selectedUserId: 0,
    });
  }

  handleTodoTitleChange = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
      isTodoTypedIn: false,
    });
  }

  handleUserIdChange = (event) => {
    this.setState({
      selectedUserId: +event.target.value,
      isUserSelected: false,
    });
  }

  render() {
    const {
      newTodoTitle,
      selectedUserId,
      isTodoTypedIn,
      isUserSelected,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="mb-3 form-control w-25"
              placeholder="Let's type your todo in!"
              value={newTodoTitle}
              onChange={this.handleTodoTitleChange}
            />
            {isTodoTypedIn && (
              <span className="mt-2 text-danger">
                You forgot about your todo title
              </span>
            )}
          </div>
          <div className="d-flex gap-2">
            <select
              className="form-select w-25 mb-3"
              value={selectedUserId}
              onChange={this.handleUserIdChange}
            >
              <option>Who&apos;s there?</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {isUserSelected && (
              <span className="mt-1 text-danger">
                Don&apos;t forget about the user name
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-outline-secondary mb-3"
        >
          Add it!
        </button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
