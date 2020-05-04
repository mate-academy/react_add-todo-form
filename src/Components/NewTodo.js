import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';
import './Form.scss';

class NewTodo extends React.Component {
  state = {
    userId: '',
    title: '',
    completed: '',
    id: this.props.todoId,
    titleError: false,
    userError: false,

  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value.replace(/[^a-z\s]/gi, ''),
      titleError: false,
    });
  }

  handleChangeUser = (event) => {
    this.setState({
      userId: +event.target.value,
      userError: false,
    });
  }

  resetForm = () => {
    this.setState(prev => (
      {
        title: '',
        completed: '',
        userId: '',
        id: prev.id + 1,

      }
    ));
  }

handleStatus = (event) => {
  if (event.target.value === 'done') {
    this.setState({
      completed: 'done',

    });
  }

  if (event.target.value === 'in procces') {
    this.setState({
      completed: 'in procces',
    });
  }
};

handleSubmit = (event) => {
  const { title, userId, completed, id } = this.state;

  event.preventDefault();

  if (title.length === 0) {
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

  this.props.newTodo({
    title,
    user: users.find(user => userId === user.id),
    completed,
    id: id + 1,

  });

  this.resetForm();
}

render() {
  // const { users } = this.props;
  const { title, userId, titleError, userError } = this.state;

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

      <select
        className="form__status"
        onChange={this.handleStatus}
      >
        <option value="" hidden>Choose a status</option>
        <option value="done">done</option>
        <option value="in process">in process</option>
      </select>
      <br />

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
  // users: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   name: PropTypes.string,
  // })).isRequired,
};

export default NewTodo;
