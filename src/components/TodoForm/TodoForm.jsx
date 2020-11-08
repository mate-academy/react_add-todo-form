import React from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends React.Component {
  state = {
    title: '',
    user: '',
    titleError: false,
    userError: false,
  }

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value.trim(),
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, user } = this.state;

    if (!title) {
      this.setState({ titleError: true });
    }

    if (!user) {
      this.setState({ userError: true });
    }

    if (title && user) {
      const { addTodos } = this.props;

      addTodos(user, title);
      this.setState({
        title: '',
        user: '',
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, user, titleError, userError } = this.state;

    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter the title"
          maxLength="20"
          value={title}
          onChange={this.handleChange}
        />
        {titleError && (
          <span className="error">Please enter the title!</span>
        )}
        <select
          name="user"
          value={user}
          onChange={this.handleChange}
        >
          <option value="">
            Choose a user
          </option>
          {users.map(item => (
            <option value={item.name} key={item.id}>{item.name}</option>
          ))}
        </select>
        {userError && (
          <span className="error">Please choose user!</span>
        )}
        <button type="submit">Add todo</button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodos: PropTypes.func.isRequired,
};
