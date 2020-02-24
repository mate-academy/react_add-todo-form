import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    users: this.props.users,
    title: '',
    userId: 0,
    id: 3,
    errorTitle: false,
    errorUser: false,
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { userId, id, title, errorTitle, errorUser } = this.state;

    this.setState({
      errorTitle: title.length === 0,
      errorUser: userId === 0,
    });

    if (errorUser || errorTitle) {
      return;
    }

    const todo = {
      userId, id, title,
    };

    this.props.addTodo(todo);
    this.setState(prevState => ({
      id: prevState.id + 1,
      title: '',
      userId: 0,
    }));
  };

  onChange = (e) => {
    this.setState({
      title: e.target.value.trimLeft(),
    });
  };

  onSelectName = (e) => {
    this.setState({
      userId: e.target.value,
      errorUser: false,
    });
  };

  clearErrorTitle = () => {
    this.setState({
      errorTitle: false,
    });
  }

  render() {
    const { users, title, userId, errorTitle, errorUser } = this.state;

    return (
      <>
        <form onSubmit={this.onSubmit} className="form">
          <input
            value={title}
            onChange={this.onChange}
            onSelect={this.clearErrorTitle}
            type="text"
            placeholder="Enter the name of todo"
            className="form__input"
          />
          <select
            onChange={this.onSelectName}
            value={userId}
            className="form__select"
          >
            <option value={0} key={0} disabled> Choose the user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>
        {errorTitle && (
          <span className="form__error">
          Write the title of todo
          </span>
        )}

        {errorUser && (
          <span className="form__error">
          Choose the user
          </span>
        )}
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};
