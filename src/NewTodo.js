import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.PureComponent {
  state = {
    users: this.props.user,
    userID: 0,
    taskDescription: '',
    taskValidation: 1,
    userValidation: 1,
  }

  createList = arr => (
    arr.map(user => (
      <option key={user.email}>{user.name}</option>
    ))
  )

  selectedUser = (event) => {
    const i = this.state.users.find(el => el.name === event.target.value).id;

    this.setState(({ userID }) => ({
      userID: i,
    }));

    this.setState({ userValidation: 1 });
  }

  taskTitle = (event) => {
    this.setState({ taskDescription: event.target.value });
    this.setState({ taskValidation: 1 });
  }

  selectedPersonValidation = () => (
    this.state.userValidation !== 0
      ? 'form__validation_user'
      : 'form__validation_user_alert'
  )

  newTaskValidation = () => (
    this.state.taskValidation !== 0
      ? 'form__validation_text'
      : 'form__validation_text_alert'
  )

  addNewTodo = (event) => {
    event.preventDefault();
    if (this.state.taskDescription === '') {
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
            required
          />
          <span
            className={this.newTaskValidation()}
          >
            Please enter the title
          </span>
          <select className="form__selection" onChange={this.selectedUser}>
            {this.createList(this.state.users)}
          </select>
          <span
            className={this.selectedPersonValidation()}
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
      userId: PropTypes.number.isRequired,
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
