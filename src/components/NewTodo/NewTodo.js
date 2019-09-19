import React from 'react';
import './NewTodo.css';
import users from '../../api/users';
import { NewTodoPropTypes } from '../../constants/proptypes';

class NewTodo extends React.Component {
  state = {
    titleValue: '',
    userValue: 0,
    isErrorTitle: false,
    isErrorUser: false,
  }

  handleSubmitNewTodo = (event) => {
    event.preventDefault();
    const { title, user } = event.target;
    const { onAdd } = this.props;

    if (title.value.length > 0 && +user.value !== 0) {
      const todo = {
        userId: user.value,
        title: title.value,
      };

      onAdd(todo);

      this.setState({
        titleValue: '',
        userValue: 0,
      });
    }

    if (title.value.length <= 0 && +user.value === 0) {
      this.setState({
        isErrorTitle: true,
        isErrorUser: true,
      });
    }

    if (title.value.length <= 0) {
      this.setState({
        isErrorTitle: true,
      });
    }

    if (+user.value === 0) {
      this.setState({
        isErrorUser: true,
      });
    }
  }

  handleTitleChange = (event) => {
    const { value } = event.target;

    this.setState({
      titleValue: value.replace(/[^ \w]+/g, ''),
      isErrorTitle: false,
    });
  }

  handleUserChange = (event) => {
    const { value } = event.target;

    this.setState({
      userValue: +value,
      isErrorUser: false,
    });
  }

  render() {
    const {
      titleValue,
      userValue,
      isErrorTitle,
      isErrorUser,
    } = this.state;

    return (
      <div className="wrapper">
        <h1 className="header">Static list of todos</h1>
        <div className="form-container">
          <h2 className="form-heading">Add new todo</h2>
          <form onSubmit={this.handleSubmitNewTodo} className="form">
            <div className="form-item">
              <label>
                <input
                  className="form-input"
                  type="text"
                  name="title"
                  value={titleValue}
                  onChange={this.handleTitleChange}
                  maxLength={25}
                  placeholder="Enter what to do"
                />
              </label>
              <p
                className={isErrorTitle ? 'form-error' : 'hidden'}
              >
                Please enter the title
              </p>
            </div>
            <div className="form-item">
              <label>
                <select
                  className="form-select"
                  name="user"
                  value={userValue}
                  onChange={this.handleUserChange}
                >
                  <option value={0}>Choose a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </label>
              <p
                className={isErrorUser ? 'form-error' : 'hidden'}
              >
                Please choose a user
              </p>
            </div>
            <button type="submit" className="form-btn">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

NewTodo.propTypes = NewTodoPropTypes;

export default NewTodo;
