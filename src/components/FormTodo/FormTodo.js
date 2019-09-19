import React from 'react';
import PropTypes from 'prop-types';
import './FormTodo.css';

class FormTodo extends React.Component {
  state = {
    todoTitle: '',
    selected: '',
    userError: '',
    selectError: '',
  };

  handleInput = (event) => {
    this.setState({
      todoTitle: event.target.value,
      userError: '',
    });
  };

  handleSelect = (event) => {
    this.setState({
      selected: event.target.value,
      selectError: '',
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { users, todos, addTodo } = this.props;
    const { selected, todoTitle } = this.state;

    if (todoTitle.length === 0) {
      this.setState({
        userError: 'Invalid',
      });
    } else if (!selected) {
      this.setState({
        selectError: 'Choose a user',
      });
    } else {
      const todoToAdd = {
        title: todoTitle,
        completed: false,
        id: todos.length + 1,
        userId: users.find(user => user.name === selected).id,
      };

      this.setState({
        todoTitle: '',
        selected: '',
      });
      addTodo(todoToAdd);
    }
  };

  render() {
    const { users } = this.props;

    return (
      <>
        <div className="formtodo">
          <div className="ui focus input">
            <input
              name="title"
              value={this.state.todoTitle}
              type="text"
              placeholder="Write thing you need to do"
              onChange={this.handleInput}
            />
            {this.state.userError === 'Invalid' && (
              <div style={{ color: 'red', fontSize: 13, paddingLeft: 5 }}>
                {this.state.userError}
              </div>
            )}
          </div>
          <select
            value={this.state.selected}
            onChange={this.handleSelect}
            className="select-user"
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>
            {users.map(user => (
              <option value={user.name}>{user.name}</option>
            ))}
          </select>
          {this.state.selectError && (
            <div style={{ color: 'red', fontSize: 13, paddingLeft: 5 }}>
              {this.state.selectError}
            </div>
          )}
          <button
            type="button"
            className="ui primary button add-button"
            onClick={this.handleClick}
          >
            Add
          </button>
        </div>
      </>
    );
  }
}

FormTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FormTodo;
