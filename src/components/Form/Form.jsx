import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    selectValue: 'Choose a user',
    inputValue: '',
    errorSelect: false,
    errorInput: false,
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      errorInput: false,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      selectValue: event.target.value,
      errorSelect: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue, selectValue } = this.state;
    const { users, listOfTodos, addTodo } = this.props;

    const findUser = users.find(user => user.name === selectValue);

    if (!inputValue.length) {
      this.setState({
        errorInput: true,
      });
    }

    if (!findUser) {
      this.setState({
        errorSelect: true,
      });
    }

    if (inputValue.length && findUser) {
      const newToto = {
        userId: findUser.id,
        id: listOfTodos[listOfTodos.length - 1].id + 1,
        title: inputValue,
        completed: false,
        user: findUser,
      };

      addTodo(newToto);

      this.setState({
        inputValue: '',
        selectValue: 'Choose a user',
        errorSelect: false,
        errorInput: false,
      });
    }
  }

  render() {
    const { inputValue, selectValue } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="string"
            value={inputValue}
            name="inputValue"
            onChange={this.handleInputChange}
            placeholder="Description"
          />
          {this.state.errorInput && <span>Please enter the title</span>}
          <select
            value={selectValue}
            name="selectValue"
            onChange={this.handleUserChange}
          >
            <option key="Choose a user" disabled>Choose a user</option>
            {this.props.users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {this.state.errorSelect && <span>Please choose a user</span>}
          <button type="submit">Add</button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  addTodo: PropTypes.func.isRequired,
  listOfTodos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
