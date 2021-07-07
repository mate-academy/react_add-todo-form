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

  handleChangeUser = (event) => {
    this.setState({
      user: this.props.users.find(user => user.id === +event.target.value),
      userId: +event.target.value,
      userError: '',
    });
    // console.log(this.user),
    // console.log(+event.target.value));
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
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

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState((prev) => {
      const nextState = {};

      if (prev.title.trim() === '') {
        nextState.titleError = `Please, enter the title`;
      }

      if (prev.userId === '') {
        nextState.userError = `Please, choose the user`;
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

        <label htmlFor="todoTitle">Add todo title:</label>
        <input
          type="text"
          id="todoTitle"
          value={title}
          onChange={this.handleChangeTitle}
        />

        {titleError && <div>{titleError}</div>}

        <br />
        <label
          className="todo__complete"
          htmlFor="todoCompleted"
        >
          Complete status:
        </label>
        <input
          type="checkbox"
          id="todoCompleted"
          checked={completed}
          onChange={this.handleChangeCheckbox}
        />
        <br />
        <label
          htmlFor="todoUser"
        >
          User selection:
        </label>
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
        {userError && <div>{userError}</div>}
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
