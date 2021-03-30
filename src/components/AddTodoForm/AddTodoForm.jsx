import React from 'react';
import PropTypes from 'prop-types';
import './AddTodoForm.css';

export class AddTodoForm extends React.Component {
  state = {
    title: '',
    userId: '',
    isValidationPassed: true,
  }

  submitHandler = (event) => {
    event.preventDefault();

    const { addTodo } = this.props;
    const { title, userId } = this.state;

    if (title && userId) {
      addTodo(title, userId);

      this.setState({
        title: '',
        userId: '',
        isValidationPassed: true,
      });
    } else {
      this.setState({
        isValidationPassed: false,
      });
    }
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: name === 'userId' ? +value : value,
    });
  }

  render() {
    const { submitHandler, onChangeHandler } = this;
    const { users } = this.props;
    const { title, userId, isValidationPassed } = this.state;

    return (
      <>
        <form className="ui form" onSubmit={submitHandler}>
          <h1>Add todo:</h1>
          <div className="field">
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              id="title"
              value={title}
              onChange={onChangeHandler}
            />
            {!title && !isValidationPassed && (
              <div className="ui negative message">
                Please enter the title
              </div>
            )}
          </div>
          <div className="field">
            <select
              name="userId"
              id="users"
              className="ui fluid dropdown"
              value={userId}
              onChange={onChangeHandler}
            >
              <option value="">
                Choose a user:
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {!userId && !isValidationPassed && (
              <div className="ui negative message">
                Please choose a user
              </div>
            )}
            <br />
            <button type="submit" className="ui button">
              Add
            </button>
          </div>
        </form>
      </>
    );
  }
}

AddTodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
