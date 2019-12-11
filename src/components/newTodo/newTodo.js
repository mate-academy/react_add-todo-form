import React from 'react';
import PropTypes from 'prop-types';
import Options from '../options/options';
import users from '../../api/users';
import './newTodo.css';

class NewTodo extends React.Component {
  state = {
    newTodoName: '',
    selectedUserId: 0,
    hasTodoError: false,
    hasUserError: false,
  };

  handlerTitleChange = (event) => {
    this.setState({ newTodoName: event.target.value });
  };

  handlerUserChange = event => this.setState(
    { selectedUserId: +event.target.value }
  );

  handlerFormSubmit = (event) => {
    event.preventDefault();
    const { addUser } = this.props;
    const { newTodoName, selectedUserId } = this.state;

    if (!newTodoName || !selectedUserId) {
      this.setState({
        hasTodoError: !newTodoName,
        hasUserError: !selectedUserId,
      });

      return;
    }

    addUser(this.state.newTodoName, this.state.selectedUserId);
    this.setState(() => (
      {
        newTodoName: '',
        selectedUserId: 0,
      }));
  };

  render() {
    const {
      newTodoName,
      selectedUserId,
      hasTodoError,
      hasUserError,
    } = this.state;

    return (
      <div className="form-style">
        <form onSubmit={this.handlerFormSubmit}>
          <fieldset>
            <label htmlFor="filter">
              <legend>
                Todo Info
                {hasTodoError && <span>This field cannot be empty</span>}
              </legend>
              <input
                type="text"
                id="filter"
                onChange={this.handlerTitleChange}
                value={newTodoName}
                placeholder="Write here..."
              />
            </label>

          </fieldset>
          <fieldset>
            <legend>
              User Info
              {hasUserError && <span>Please, select a user</span>}
            </legend>
            <select
              value={selectedUserId}
              onChange={this.handlerUserChange}
            >
              <option value="0">Please, choose a user</option>
              <Options users={users} />
            </select>
          </fieldset>

          <button
            type="submit"
          >
            Add
          </button>
        </form>
      </div>

    );
  }
}

NewTodo.propTypes
= {
    addUser: PropTypes.func,
  };

NewTodo.defaultProps
  = {
    addUser: '',
  };

export default NewTodo;
