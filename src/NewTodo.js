import React from 'react';
import PropTypes from 'prop-types';
import users from './api/users';

class NewTodo extends React.PureComponent {
  state = {
    todo: this.props.todo,
    users: this.props.user,
    userID: 1,
    taskDescription: '',
  }

  selectedUser = (event) => {
    this.setState({
      userID: users.find(el => el.name === event.target.value).id,
    });
  }

  taskTitle = (event) => {
    this.setState({ taskDescription: event.target.value });
  }

  taskToAdd = (event) => {
    event.preventDefault();
    this.state.todo.push({
      userId: this.state.userID,
      id: (this.state.todo.length + 1),
      title: this.state.taskDescription,
      completed: false,
    });
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
          <select className="form__selection" onChange={this.selectedUser}>
            {this.state.users.map((user, index) => (
              <option key={user.email}>{user.name}</option>
            ))}
          </select>
          <button
            onClick={this.taskToAdd}
            type="submit"
            lassName="form__button"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
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
