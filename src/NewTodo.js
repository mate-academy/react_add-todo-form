import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
    completed: false,
    user: {},
    userId: '',
    errorTitle: '',
    errorUser: '',
  }

  handleChangeUser = (e) => {
    this.setState({
      user: this.props.users.find(user => user.id === e.target.value),
      userId: e.target.value,
      errorUser: '',
    });
  }

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  handleChangeCheckbox = () => {
    this.setState(prev => ({
      completed: !prev.completed,
    }));
  }

  resetForm = () => {
    this.setState({
      title: '',
      completed: false,
      userId: '',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((prev) => {
      const nextState = {};

      if (prev.title.trim() === '') {
        nextState.errorTitle = `Enter the title`;
      }

      if (prev.userId === '') {
        nextState.errorUser = `Enter the user`;
      }

      return nextState;
    });

    if (this.state.userId !== '' && this.state.title.trim() !== '') {
      this.props.addTodo(
        this.props.id,
        this.state.title,
        this.state.completed,
        this.state.user,
      );

      this.resetForm();
    }
  }

  render() {
    const {
      title,
      completed,
      userId,
      errorTitle,
      errorUser,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="todoTitle">Add todo title</label>
        <input
          type="text"
          id="todoTitle"
          value={title}
          onChange={this.handleChangeTitle}
        />
        {errorTitle && <div className="todo__error">{errorTitle}</div>}
        <br />
        <label htmlFor="todoCompleted">Complete status</label>
        <input
          type="checkbox"
          id="todoCompleted"
          checked={completed}
          onChange={this.handleChangeCheckbox}
        />

        <br />
        <label htmlFor="todoUser">Select user</label>
        <select
          id="todoUser"
          value={userId}
          onChange={this.handleChangeUser}
        >
          <option value="" hidden>Choose a user</option>
          {this.props.users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {errorUser && <div className="todo__error">{errorTitle}</div>}
        <br />

        <button type="submit">Add todo</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NewTodo;
