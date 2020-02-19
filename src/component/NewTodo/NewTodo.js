import React from 'react';
import PropTypes from 'prop-types';
import './newTodo.css';

export class NewTodo extends React.Component {
  state = {
    valueNewTodo: '',
    error: false,
    errorMessage: 'error',
  };

  AddValueNewTodo = (e) => {
    this.setState({
      valueNewTodo: e.target.value,
    });

    if (e.target.value.length > 0) {
      this.setState({
        error: false,
      });
    }
  };

  addNewTodo = () => {
    const { valueNewTodo } = this.state;
    const { UserTodos, selectedUser, renderAddedTodo } = this.props;

    if (this.state.valueNewTodo.length < 1) {
      this.setState({
        error: true,
        errorMessage: 'Error: Empty input, please write something',
      });

      return false;
    }

    if (selectedUser === -1) {
      this.setState({
        error: true,
        errorMessage: 'Error: Please, selecat user',
      });

      return false;
    }

    UserTodos.push({
      title: valueNewTodo,
      userId: selectedUser + 1,
      id: UserTodos[UserTodos.length - 1].id + 1,
    });
    renderAddedTodo(UserTodos);

    this.setState({
      valueNewTodo: '',
      error: false,
    });

    return true;
  };

  render() {
    return (
      <div className="add-newTodo-wrapper">
        <input
          className="newTodoInput"
          type="text"
          onChange={this.AddValueNewTodo}
          value={this.state.valueNewTodo}
        />
        <button
          className="addNewTodoButton"
          type="button"
          onClick={this.addNewTodo}
        >
          Add
        </button>
        {this.state.error ? <p>{this.state.errorMessage}</p> : ''}
      </div>
    );
  }
}

NewTodo.propTypes = {
  UserTodos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  selectedUser: PropTypes.number.isRequired,
  renderAddedTodo: PropTypes.func.isRequired,
};
