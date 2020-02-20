import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import users from '../../api/users';
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
    const tempState = {
      userId, title,
    };

    return {
      id: uuid(),
      ...tempState,
    };
  };

  render() {
    const { addTodo } = this.props;
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
          <button
            onClick={() => addTodo(this.addNewId())}
            type="submit"
          >
            Add
          </button>
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
};
