import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { UserType } from '../../types';

export class AddTodoForm extends React.Component {
  state = {
    newTodoTitle: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasUserIdError: false,
  }

  handleTitleChange = (e) => {
    this.setState({
      newTodoTitle: e.target.value,
      hasTitleError: false,
    });
  }

  handleUserIdChange = (e) => {
    this.setState({
      selectedUserId: +e.target.value,
      hasUserIdError: false,
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle || !selectedUserId) {
      this.setState({
        hasTitleError: !newTodoTitle,
        hasUserIdError: !selectedUserId,
      });

      return;
    }

    this.props.addTodo(newTodoTitle, selectedUserId);

    this.setState({
      newTodoTitle: '',
      selectedUserId: 0,
    });
  }

  render() {
    const {
      newTodoTitle,
      selectedUserId,
      hasTitleError,
      hasUserIdError,
    } = this.state;

    const { users } = this.props;

    return (
      <form className="box m-5" onSubmit={this.handleFormSubmit}>
        <label
          htmlFor="title-input"
          className="label"
        >
          Todo Title
        </label>
        <div className="field">
          <div className="has-icons-left">
            <input
              id="title-input"
              type="text"
              className={classNames('input is-medium',
                {
                  'is-danger': hasTitleError,
                })}
              value={newTodoTitle}
              onChange={this.handleTitleChange}
              placeholder="Title"
            />
          </div>
          <p className={classNames('help is-danger is-size-6',
            {
              'is-invisible': !hasTitleError,
            })}
          >
            Please fill out this field
          </p>
        </div>

        <div className="field is-inline-block">
          <div className={classNames('select is-medium is-rounded',
            {
              'is-danger': hasUserIdError,
            })}
          >
            <select
              value={selectedUserId}
              onChange={this.handleUserIdChange}
            >
              <option value={0}>Select User</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <p className={classNames('help is-danger is-size-6',
            {
              'is-invisible': !hasUserIdError,
            })}
          >
            Please select user
          </p>
        </div>

        <button
          className="button is-medium is-pulled-right px-6"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserType).isRequired,
};
