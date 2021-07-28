import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    title: '',
    titleError: false,
    userId: '',
    userIdError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      this.setState({ 
        [name]: value,
        titleError: value === '',
      });
    }

    if (name === 'userId') {
      this.setState({ 
        [name]: value,
        userIdError: value === '',
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { titleError, userIdError, title, userId } = this.state;

    if (title === '' || userId === '') {
      this.setState({
        titleError: title === '',
        userIdError: userId === '',
      });

      return;
    }

    if (!titleError && !userIdError) {
      this.props.addTodo(title, userId);
      this.clearForm();
    }
  }

  clearForm = () => {
    this.setState({ title: '', userId: '' });
  }

  render() {
    const { title, userId, titleError, userIdError } = this.state;
    const { users  } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            value={title}
            placeholder="ToDo description"
            onChange={this.handleChange}
          />
          {titleError
            && (<span className="error">Input ToDo description</span>)}
          <select
            name="userId"
            value={userId}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {userIdError
            && (<span className="error">Choose user option</span>)}
          <button type="submit">Add</button>
        </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
}
