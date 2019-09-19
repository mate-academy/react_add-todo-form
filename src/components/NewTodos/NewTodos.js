import React from 'react';
import './NewTodos.css';

import { NewTodosProps } from '../PropTypes/PropTypes';

class NewTodos extends React.Component {
  state = {
    inputTitle: '',
    selectedUser: '',
    errorTitle: '',
    errorUser: '',
  };

  handleChangeTitle = (event) => {
    this.setState({
      inputTitle: event.target.value,
      errorTitle: null,
    });
  };

  handleChangeUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
      errorUser: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { users, todos, addTodo } = this.props;
    const { selectedUser, inputTitle } = this.state;

    if (!selectedUser && !inputTitle) {
      this.setState({
        errorUser: 'Please, choose a user',
        errorTitle: 'Title field cannot be a empty',
      });
    } else if (!inputTitle) {
      this.setState({
        errorTitle: 'Title field cannot be a empty',
      });
    } else if (!selectedUser) {
      this.setState({
        errorUser: 'Please, choose a user',
      });
    } else {
      const newTodo = {
        title: inputTitle,
        id: todos.length + 1,
        userId: users.find(user => user.name === selectedUser).id,
        user: users.find(user => user.name === selectedUser),
      };

      this.setState({
        selectedUser: '',
        inputTitle: '',
      });
      addTodo(newTodo);
    }
  };

  render() {
    const {
      inputTitle, selectedUser, errorTitle, errorUser,
    } = this.state;

    const { users } = this.props;

    return (
      <div className="todos__form">
        <form
          className="ui form"
          onSubmit={this.handleSubmit}
        >
          <h2>Form for user add</h2>
          <div className="field">
            <input
              className="form__input"
              type="text"
              onChange={this.handleChangeTitle}
              value={inputTitle}
              placeholder="Enter the title for TODO"
            />
            {errorTitle && <small className="error">{errorTitle}</small>}
          </div>
          <div className="field">
            <select
              className="user-select ui fluid dropdown"
              onChange={this.handleChangeUser}
              value={selectedUser}
            >
              <option selected value="">Choose a user</option>
              {users.map(user => <option>{user.name}</option>)}
            </select>
            {errorUser && <span className="error">{errorUser}</span>}
          </div>
          <button
            type="submit"
            className="ui button"
          >
            Add Todos
          </button>
        </form>
      </div>
    );
  }
}

NewTodos.propTypes = NewTodosProps;

export default NewTodos;
