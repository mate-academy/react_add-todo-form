import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    users: this.props.users,
    id: 3,
    userId: 0,
    title: '',
    errorMessage: false,
  }

  handleChange = ({ target }) => {
    const title = target.value;

    this.setState({
      title,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, title, userId } = this.state;
    const { addTodo } = this.props;

    if (title.trim() !== '' && userId !== 0) {
      const newTodo = {
        title,
        id,
        userId,
      };

      addTodo(newTodo);

      this.setState(prevState => ({
        title: '',
        id: prevState.id + 1,
        userId: 0,
        errorMessage: false,
      }));
    } else {
      this.setState({
        errorMessage: true,
      });
    }
  }

  selectUserId = ({ target }) => {
    const id = +target.value;

    this.setState({
      userId: id,
    });
  }

  render() {
    const { title, users, userId } = this.state;
    let { errorMessage } = this.state;
    const { handleSubmit, handleChange, selectUserId } = this;

    if (!errorMessage) {
      errorMessage = '';
    } else if (title.trim() === '') {
      errorMessage = 'Enter a title';
    } else {
      errorMessage = 'Choose a user';
    }

    return (
      <>
        <form onSubmit={handleSubmit} className="todo-list__form">
          <input
            type="text"
            placeholder="Add new todo"
            className="todo-list__input"
            value={title}
            onChange={handleChange}
          />
          <select
            value={userId}
            onChange={selectUserId}
            className="todo-list__select"
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.username} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="todo-list__submit"
          >
              Add
          </button>
        </form>
        <div className="error">{errorMessage}</div>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
