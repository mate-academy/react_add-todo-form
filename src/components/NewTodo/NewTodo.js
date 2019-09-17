import React, { Component } from 'react';
import './NewTodo.scss';
import users from '../../api/users';
import { NewTodoTypes } from '../../constants/proptypes';

const newTodoForm = {
  newTitle: {
    htmlFor: 'title',
    label: 'Title:',
    placeholder: 'ToDo title',
    default: '',
    isError: titleText => (!titleText ? 'Empty title' : ''),
  },
  newUser: {
    htmlFor: 'user',
    placeholder: 'Select User',
    default: 0,
    isError: userId => (!userId ? 'No user selected' : ''),
  },
};
const { newTitle, newUser } = newTodoForm;

export default class NewTodo extends Component {
  state = {
    errorMessage: '',
    title: newTitle.default,
    user: newUser.default,
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { title, user } = this.state;

    if (!newTitle.isError(title) && !newUser.isError(user)) {
      this.props.onAdd({
        userId: Number(user),
        title,
      });
      this.setState({
        user: newUser.default,
        title: newTitle.default,
      });
    } else {
      this.setState({
        errorMessage: `${newTitle.isError(title)} ${newUser.isError(user)}`,
      });
    }
  };

  onFormChange = (name, value) => {
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  };

  render() {
    const {
      onFormSubmit,
      onFormChange,
      state: {
        errorMessage,
        title,
        user,
      },
    } = this;

    return (
      <form onSubmit={e => onFormSubmit(e)}>
        <label className="label" htmlFor={newTitle.htmlFor}>
          {newTitle.label}
          <input
            className="input"
            type="text"
            id={newTitle.htmlFor}
            name={newTitle.htmlFor}
            placeholder={newTitle.placeholder}
            value={title}
            onChange={e => onFormChange(e.target.name, e.target.value)}
          />
        </label>
        <select
          className="select"
          name={newUser.htmlFor}
          value={user}
          onChange={e => onFormChange(e.target.name, e.target.value)}
        >
          <option selected="true">
            {newUser.placeholder}
          </option>
          {users.map(userItem => (
            <option value={userItem.id}>
              {userItem.name}
            </option>
          ))}
        </select>
        <button className="button" type="submit">Add</button>
        <p className="error-message">{errorMessage}</p>
      </form>
    );
  }
}

NewTodo.propTypes = NewTodoTypes;
