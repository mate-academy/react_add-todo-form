import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

import users from './api/users';

class NewTodos extends React.Component {
  state = {
    currentValue: '',
    currentUser: '',
    errorUser: false,
    errorValue: false,
  };

  handleSubmit = (event) => {
    const {
      currentUser, currentValue,
    } = this.state;

    event.preventDefault();
    if (currentUser && currentValue) {
      this.props.onFormSubmit(currentValue, currentUser);
      this.setState({
        currentUser: '',
        currentValue: '',
        errorUser: false,
        errorValue: false,
      });
    } else {
      this.checkErrors(currentUser, currentValue);
    }
  };

  checkErrors = (currentUser, currentValue) => {
    this.setState({
      errorUser: !currentUser,
      errorValue: !currentValue,
    });
  }

  handleChange = (event) => {
    this.setState({
      currentValue: event.target.value,
      errorValue: false,
    });
  };

  selectChange = (event) => {
    this.setState({
      currentUser: event.target.value,
      errorUser: false,
    });
  };

  render() {
    const {
      currentUser, currentValue, errorUser, errorValue,
    } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <p>JUST DO IT!</p>
          <div className={errorValue && 'no-title__error'}>
            <input
              name="title"
              placeholder="Title"
              type="text"
              onChange={this.handleChange}
              value={currentValue}
            />

          </div>
          <div className={errorUser && 'no-selected-user__error'}>
            <select
              name="users"
              onChange={this.selectChange}
              value={currentUser}
            >
              <option
                value=""
              >
              ---Choose user---
              </option>
              {users.map(person => (
                <option
                  key={person.id}
                  value={person.name}
                >
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Save</button>
        </form>

        <TodoList currentUser={currentUser} currentValue={currentValue} />
      </>
    );
  }
}

NewTodos.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default NewTodos;
