import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectUser: 0,
    userError: false,
    titleError: false,
  }

  addUserId = (id) => {
    this.setState({
      selectUser: id,
      userError: false,
    });
  }

  addInputValue = (event) => {
    this.setState({
      inputValue: event.target.value.replace(/[^\w\s]/g, ''),
      titleError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.selectUser || !this.state.inputValue) {
      this.setState(prevState => ({
        userError: !prevState.selectUser,
        titleError: !prevState.inputValue,
      }));

      return;
    }

    this.props.addTodo(this.state.selectUser, this.state.inputValue);

    this.setState({
      inputValue: '',
      selectUser: 0,
    });
  }

  render() {
    const { users } = this.props;
    const { inputValue, selectUser, userError, titleError } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>

        <span className="select-title">
          User
        </span>
        <select
          value={selectUser}
          onChange={(event) => {
            this.addUserId(+event.target.value);
          }}
        >
          <option value="0">Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        <span className="error">
          {userError ? 'Please choose a user' : ''}
        </span>
        <label className="form" htmlFor="title">
          <span className="input-title">Todo title</span>
          <input
            id="title"
            maxLength={20}
            className="input"
            type="text"
            onChange={this.addInputValue}
            value={inputValue}
          />
          <span className="error">
            {titleError ? 'Please enter the title' : ''}
          </span>
        </label>

        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
