import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class AddTodoForm extends React.Component {
  defaultState = {
    title: '',
    userId: '',
    canErrorsBeVisible: false,
  }

  state = this.defaultState;

  submitHandler = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (title && userId) {
      this.props.addNewTodo(title, +userId);
      this.setState(this.defaultState);
    } else {
      this.setState({
        canErrorsBeVisible: true,
      });
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { submitHandler, onChangeHandler } = this;
    const { title, userId, canErrorsBeVisible } = this.state;

    return (
      <form onSubmit={submitHandler}>
        <h1>Add todo form</h1>

        <label>
          <input
            name="title"
            placeholder="to do"
            value={title}
            onChange={onChangeHandler}
          />
          <span>
            {!title && canErrorsBeVisible && 'Please enter the title'}
          </span>
        </label>

        <label>
          <select
            name="userId"
            value={userId}
            onChange={onChangeHandler}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.username}</option>
            ))}
          </select>
          <span>
            {!userId && canErrorsBeVisible && 'Please choose a user'}
          </span>
        </label>
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
