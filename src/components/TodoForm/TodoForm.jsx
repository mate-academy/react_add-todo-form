import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './TodoForm.css';

export class TodoForm extends React.Component {
  state = {
    userId: '',
    userError: false,
    title: '',
    titleError: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(state => ({
      [name]: value,
      userError: name === 'userId' ? false : state.userError,
      titleError: name === 'title' ? false : state.titleError,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { userId, title } = this.state;

    if (!title || !userId) {
      this.setState({
        titleError: !title.length,
        userError: !userId,
      });

      return;
    }

    this.props.onAdd(userId, title);

    this.setState({
      userId: '',
      title: '',
    });
  };

  render() {
    const {
      userId, title, userError, titleError,
    } = this.state;
    const { users } = this.props;

    return (
      <div className="TodoForm">
        <h2 className="TodoForm__header">
          Add New Todo
        </h2>

        <form
          className="TodoForm__form"
          onSubmit={this.handleSubmit}
        >
          <div
            className={cn(
              `TodoForm__field`, userError && 'TodoForm__field--error',
            )}
            data-error="Please select a user"
          >
            <select
              name="userId"
              value={userId}
              className="TodoForm__field--user"
              onChange={this.handleChange}
            >
              <option
                key={0}
                value=""
                onChange={this.handleChange}
              >
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  name="userId"
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div
            className={
              `TodoForm__field ${titleError
                ? 'TodoForm__field--error' : ''}`}
            data-error="Please enter the title"
          >
            <input
              type="text"
              name="title"
              value={title}
              className="TodoForm__field--title"
              placeholder="New todo"
              onChange={this.handleChange}
            />
          </div>

          <button
            type="submit"
            className="TodoForm__button"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
    }),
  ),
  onAdd: PropTypes.func.isRequired,
};

TodoForm.defaultProps = {
  users: [],
};
