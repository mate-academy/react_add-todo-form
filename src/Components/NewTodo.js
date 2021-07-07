import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';
import './Form.scss';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    completed: '',
    id: this.props.todoId,
    titleError: false,
    userError: false,
    statusError: false,
  }

  handleChangeTitle = ({ target }) => {
    this.setState({
      title: target.value.trimLeft().replace(/[^a-z\s]/gi, ''),
      titleError: false,
    });
  }

  handleChangeUser = ({ target }) => {
    this.setState({
      userId: +target.value,
      userError: false,
    });
  }

  handleChangeStatus = ({ target }) => {
    if (target.value === '1') {
      this.setState({
        completed: true,
        statusError: false,
      });
    }

    if (target.value === '0') {
      this.setState({
        completed: false,
        statusError: false,
      });
    }
  };

  resetForm = () => {
    this.setState(prev => (
      {
        title: '',
        completed: '1',
        userId: '',
        id: prev.id + 1,

      }
    ));
  }

handleSubmit = (event) => {
  const { title, userId, completed, id } = this.state;

  event.preventDefault();

  if (!title.length) {
    this.setState({
      title: '',
      titleError: true,
    });

    return;
  }

  if (userId < 1) {
    this.setState({
      userError: true,
    });

    return;
  }

  if (completed.length === 0) {
    this.setState({
      statusError: true,
    });

    return;
  }

  this.props.newTodo({
    title,
    user: users.find(user => userId === user.id),
    completed,
    id: id + 1,

  });

  this.resetForm();
}

render() {
  const { title,
    userId,
    titleError,
    userError,
    statusError } = this.state;

  return (
    <form className="form" onSubmit={this.handleSubmit}>
      <label>
        <input
          className="form__input"
          type="text"
          placeholder="Write new todo"
          maxLength={30}
          value={title}
          onChange={this.handleChangeTitle}
        />
        {titleError && <p className="form__error"> Write new todo</p>}
      </label>

      <label>
        <select
          className="form__select"
          value={userId}
          onChange={this.handleChangeUser}
        >
          <option value="" hidden>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <br />
        {userError && <p className="form__error">Choose a user</p>}
      </label>
      <label>
        <select
          className="form__status"
          onChange={this.handleChangeStatus}
        >
          <option value="" hidden>Choose a status</option>
          <option value="1">done</option>
          <option value="0">in process</option>
        </select>
        <br />
        {statusError && <p className="form__error">Choose a status</p>}
      </label>
      <button
        type="submit"
        className="form__button"
      >
        Add
      </button>
    </form>
  );
}
}

NewTodo.propTypes = {
  newTodo: PropTypes.func.isRequired,
  todoId: PropTypes.string.isRequired,
};

export default NewTodo;
