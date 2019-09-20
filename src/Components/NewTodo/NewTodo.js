import React from 'react';
import './NewTodo.css';
import cx from 'classnames';
import { newTodoPropTypes } from '../PropTypes/PropTypes';

class NewTodo extends React.Component {
  state = {
    users: [...this.props.users],
    id: 3,
    inputTitle: '',
    inputUser: '',
    errorTitle: null,
    errorUser: null,
  }

  handleInputTitleChange = ({ target }) => {
    this.setState({
      inputTitle: target.value,
      errorTitle: null,
    });
  }

  handleUserChange = ({ target }) => {
    this.setState({
      inputUser: target.value,
      errorUser: null,
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    const {
      inputTitle, inputUser, id, users,
    } = this.state;
    const { addNewTodo } = this.props;

    if (!inputTitle && !inputUser) {
      this.setState({
        errorTitle: 'Write a title',
        errorUser: 'Choose a user',
      });
    } else if (!inputTitle) {
      this.setState({
        errorTitle: 'Write a title',
      });
    } else if (!inputUser) {
      this.setState({
        errorUser: 'Choose a user',
      });
    } else {
      addNewTodo({
        userId: inputUser.id,
        id,
        title: inputTitle,
        completed: false,
        user: users
          .find(user => user.name === inputUser),
      });
      this.setState(prevState => ({
        inputUser: '',
        inputTitle: '',
        id: prevState.id + 1,
        errorUser: null,
        errorTitle: null,
      }));
    }
  }

  render() {
    const {
      inputTitle, inputUser, errorTitle, errorUser, users,
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
            onChange={this.handleInputTitleChange}
            value={inputTitle}
            maxLength={30}
            placeholder="Write title of your TODO"
          />
          {errorTitle && <small className="error-msg">{errorTitle}</small>}
        </div>
        <div className="wrapper wrapper-bottom">
          <select
            value={inputUser}
            className={selectClass}
            type="text"
            name="todo-name"
            onChange={this.handleUserChange}
            placeholder="Write title"
          >
            <option value="">
              Select user
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
          Add new TODO!
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = newTodoPropTypes;

export default NewTodo;
