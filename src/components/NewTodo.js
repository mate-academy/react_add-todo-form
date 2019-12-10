import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    completed: false,
    userIdError: false,
    titleError: false,
  }

  handleInput = (title) => {
    this.setState({
      title: title.replace(/[^a-zA-Z\d ]| (?= +)/g, ''),
      titleError: false,
    });
  }

  handleSelect = (userId) => {
    this.setState({
      userId,
      userIdError: false,
    });
  }

  handleCheckbox = (completed) => {
    this.setState({ completed });
  }

  addAndReset = () => {
    const { userId, title, completed } = this.state;

    if (userId && title) {
      this.props.addNew(userId, title, completed);
      this.setState({
        title: '',
        userId: 0,
        completed: false,
      });
    } else {
      if (!userId) {
        this.setState({ userIdError: true });
      }

      if (!title) {
        this.setState({ titleError: true });
      }
    }
  }

  render() {
    const { userId, title, completed, userIdError, titleError } = this.state;

    return (
      <form>
        <fieldset className="form">
          <legend className="form__legend">
            Adding new todo
          </legend>

          <label className="form__input-label" htmlFor="input">
            Enter title
            <input
              className="form__input"
              id="input"
              type="text"
              placeholder="Title"
              value={title}
              onChange={event => this.handleInput(event.target.value)}
            />

            {titleError ? (
              <p className="form__error">Please enter title</p>
            ) : ''}
          </label>
          <br />

          <label className="form__select-label" htmlFor="select">
            User who is responsible
            <select
              className="form__input"
              id="select"
              value={userId}
              onChange={event => this.handleSelect(event.target.value)}
            >
              <option value={0} disabled>Choose Name</option>
              {this.props.users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            {userIdError ? (
              <p className="form__error">Please choose a user</p>
            ) : ''}
          </label>
          <br />

          <label htmlFor="checkbox">
            Has task been already completed?
            <input
              className="form__checkbox"
              id="checkbox"
              type="checkbox"
              checked={completed}
              onChange={event => this.handleCheckbox(event.target.checked)}
            />
          </label>
          <br />

          <button
            className="form__button"
            type="button"
            onClick={this.addAndReset}
          >
            Add
          </button>
        </fieldset>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNew: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTodo;
