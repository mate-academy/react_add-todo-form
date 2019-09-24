import React from 'react';
import './NewTodo.css';
import cx from 'classnames';
import { newTodoPropTypes } from '../PropTypes/PropTypes';

class NewTodo extends React.Component {
  state = {
    users: [...this.props.users],
    id: 3,
    titleChange: '',
    userChange: '',
    errorTitle: null,
    errorUser: null,
  }

  handleTitleChange = ({ target }) => {
    this.setState({
      titleChange: target.value,
      errorTitle: null,
    });
  }

  handleUserChange = ({ target }) => {
    this.setState({
      userChange: target.value,
      errorUser: null,
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    const {
      titleChange, userChange, id, users,
    } = this.state;
    const { addNewTodo } = this.props;

    if (!titleChange && !userChange) {
      this.setState({
        errorTitle: 'Write a title',
        errorUser: 'Choose a user',
      });
    } else if (!titleChange) {
      this.setState({
        errorTitle: 'Write a title',
      });
    } else if (!userChange) {
      this.setState({
        errorUser: 'Choose a user',
      });
    } else {
      addNewTodo({
        userId: userChange.id,
        id,
        title: titleChange,
        completed: false,
        user: users
          .find(user => user.name === userChange),
      });
      this.setState((prevState) => {
        return ({
          userChange: '',
          titleChange: '',
          id: prevState.id + 1,
          errorUser: null,
          errorTitle: null,
        });
      });
    }
  }

  render() {
    const {
      titleChange, userChange, errorTitle, errorUser, users,
    } = this.state;

    const inputClass = cx('text-input', {
      'text-input-error': !!errorTitle,
    });
    const selectClass = cx('select-input', {
      'select-input-error': !!errorUser,
    });

    return (
      <form
        className="form"
        onSubmit={this.handleButtonSubmit}
      >
        <div className="wrapper">
          <input
            className={inputClass}
            type="text"
            onChange={this.handleTitleChange}
            value={titleChange}
            maxLength={30}
            placeholder="Write title of your TODO"
          />
          {errorTitle && <small className="error-msg">{errorTitle}</small>}
        </div>
        <div className="wrapper wrapper-bottom">
          <select
            value={userChange}
            className={selectClass}
            type="text"
            name="todo-name"
            onChange={this.handleUserChange}
            placeholder="Write title"
          >
            <option value="">
              Select User
            </option>
            {users.map(value => (
              <option key={value.id} value={value.name}>{value.name}</option>
            ))}
          </select>
          {errorUser && <small className="error-msg">{errorUser}</small>}
        </div>
        <button
          className="submit-button"
          type="submit"
        >
          Add new Todo
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = newTodoPropTypes;

export default NewTodo;
