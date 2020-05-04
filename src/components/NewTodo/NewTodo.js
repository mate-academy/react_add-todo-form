import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    name: '',
    completed: '',
    userId: '',
    id: this.props.todoId,
    status: '',
    showTitleError: false,
    showUserError: false,
    showStatusError: false,
  }

  addTodoText = (event) => {
    this.setState(
      {
        title: event.target.value.replace(/[^a-zа-я0-9\s]/g, ''),
        showTitleError: false,
      },
    );
  }

  addUser = (id) => {
    const { users } = this.props;

    this.setState(
      {
        userId: +id,
        name: users.find(user => user.id === +id).name,
        showUserError: false,
      },
    );
  }

  statusTodo = (event) => {
    const target = event.target.value;

    this.setState({
      completed: Boolean(+target),
      status: target,
      showStatusError: false,
    });
  }

  reset = () => {
    this.setState(prev => (
      {
        title: '',
        name: '',
        completed: '',
        userId: '',
        id: prev.id + 1,
        status: '',
        showTitleError: false,
        showUserError: false,
        showStatusError: false,
      }
    ));
  }

  sendTodo = (event) => {
    const { name, userId, id, completed, status } = this.state;
    let { title } = this.state;
    const { addTodos } = this.props;

    title = title.trim();

    event.preventDefault();
    if (title.length === 0) {
      this.setState({
        showTitleError: true,
        showUserError: true,
        showStatusError: true,
      });

      if (title) {
        this.setState({
          showTitleError: false,
        });
      }

      if (userId) {
        this.setState({
          showUserError: false,
        });
      }

      if (status) {
        this.setState({
          showStatusError: false,
        });
      }

      return;
    }

    addTodos({
      name,
      title,
      userId,
      id,
      completed,
    });
    this.reset();
  }

  render() {
    const { users } = this.props;
    const { title,
      showTitleError,
      userId,
      showUserError,
      status,
      showStatusError } = this.state;

    return (
      <>
        <form className="form" onSubmit={this.sendTodo}>
          <label className="form__item">
            <span className="form__name">Todo title</span>
            <input
              className={showTitleError
                ? 'form__error'
                : ''}
              value={title}
              onChange={this.addTodoText}
              type="text"
            />
            {showTitleError
              && (
                <div className="form__error--message">
                  Please enter the title
                </div>
              )
            }
          </label>
          <br />
          <label className="form__item">
            <span className="form__name">Chose user</span>
            <select
              className={showUserError
                ? 'form__error'
                : ''}
              value={userId}
              onChange={e => this.addUser(e.target.value)}
            >
              <option value="" hidden>
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {showUserError
              && (
                <div className="form__error--message">
                  Please choose user
                </div>
              )
            }
          </label>
          <br />
          <label className="form__item">
            <span className="form__name">Status</span>
            <select
              className={showStatusError
                ? 'form__error'
                : ''}
              value={status}
              onChange={this.statusTodo}
            >
              <option value="" hidden>Chose status</option>
              <option value={1}>completed</option>
              <option value={0}>not completed</option>
            </select>
            {showStatusError
              && (
                <div className="form__error--message">
                  Please choose status
                </div>
              )
            }
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  todoId: PropTypes.number.isRequired,
  addTodos: PropTypes.func.isRequired,
};

export default NewTodo;
