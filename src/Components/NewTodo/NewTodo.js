/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    userId: '',
    title: '',
    completed: false,
    user: null,
    isUserSelected: false,
    isTodoInputed: false,
  };

  handleSelect = (id) => {
    const { users } = this.props;

    this.setState({
      userId: +id,
      user: users.find(user => (user.id === +id)),
      isUserSelected: false,
    });
  }

  handleAddInput = (event) => {
    event.preventDefault();

    this.setState({
      title: event.target.value.trim(),
      isTodoInputed: false,
    });
  }

  handleClearState = () => {
    this.setState({
      userId: '',
      title: '',
      completed: false,
      user: null,
      isUserSelected: false,
      isTodoInputed: false,
    });
  }

  handleSubmit = (event) => {
    const { userId, title, completed, user } = this.state;
    const { todos, addTodo } = this.props;

    event.preventDefault();

    if (userId === '') {
      this.setState({ isUserSelected: true });
    }

    if (title === '') {
      this.setState({ isTodoInputed: true });
    }

    if (userId !== '' && title !== '') {
      addTodo({
        userId,
        id: todos.length + 1,
        title,
        completed,
        user,
      });

      this.handleClearState();
    }
  }

  render() {
    const {
      title,
      userId,
      isUserSelected,
      isTodoInputed,
    } = this.state;

    const { users } = this.props;

    return (
      <>
        <div className="todo__add">
          <form className="todo__form" onSubmit={this.handleSubmit}>

            <div className="todo__select">
              <select
                value={userId}
                onChange={e => this.handleSelect(e.target.value)}
              >
                <option
                  value=""
                  hidden
                >
                  choose user
                </option>

                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>

              <span className={classNames('todo__choose-user', {
                unchosen: isUserSelected,
              })}
              >
                please choose user
              </span>
            </div>

            <div className="todo__text-input">
              <input
                type="text"
                placeholder="add your new todo!"
                value={title.trim()}
                onChange={this.handleAddInput}
              />
              <span className={classNames('todo__add-todo', {
                unchosen: isTodoInputed,
              })}
              >
                please add todo
              </span>
            </div>

            <div className="todo__button">
              <button type="submit">
                <span>+</span>
              </button>
            </div>

          </form>
        </div>
      </>
    );
  }
}

NewTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NewTodo;
