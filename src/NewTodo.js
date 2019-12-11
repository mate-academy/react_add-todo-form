import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    user: '',
    error: null,
  };

  handleInputChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
      error: null,
    });
  };

  handleSelectChange = ({ target }) => {
    const { value } = target.value;

    this.setState({
      user: value,
      error: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userSelect } = event.target;
    const { todos, users, addTodo } = this.props;
    const { error } = this.state;

    if (title.value.length === 0) {
      this.setState({
        error: 'You must write todo',
      });

      return;
    }

    if (!userSelect.value) {
      this.setState({
        error: 'You must choose a user',
      });

      return;
    }

    if (!error) {
      const newTodo = {
        title: title.value,
        completed: false,
        user: users[userSelect.value],
        id: todos.length + 1,
        userId: users[userSelect.value].id,
      };

      this.setState({
        title: '',
        user: '',
      });

      addTodo(newTodo);
    }
  };

  render() {
    const { users } = this.props;
    const {
      title,
      user,
      error,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="ui form">
          <div className="field">
            <input
              maxLength={25}
              type="text"
              name="title"
              onChange={this.handleInputChange}
              placeholder="Add title"
              value={title}
            />
          </div>
          <div className="field">
            <select
              name="userSelect"
              id="userSelect"
              value={user}
              onChange={this.handleSelectChange}
            >
              <option value="">Select a user</option>
              {users.map((userSelected, i) => (
                <option value={i}>{userSelected.name}</option>
              ))}
            </select>
            {error && (
              <div className="error">{error}</div>
            )}
          </div>
          <button type="submit" className="ui button">Add</button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
