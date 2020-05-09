/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    userId: '',
    id: null,
    title: '',
    completed: false,
    user: null,
    isUserSelected: true,
    isTodoInputed: true,
  };

  handleSelect = (id) => {
    const { users } = this.props;
    console.log(this.state);

    this.setState({
      userId: +id,
      user: users.find(user => (user.id === +id)),
      isUserSelected: true,
    });
  }

  handleAddInput = (event) => {
    event.preventDefault();
    console.log(this.state);

    this.setState({
      title: event.target.value.trim(),
      isTodoInputed: true,
    });
  }

  handleClearState = () => {
    this.setState({
      userId: '',
      id: null,
      title: '',
      completed: false,
      user: null,
      isUserSelected: true,
      isTodoInputed: true,
    });
  }

  handleSubmit = (event) => {
    const { userId, title, completed, user } = this.state;
    const { todos, addTodo } = this.props;

    console.log(this.state);
    event.preventDefault();

    if (!userId) {
      this.setState({ isUserSelected: false });
    }

    if (!title) {
      this.setState({ isTodoInputed: false });
    }

    if (userId && title) {
      addTodo({
        userId,
        id: todos.length + 1,
        title,
        completed,
        user,
      });
    }

    this.handleClearState();
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
                unchosen: !isUserSelected,
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
                unchosen: !isTodoInputed,
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
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NewTodo;
