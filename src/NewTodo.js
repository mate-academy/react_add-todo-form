import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    completed: false,
    user: {},
    userId: '',
    titleError: '',
    userError: '',
  }

  handleChangeUser = (e) => {
    this.setState({
      user: this.props.users.find(user => user.id === e.target.value),
      userId: e.target.value,
      userError: '',
    });
  }

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
      titleError: '',
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
      userId: '',
      completed: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((prev) => {
      const nextState = {};

      if (prev.title.trim() === '') {
        nextState.titleError = `Please enter the title`;
      }

      if (prev.userId === '') {
        nextState.userError = `Please enter the user`;
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
      titleError,
      userError,
    } = this.state;

    return (
      <form className="todo__form" onSubmit={this.handleSubmit}>

        <label htmlFor="todoTitle">Add todo title</label>
        <input
          className="todo__input"
          type="text"
          id="todoTitle"
          value={title}
          onChange={this.handleChangeTitle}
        />

        {titleError && <div className="todo__error">{titleError}</div>}

        <br />
        <label
          className="todo__complete"
          htmlFor="todoCompleted"
        >
          Complete status
        </label>
        <input
          type="checkbox"
          id="todoCompleted"
          checked={completed}
          onChange={this.handleChangeCheckbox}
        />
        <br />
        <label
          className="todo__select-user"
          htmlFor="todoUser"
        >
          Select user
        </label>
        <select
          className="todo__select"
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
        {userError && <div className="todo__error">{titleError}</div>}
        <br />

        <button className="button" type="submit">Add todo</button>
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
