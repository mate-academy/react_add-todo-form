import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(+this.state.userId, this.state.title);
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleUserChange = (event) => {
    this.setState({
      userId: event.target.value,
    });
  };

  onclickClear = () => {
    this.setState({
      title: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select onChange={this.handleUserChange} name="" id="">
          {this.props.users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <span>UserId {this.state.userId}</span>
        <input type="text"
          onChange={this.handleTitleChange}
          placeholder="todo..."
        />

        <button
          type="submit"
        >
          Add TODO
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTodo;
