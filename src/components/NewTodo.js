import React from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    error: false,
  }

  validateForm = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;

    if (title.length > 0 && userId > 0) {
      const newTask = {
        title,
        userId,
        completed: false,
      };

      this.props.addNewTodo(newTask);

      this.setState(() => ({
        title: '',
        userId: 0,
        error: false,
      }));
    } else {
      this.setState({
        error: true,
      });
    }
  }

  handleInputChange = (event) => {
    const title = event.target.value.trim();

    this.setState({
      title,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      userId: +event.target.value,
    });
  }

  render() {
    const { error, title, userId } = this.state;

    console.log(error, title, userId);

    return (
      <form className="form-todo" onSubmit={this.validateForm}>
        <label htmlFor="form-input-label" className="form-todo__label">
        Task:
        </label>
        <input
          id="form-input-label"
          value={this.state.title}
          placeholder="Enter your task"
          onChange={this.handleInputChange}
          className="form-todo__input"
        />

        <select
          className="form-todo__select"
          value={this.state.userId}
          placeholder="Choose a user"
          onChange={this.handleSelectChange}
        >
          <option value="0">Choose a user</option>
          {this.props.users.map(user => (
            <option
              key={user.phone}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="form-todo__button"
        >
          Add task
        </button>
        <div className={error
          ? 'errors-show' : 'errors-hide'}
        >
          <div
            className={userId !== 0
              ? 'errors__hide-user' : 'errors__show-user'}
          >
            Please choose a user
          </div>
          <div
            className={title.length !== 0
              ? 'errors__hide-title'
              : 'errors__show-title'}
          >
         Please enter the title
          </div>
        </div>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};
