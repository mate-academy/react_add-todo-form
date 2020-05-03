import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    completed: false,
    error: false,
  }

  validateForm = (evt) => {
    evt.preventDefault();

    const { title, userId, completed } = this.state;

    if (title.length > 0 && userId > 0) {
      const newTask = {
        title,
        userId,
        completed,
      };

      this.props.addTodo(newTask);

      this.setState(() => ({
        title: '',
        userId: 0,
        error: false,
        completed: false,
      }));
    } else {
      this.setState({
        error: true,
      });
    }
  }

  handleStatusTodo = () => {
    this.setState(state => ({ completed: !state.completed }));
  }

  handleChangeOnInput = (evt) => {
    const title = evt.target.value.trim();

    this.setState({
      title,
    });
  }

  handleChangeOnSelect = (evt) => {
    this.setState({
      userId: +evt.target.value,
    });
  }

  render() {
    const { error, title, userId, completed } = this.state;

    return (
      <form className="form-todo" onSubmit={this.validateForm}>
        <label
          htmlFor="form-input-label"
          className="form__label"
        >
          Task:
        </label>
        <input
          id="form-input-label"
          value={this.state.title}
          placeholder="Enter your task"
          onChange={this.handleChangeOnInput}
          className="form__input"
        />

        <input
          type="checkbox"
          id="chooseStatus"
          className="chooseStatus"
          checked={completed}
          onClick={this.handleStatusTodo}
        />

        <select
          className="form__select"
          value={this.state.userId}
          placeholder="Choose a user"
          onChange={this.handleChangeOnSelect}
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
          className="form__button"
        >
          Add task
        </button>
        <div className={error ? 'error--show' : 'error--hide'}>
          <p
            className={userId !== 0
              ? 'error--hide-user'
              : 'error--show-user'
            }
          >
            Choose user
          </p>
          <p
            className={
              title.length !== 0
                ? 'error--hide-title'
                : 'errors--show-title'
            }
          >
            Enter the title
          </p>
        </div>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default NewTodo;
