import React from 'react';
import './AddTodoForm.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class AddTodoForm extends React.Component {
  state = {
    title: '',
    userId: 0,
    hasTitleError: false,
    hasUserIdError: false,
  }

  resetForm = () => {
    this.setState({
      title: '',
      userId: 0,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;
    const { onAddToTheList } = this.props;

    this.setState(() => ({
      hasTitleError: !title,
      hasUserIdError: !userId,
    }));

    if (!title) {
      return;
    }

    if (!userId) {
      return;
    }

    onAddToTheList(title, userId);

    this.resetForm();
  }

  render() {
    const {
      title,
      userId,
      hasTitleError,
      hasUserIdError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="fieldWrapper">
          <input
            className={classNames('input', {
              wrongField: hasTitleError,
            })}
            type="text"
            placeholder="Enter some task, please"
            value={title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
                hasTitleError: false,
              });
            }}
          />

          {hasTitleError
            && (
            <span
              className="fieldAlert"
            >
              Oh no! You forgot to enter some task!
            </span>
            )
          }
        </div>

        <div className="fieldWrapper">
          <select
            className={classNames('sel', {
              wrongField: hasUserIdError,
            })}
            value={userId}
            onChange={(event) => {
              this.setState({
                userId: event.target.value,
                hasUserIdError: false,
              });
            }}
          >

            <option value={0}>Choose a user</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError
            && (
            <span
              className="fieldAlert"
            >
              Who are you?
            </span>
            )
          }

        </div>

        <div className="buttonWrap">
          <button
            type="submit"
            className="button"
          >
            ADD
          </button>
        </div>

      </form>
    );
  }
}

AddTodoForm.propTypes = {
  onAddToTheList: PropTypes.func.isRequired,
};
