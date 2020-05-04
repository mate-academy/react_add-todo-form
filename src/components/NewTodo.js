import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    name: '',
    completed: '',
    userId: null,
    id: this.props.lastId,
    status: '',

    checkTitle: false,
    checkUser: false,
    checkCompleted: false,
  }

  addTodoText = (event) => {
    const target = event.target.value;

    if (/^ /.test(target)) {
      return;
    }

    this.setState(
      {
        title: target,
        checkTitle: false,
      },
    );
  }

  addUser = (id) => {
    const { users } = this.props;

    this.setState(
      {
        userId: +id,
        name: users.find(user => user.id === +id).name,
        checkUser: false,
      },
    );
  }

  statusTodo = (event) => {
    const target = event.target.value;

    this.setState({
      completed: Boolean(+target),
      status: target,
      checkCompleted: false,
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
        checkTitle: false,
        checkUser: false,
        checkCompleted: false,
      }
    ));
  }

  sendTodo = (event) => {
    const { name, title, userId, id, completed, status } = this.state;
    const { addTodos } = this.props;

    event.preventDefault();
    if (title.length === 0 || userId === null || status.length === 0) {
      this.setState({
        checkTitle: true,
        checkUser: true,
        checkCompleted: true,
      });

      if (title) {
        this.setState({
          checkTitle: false,
        });
      }

      if (userId) {
        this.setState({
          checkUser: false,
        });
      }

      if (status) {
        this.setState({
          checkCompleted: false,
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
      checkTitle,
      userId,
      checkUser,
      status,
      checkCompleted } = this.state;

    return (
      <>
        <form onSubmit={this.sendTodo}>
          <label htmlFor="inputText">
            New todo:
            <input
              className={checkTitle
                ? 'form__error'
                : ''}
              value={title}
              onChange={this.addTodoText}
              id="inputText"
              type="text"
            />
            {checkTitle
              && (
                <div className="form__error--message">
                  Please enter the title
                </div>
              )
            }
          </label>
          <label htmlFor="choseUser">
            Chose user:
            <select
              className={checkUser
                ? 'form__error'
                : ''}
              value={userId}
              id="choseUser"
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
            {checkUser
              && <p className="form__error--message">Please choose user</p>
            }
          </label>
          <label htmlFor="selectStatus">
            Status of todo:
            <select
              className={checkCompleted
                ? 'form__error'
                : ''}
              value={status}
              id="selectStatus"
              onChange={this.statusTodo}
            >
              <option value="" hidden>Chose status</option>
              <option value={1}>done</option>
              <option value={0}>in process</option>
            </select>
            {checkCompleted
              && <p className="form__error--message">Please choose status</p>
            }
          </label>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default NewTodo;

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  lastId: PropTypes.number.isRequired,
  addTodos: PropTypes.func.isRequired,
};
