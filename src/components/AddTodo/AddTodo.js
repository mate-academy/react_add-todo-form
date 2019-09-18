/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import OptionsList from '../OptionsList/OptionsList';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changedUser: '0',
      cardTitle: '',
      errTitle: '',
      errChangeUser: '',
    };
  }

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
      const {
        cardTitle,
        changedUser,
      } = this.state;

      const {
        addTodos,
        todosList,
      } = this.props;

      if (cardTitle && changedUser !== '0') {
        addTodos({
          userId: Number(changedUser),
          id: Number(todosList.length + 1),
          title: cardTitle,
          completed: false,
        });

        this.setState({
          cardTitle: '',
          changedUser: '0',
        });
      } else {
        if (!cardTitle) {
          this.setState({ errTitle: 'error title' });
        }

        if (changedUser === '0') {
          this.setState({ errChangeUser: 'error change user' });
        }
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

export default AddTodo;
