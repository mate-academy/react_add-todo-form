import React, { Component } from 'react';
import './NewTodo.scss';
import users from '../../api/users';
import { NewTodoTypes } from '../../constants/proptypes';

const newTodoForm = {
  title: {
    htmlFor: 'title',
    label: 'Title:',
    placeholder: 'ToDo title',
  },
  user: {
    htmlFor: 'user',
    placeholder: 'Select User',
    default: 0,
  },
};

export default class NewTodo extends Component {
  onFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { title, user } = newTodoForm;

    this.props.onAdd({
      userId: Number(data.get(user.htmlFor)),
      title: data.get(title.htmlFor),
    });
    this.forceUpdate();
  };

  render() {
    const { title, user } = newTodoForm;

    return (
      <form onSubmit={e => this.onFormSubmit(e)}>
        <label className="label" htmlFor={title.htmlFor}>
          {title.label}
          <input
            className="input"
            type="text"
            id={title.htmlFor}
            name={title.htmlFor}
            placeholder={title.placeholder}
          />
        </label>
        <select
          className="select"
          name={user.htmlFor}
        >
          <option value={user.default} selected="true">
            {user.placeholder}
          </option>
          {users.map(userItem => (
            <option value={userItem.id}>
              {userItem.name}
            </option>
          ))}
        </select>
        <button className="button" type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = NewTodoTypes;
