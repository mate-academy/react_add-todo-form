import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OptionsList from '../OptionsList/OptionsList';

class AddTodo extends Component {
  state = {
    changedUser: '0',
    cardTitle: '',
    errTitle: '',
    errChangeUser: '',
  };

  handleNameChange = (event) => {
    const { value } = event.target;

    this.setState({
      cardTitle: value,
      errTitle: '',
    });
  };

  changeActiveUser = (event) => {
    const { value } = event.target;

    this.setState({
      changedUser: value,
      errChangeUser: '',
    });
  }

  handleButtonSubmit = (event) => {
    event.preventDefault();
    const { cardTitle, changedUser } = this.state;
    const { addTodos, todosListLength } = this.props;

    if (cardTitle && changedUser !== '0') {
      addTodos({
        userId: Number(changedUser),
        id: Number(todosListLength + 1),
        title: cardTitle,
        completed: false,
      });
      this.setState({
        cardTitle: '',
        changedUser: '0',
      });
    } else {
      this.setState(prevState => ({
        errTitle: !cardTitle ? 'error: type title' : prevState.errTitle,
        errChangeUser: (changedUser === '0')
          ? 'error: change name'
          : prevState.errTitle,
      }));
    }
  }

  render() {
    const { users } = this.props;
    const {
      changedUser,
      cardTitle,
      errTitle,
      errChangeUser,
    } = this.state;

    return (
      <div>
        <h2>Add todo form</h2>
        <form onSubmit={this.handleButtonSubmit}>
          <input
            value={cardTitle}
            onChange={this.handleNameChange}
          />
          {errTitle}
          <select
            value={changedUser}
            onChange={this.changeActiveUser}
          >
            <OptionsList users={users} />
          </select>
          {errChangeUser}
          <button type="submit">
            Add todo
          </button>
        </form>
      </div>
    );
  }
}

AddTodo.propTypes = {
  addTodos: PropTypes.func.isRequired,
  todosListLength: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default AddTodo;
