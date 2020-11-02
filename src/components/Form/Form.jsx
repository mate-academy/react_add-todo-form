import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    user: '',
    title: '',
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { user, title } = this.state;
    const { users } = this.props;

    if (user.length === 0) {
      this.setState({
        userMessage: 'Please choose a user',
      });

      return;
    }

    if (title.length === 0) {
      this.setState({
        titleMessage: 'Please enter the title',
      });

      return;
    }

    this.props.addTodo(users.find(person => person.name === user), title);

    this.setState({
      user: '',
      title: '',
      titleMessage: '',
      userMessage: '',
    });
  }

  render() {
    const { user, title, userMessage, titleMessage } = this.state;

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
            <option value="">Please, choose user</option>
            {this.props.users.map(person => (
              <option value={person.name} key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          {userMessage ? <p className="message">{userMessage}</p> : ''}
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
          {titleMessage ? <p className="message">{titleMessage}</p> : ''}
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
