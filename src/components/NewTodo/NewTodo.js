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

  checkStatusTodo = (event) => {
    const statusValue = event.target.value;

    this.setState({
      completed: Boolean(+statusValue),
      status: statusValue,
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
    if (title.length === 0 || userId === null || status.length === 0) {
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
    const {
      title,
      showTitleError,
      userId,
      showUserError,
      status,
      showStatusError,
    } = this.state;

    return (
      <>
        <form className="form" onSubmit={this.sendTodo}>
          <label className="form__item">
            Todo title
            <input
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
          <label className="form__item">
            Chose user
            <select
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
              && <p className="form__error--message">Please choose user</p>
            }
          </label>
          <label className="form__item">
            Status of todo
            <select
              value={status}
              onChange={this.checkStatusTodo}
            >
              <option value="" hidden>Chose status</option>
              <option value={1}>completed</option>
              <option value={0}>not completed</option>
            </select>
            {showStatusError
              && <p className="form__error--message">Please choose status</p>
            }
          </label>
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
