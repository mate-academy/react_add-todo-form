import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class NewTodo extends React.PureComponent {
  state = {
    users: this.props.user,
    userID: 0,
    taskDescription: '',
    taskValidation: 1,
    userValidation: 1,
    value: '',
  }

  selectUser = (event) => {
    const user = this.state.users.find(el => el.name === event.target.value);

    this.setState(({ userID, userValidation, value }) => ({
      userID: user.id,
      userValidation: 1,
      value: user.name,
    }));
  }

  taskTitle = (event) => {
    this.setState({
      taskDescription: event.target.value,
      taskValidation: 1,
    });
  }

  resetInputedData = () => {
    this.setState(({ value, taskDescription }) => ({
      value: '',
      taskDescription: '',
    }));
  }

  addNewTodo = (event) => {
    event.preventDefault();
    if (this.state.taskDescription.trim() === '') {
      this.setState({ taskValidation: 0 });
    } else if (this.state.userID === 0) {
      this.setState({ userValidation: 0 });
    } else {
      this.props.addItem({
        userId: this.state.userID,
        id: (this.props.todo.length + 1),
        title: this.state.taskDescription,
        completed: false,
      });
      this.resetInputedData();
    }
  }

  render() {
    return (
      <>
        <form className="form__wrapper">
          <p className="form__header">Todo blank form</p>
          <input
            onChange={this.taskTitle}
            placeholder="Enter a new task"
            type="text"
            className="form__input"
            value={this.state.taskDescription}
            required
          />
          <span
            className={classNames(this.state.taskValidation !== 0
              ? 'form__validation_text'
              : 'form__validation_text_alert')}
          >
            Please enter the title
          </span>
          <select
            className="form__selection"
            onChange={this.selectUser}
            value={this.state.value}
          >
            {this.state.users.map(user => (
              <option key={user.email}>{user.name}</option>
            ))}
          </select>
          <span
            className={classNames(this.state.userValidation !== 0
              ? 'form__validation_user'
              : 'form__validation_user_alert')}
          >
            Please choose a user
          </span>
          <button
            onClick={this.addNewTodo}
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  addItem: PropTypes.func.isRequired,
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default NewTodo;
