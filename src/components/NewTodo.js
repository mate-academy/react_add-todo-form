import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    name: '',
    completed: '',
    userId: 0,
    id: this.props.lastId,

    checkTitle: false,
    checkUser: false,
    checkCompleated: false,
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
    if (event.target.value === 'true') {
      this.setState({
        completed: true,
        checkCompleated: false,
      });
    }

    if (event.target.value === 'false') {
      this.setState({
        completed: false,
        checkCompleated: false,
      });
    }
  }

  reset = () => {
    this.setState(prev => (
      {
        title: '',
        name: '',
        completed: '',
        userId: 0,
        id: prev.id + 1,

        checkTitle: false,
        checkUser: false,
        checkCompleated: false,
      }
    ));
  }

  sendTodo = (event) => {
    const { name, title, userId, id, completed } = this.state;

    event.preventDefault();
    if (title.length === 0) {
      this.setState({
        checkTitle: true,
      });

      return;
    }

    if (userId === 0) {
      this.setState({
        checkUser: true,
      });

      return;
    }

    if (completed.length === 0) {
      this.setState({
        checkCompleated: true,
      });

      return;
    }

    this.props.addTodos({
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
      completed,
      checkCompleated } = this.state;

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
              className={checkCompleated
                ? 'form__error'
                : ''}
              value={completed}
              id="selectStatus"
              onChange={this.statusTodo}
            >
              <option value="" hidden>Chose status</option>
              <option value>done</option>
              <option value={false}>in process</option>
            </select>
            {checkCompleated
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
