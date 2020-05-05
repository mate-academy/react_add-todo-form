import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';
import classNames from 'classnames';

export class NewTodoForm extends React.Component {
  state = {
    userId: '',
    id: this.props.todosLength,
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
            className={classNames({
              form__item: true,
              form__input: true,
              form__error: checkTitle,
            })}
            placeholder="Write todo title here..."
            onChange={this.setTitle}
            value={title}
          />
        </label>
        {checkTitle && (
          <span className="form__error-span">
            Please, enter a title
          </span>
        )}
        <label>
          <select
            onChange={this.selectUser}
            className={classNames({
              form__item: true,
              form__select: true,
              form__error: checkUser,
            })}
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
        {checkUser && (
          <span className="form__error-span">
            Please, select a user
          </span>
        )}
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
  todosLength: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
