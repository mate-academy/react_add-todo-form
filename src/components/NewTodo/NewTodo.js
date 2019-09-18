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
    isLimited: titleText => (titleText.length > 20
      ? 'Maximum length of Title'
      : ''),
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

  onFormChange = ({ name, value }) => {
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  };

  onTitleChange = (target) => {
    const { value } = target;

    if (newTitle.isLimited(value)) {
      this.setState({
        errorMessage: newTitle.isLimited(value),
      });
    } else {
      this.onFormChange(target);
    }
  };

  render() {
    const {
      errorMessage,
      title,
      user,
    } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <label className="label" htmlFor={newTitle.htmlFor}>
          {newTitle.label}
          <input
            className="input"
            type="text"
            id={newTitle.htmlFor}
            name={newTitle.htmlFor}
            placeholder={newTitle.placeholder}
            value={title}
            onChange={e => this.onTitleChange(e.target)}
          />
        </label>
        <select
          className="select"
          name={newUser.htmlFor}
          value={user}
          onChange={e => this.onFormChange(e.target)}
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
        <button className="button" type="submit">
          Add
        </button>
        <p className="error-message">{errorMessage}</p>
      </form>
    );
  }
}

NewTodo.propTypes = NewTodoTypes;
