import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.scss';
import users from '../../api/users';

const newTodo = {
  newTitle: {
    htmlFor: 'title',
    label: 'Title:',
    placeholder: 'Todo title',
    default: '',
    maxLength: titleText => (titleText.replace(/\s/g, '').length > 25
      ? 'Maximum length of Title'
      : null),
    isError: titleText => (!titleText ? 'Empty line' : ''),
  },
  newUser: {
    htmlFor: 'user',
    placeholder: 'Select User',
    default: 0,
    isError: userId => (!userId ? 'User not found' : ''),
  },
};
const { newTitle, newUser } = newTodo;

class NewTodo extends React.Component {
  state = {
    errorMessage: '',
    title: newTitle.default,
    user: newUser.default,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, user } = this.state;

    if (!newTitle.isError(title) && !newUser.isError(user)) {
      this.props.createNewTodo({
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

  handleChangeForm = ({ name, value }) => {
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  };

  handleChangeTitle = (target) => {
    const { value } = target;

    if (newTitle.maxLength(value)) {
      this.setState({
        errorMessage: newTitle.maxLength(value),
      });
    } else {
      this.handleChangeForm(target);
    }
  };

  render() {
    const {
      title,
      user,
      errorMessage,
    } = this.state;

    const {
      handleChangeTitle,
      handleChangeForm,
      handleSubmit,
    } = this;

    return (
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor={newTitle.htmlFor}>
          {newTitle.label}
          {' '}
          <input
            className="input"
            type="text"
            id={newTitle.htmlFor}
            name={newTitle.htmlFor}
            placeholder={newTitle.placeholder}
            value={title}
            onChange={event => handleChangeTitle(event.target)}
          />
        </label>
        <select
          className="select"
          name={newUser.htmlFor}
          value={user}
          onChange={event => handleChangeForm(event.target)}
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

NewTodo.propTypes = {
  createNewTodo: PropTypes.func.isRequired,
};

export default NewTodo;
