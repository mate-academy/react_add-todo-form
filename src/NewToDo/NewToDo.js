import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './NewToDo.css';

class NewToDo extends React.Component {
  state = {
    userId: 1,
    id: this.props.toDoId + 1,
    title: '',
    completed: true,
    user: 'select user',
    invalidTitle: false,
    invalidUser: false,
  };

  changeUser = (event) => {
    this.setState(
      {
        user: event.target.value,
      },
    );
    this.setState(prevState => (
      {
        userId: this.props.users.find(
          user => user.name === prevState.user,
        ).id,
      }));
  };

  changeTextArea = (event) => {
    this.setState(
      {
        title: event.target.value.replace(/\W{2,}/g, ' '),
      },
    );
  };

  taskStatus = (event) => {
    if (event.target.value === 'true') {
      this.setState(
        {
          completed: true,
        },
      );
    } else {
      this.setState(
        {
          completed: false,
        },
      );
    }
  };

  submitForm = (event) => {
    event.preventDefault();
    if (this.state.title.length > 0 && this.state.title !== ' ') {
      this.setState({ invalidTitle: false });
      if (this.state.user !== 'select user') {
        this.props.addToDo(
          {
            userId: this.state.userId,
            id: this.state.id,
            title: this.state.title.trim(),
            completed: this.state.completed,
            user: this.state.user,
          },
        );
        this.setState(prevState => (
          {
            title: '',
            id: prevState.id + 1,
            user: 'select user',
            invalidUser: false,
          }
        ));
      } else {
        this.setState({ invalidUser: true });
      }
    } else {
      this.setState(
        {
          invalidTitle: true,
        },
      );
    }
  };

  render() {
    const { users } = this.props;
    const { user, complete, title, invalidTitle, invalidUser } = this.state;

    return (
      <>
        <h1>
          New todo
        </h1>
        <form onSubmit={this.submitForm} className="form">
          <label htmlFor="text" className="form__item">
            Enter task:
            <input
              type="text"
              onChange={this.changeTextArea}
              id="text"
              value={title}
              placeholder="enter task please"
              className={
                ClassNames({ form__invalidtext: invalidTitle })
              }
            />
          </label>
          {invalidTitle && (
            <span className="form__error">
              Please, enter task
            </span>
          )}
          <label htmlFor="user" className="form__item">
            User:
            <select
              value={user}
              onChange={this.changeUser}
              id="user"
              className={
                ClassNames({ form__invaliduser: invalidUser })
              }
            >
              <option value={user}>{user}</option>
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </label>
          {invalidUser && (
            <span className="form__error">
              Please, choose user
            </span>
          )}
          <label htmlFor="status" className="form__item">
            Task status:
            <select
              value={complete}
              onChange={this.taskStatus}
              id="status"
            >
              <option value="true">Done</option>
              <option value="false">Doing</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

NewToDo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    },
  )).isRequired,
  addToDo: PropTypes.func.isRequired,
  toDoId: PropTypes.number.isRequired,
};

export default NewToDo;
