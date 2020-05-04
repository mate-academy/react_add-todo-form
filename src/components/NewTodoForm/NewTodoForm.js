import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';

export class NewTodoForm extends React.Component {
  state = {
    userId: '',
    id: this.props.currentTodos,
    title: '',
    completed: false,
    checkTitle: false,
    checkUser: false,
  }

  setTitle = (event) => {
    this.setState({
      title: event.target.value,
      checkTitle: false,
    });
  };

  selectUser = (event) => {
    this.setState({
      userId: +event.target.value,
      checkUser: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState((state) => {
      const { userId, id, title, completed } = state;
      const { users, setNewTodo } = this.props;

      if (title.length === 0 || title.trim() === '') {
        return { checkTitle: true };
      }

      if (userId.length === 0) {
        return { checkUser: true };
      }

      setNewTodo({
        userId,
        id: id + 1,
        title,
        completed,
        user: users.find(user => user.id === userId),
      });

      return {
        userId: '',
        id: id + 1,
        title: '',
        completed: false,
        checkTitle: false,
        checkUser: false,
      };
    });
  }

  render() {
    const { users } = this.props;
    const { title, userId, checkTitle, checkUser } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label>
          <textarea
            type="text"
            className={checkTitle
              ? 'form__item form__input form__error'
              : 'form__item form__input'}
            placeholder="Write todo title here..."
            onChange={this.setTitle}
            value={title}
          />
        </label>
        <label>
          <select
            onChange={this.selectUser}
            className={checkUser
              ? 'form__item form__select form__error'
              : 'form__item form__select'}
            value={userId}
          >
            <option value="" hidden>Select a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="form__item form__button"
        >
          Add todo
        </button>
      </form>
    );
  }
}

NewTodoForm.propTypes = {
  setNewTodo: PropTypes.func.isRequired,
  currentTodos: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
