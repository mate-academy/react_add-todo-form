import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    user: '',
    title: '',
    userError: false,
    titleError: false,
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { user, title } = this.state;
    const { users } = this.props;

    if (!user) {
      this.setState({
        userError: true,
      });

      return;
    }

    if (!title) {
      this.setState({
        titleError: true,
      });

      return;
    }

    this.props.addTodo(users.find(person => person.name === user), title);

    this.setState({
      user: '',
      title: '',
    });
  }

  render() {
    const { user, title, userError, titleError } = this.state;

    return (
      <form
        name="usersTodos"
        className="form"
        onSubmit={this.onSubmit}
      >
        <label>
          <select
            className="input"
            value={user}
            name="user"
            onChange={(event) => {
              this.setState({
                [event.target.name]: event.target.value.trim(),
              });
            }}
          >
            <option value="">Choose user</option>
            {this.props.users.map(person => (
              <option value={person.name} key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          {userError
          && <p className="message">Please choose a user</p>}
        </label>
        <label>
          Title
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            onChange={(event) => {
              this.setState({
                [event.target.name]: event.target.value.trim(),
              });
            }}
          />
          {titleError
          && <p className="message">Please enter the title</p>}
        </label>
        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
    );
  }
}
Form.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  addTodo: PropTypes.func.isRequired,
};
