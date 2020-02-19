import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    valueNewTodo: '',
    error: false,
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
      });

      return false;
    }

    UserTodos.push({
      title: valueNewTodo,
      userId: selectedUser + 1,
      id: UserTodos[UserTodos.length - 1].id + 1,
    });
    renderAddedTodo(UserTodos);

    return true;
  };

  render() {
    return (
      <>
        <input type="text" onChange={this.AddValueNewTodo} />
        <button type="button" onClick={this.addNewTodo}>Add</button>
        {this.state.error ? <p>Error</p> : ''}
      </>
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
