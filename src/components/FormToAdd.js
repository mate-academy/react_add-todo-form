import React from 'react';
import PropTypes from 'prop-types';

export class FormToAdd extends React.Component {
  state = {
    title: '',
    completed: false,
    user: null,
    userId: '',
    hasTitleError: false,
    hasUserError: false,
  };

  handleChangeUser = (e) => { // choose user
    this.setState({
      user: this.props.users.find(user => user.id === +e.target.value),
      userId: +e.target.value,
    });
  };

  handleChangeStatus = () => {
    this.setState(prev => ({
      completed: !prev.completed,
    }));
  };

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  resetForm = () => {
    this.setState({
      title: '',
      completed: false,
      userId: '',
      hasTitleError: false,
      hasUserError: false,
      user: null,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, user } = this.state;

    if (!title || !user) {
      this.setState({
        hasTitleError: !title,
        hasUserError: !user,
      });

      return;
    }

    this.props.newTodo(
      this.props.id,
      this.state.title,
      this.state.completed,
      this.state.user,
    );
    this.resetForm();
  };

  render() {
    const {
      title,
      completed,
      userId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Todo name:
          <input
            type="text"
            id="name"
            placeholder="Name your todo`s"
            value={title}
            onChange={this.handleChangeTitle}
          />
        </label>
        <br />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
        <br />
        <label htmlFor="users">
          Select user:
          <select
            name="select"
            id="users"
            onChange={this.handleChangeUser}
            value={userId}
          >
            <option value="0" hidden>Please select a user</option>
            {this.props.users.map(el => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        {hasUserError && (
          <span className="error">Please select a user</span>
        )}
        <br />
        <label htmlFor="status">
          Completed:
          <input
            type="checkbox"
            id="status"
            checked={completed}
            onChange={this.handleChangeStatus}
          />
        </label>
        <br />
        <button type="submit">Enter</button>
      </form>
    );
  }
}

FormToAdd.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  newTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
