import React from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    errorMessage: false,
    errorSelect: false,
  }

  selectHandler = ({ target: { value } }) => {
    this.setState({
      userId: Number(value),
      errorSelect: false,
    });
  }

  inputTextHandler = ({ target: { value } }) => {
    this.setState({
      title: value,
      errorMessage: false,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { title, userId } = this.state;
    let isError = false;

    if (this.state.title.trim() === '') {
      isError = true;
      this.setState({
        errorMessage: true,
      });
    }

    if (userId === 0) {
      isError = true;
      this.setState({
        errorSelect: true,
      });
    }

    if (!isError) {
      const { users } = this.props;

      this.props.addTodo({
        id: this.props.todos.length + 1,
        user: users.find(user => user.id === userId),
        title,
        completed: false,
      });

      this.setState({
        title: '',
        userId: 0,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, userId, errorMessage, errorSelect } = this.state;

    return (
      <form onSubmit={this.submitHandler} className="form">

        <label htmlFor="todo">
            Todo:
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Your Task"
            onChange={this.inputTextHandler}
            value={title}
            className="input"
          />
        </label>
        {errorMessage
            && (
              <div className="error">
                Enter Your Task
              </div>
            )}

        <label htmlFor="user">
          User:
          <select
            value={userId}
            onChange={this.selectHandler}
            className="input"
            id="user"
          >
            <option value={0} disabled>Choose User</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        {errorSelect
          && (
            <span className="error">
              Choose User
            </span>
          )}

        <button className="button" type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default NewTodo;
