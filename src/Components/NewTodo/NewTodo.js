import React from 'react';
import './NewTodo.css';
import cx from 'classnames';
import { newTodoPropTypes } from '../PropTypes/PropTypes';

class NewTodo extends React.Component {
  state = {
    users: [...this.props.users],
    id: 3,
    titleValue: '',
    userValue: '',
    errorTitle: null,
    errorUser: null,
  }

  handletitleValue = ({ target }) => {
    this.setState({
      titleValue: target.value,
      errorTitle: null,
    });
  }

  handleuserValue = ({ target }) => {
    this.setState({
      userValue: target.value,
      errorUser: null,
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    const {
      titleValue, userValue, id, users,
    } = this.state;
    const { addNewTodo } = this.props;

    if (!titleValue && !userValue) {
      this.setState({
        errorTitle: 'Write a title',
        errorUser: 'Choose a user',
      });
    } else if (!titleValue) {
      this.setState({
        errorTitle: 'Write a title',
      });
    } else if (!userValue) {
      this.setState({
        errorUser: 'Choose a user',
      });
    } else {
      addNewTodo({
        userId: userValue.id,
        id,
        title: titleValue,
        completed: false,
        user: users
          .find(user => user.name === userValue),
      });
      this.setState((prevState) => {
        return ({
          userValue: '',
          titleValue: '',
          id: prevState.id + 1,
          errorUser: null,
          errorTitle: null,
        });
      });
    }
  }

  render() {
    const {
      titleValue, userValue, errorTitle, errorUser, users,
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
            onChange={this.handletitleValue}
            value={titleValue}
            maxLength={30}
            placeholder="Write title of your TODO"
          />
          {errorTitle && <small className="error-msg">{errorTitle}</small>}
        </div>
        <div className="wrapper wrapper-bottom">
          <select
            value={userValue}
            className={selectClass}
            type="text"
            name="todo-name"
            onChange={this.handleuserValue}
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
