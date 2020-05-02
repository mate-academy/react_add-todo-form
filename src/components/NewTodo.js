import React from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    id: this.props.id,
    title: '',
    completed: false,
    user: {},
    userId: '',
    errorTitle: '',
    errorUser: '',
  }

  handleChangeUser = (e) => { // choose user
    this.setState({
      user: this.props.users.find(user => user.id === +e.target.value),
      userId: e.target.value,
      errorUser: '',
    });
  }

  handleChangeTitle = (e) => { // set title
    this.setState({
      title: e.target.value.replace(/[^a-z0-9\s]/gi, ''),
      errorTitle: '',
    });
  }

  handleChangeCheckbox = () => { // set checkbox
    this.setState(prev => ({
      completed: !prev.completed,
    }));
  }

  resetForm = () => { // form reset
    this.setState({
      title: '',
      completed: false,
      userId: '',
    });
  }

  handleSubmit = (e) => { // form submit
    e.preventDefault();

    if (this.state.title.length < 4) {
      this.setState({
        errorTitle:
  <div className="todo__error">
    Please enter the title
  </div>,
      });
    }

    if (this.state.userId === '') {
      this.setState({
        errorUser: <div className="todo__error">Please choose a user</div>,
      });
    }

    if (this.state.userId !== '' && this.state.title.length > 3) {
      this.setState(prev => ({
        id: prev.id + 1,
      }));

      this.props.addTodo(
        this.state.id,
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
          maxLength={30}
          value={title}
          onChange={this.handleChangeTitle}
        />
        {errorTitle}
        <br />

        <label htmlFor="todoCompleted">Complete status</label>
        <input
          type="checkbox"
          id="todoCompleted"
          checked={completed}
          onChange={this.handleChangeCheckbox}
        />
        {' '}
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
        {errorUser}
        <br />

        <button type="submit">Add todo</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default NewTodo;
