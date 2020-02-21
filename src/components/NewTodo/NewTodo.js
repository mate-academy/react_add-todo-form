import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    placeholderValue: '',
    isSelected: false,
    selectClass: 'select',
  };

  handleSelect = ({ target }) => {
    this.setState({
      isSelected: false,
      selectClass: 'select',
      userId: target.value,
    });
  };

  handleInput = ({ target }) => {
    this.setState({
      placeholderValue: '',
      title: target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.clearInput();
    this.clearSelect();

    if (this.state.title === '') {
      this.setState({
        placeholderValue: 'Please enter the title',
      });
    }

    if (this.state.userId === 0) {
      this.setState({
        selectClass: 'select--error',
        isSelected: true,
      });
    }

    if (!(this.state.userId === 0 || this.state.title === '')) {
      const { addTodo } = this.props;

      addTodo(this.addNewId());
    }
  };

  clearInput = () => {
    this.setState({
      title: '',
    });
  };

  clearSelect = () => {
    this.setState({
      userId: 0,
    });
  };

  addNewId = () => {
    const { userId, title } = this.state;

    return {
      id: uuid(), userId, title,
    };
  };

  render() {
    const { users } = this.props;
    const { title,
      userId,
      placeholderValue,
      isSelected,
      selectClass } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            className="input-todo"
            placeholder={placeholderValue}
            value={title}
            onChange={this.handleInput}
            type="text"
            maxLength={20}
          />
          <select
            className={selectClass}
            onChange={this.handleSelect}
            name="todos"
            id="todos-select"
            value={userId}
          >
            <option value={0}>Choose a user</option>
            {users.map(user => (
              <option key={user.name} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
        <div className="error-container">
          {
            isSelected
              ? (<p className="error-text">Please choose a user</p>)
              : (<p className="error-text"> </p>)
          }
        </div>
      </>
    );
  }
}

export default NewTodo;

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
