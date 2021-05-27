import React from 'react';
import users from '../../api/users';
import './AddTodoForm.scss';

class AddTodoForm extends React.Component {
  state = {
    newTodoName: '',
    hasTodoError: false,
    newTodoUserId: '',
    hasUserError: false,
  };

  handleTodoChange = (event) => {
    this.setState({
      newTodoName: event.target.value,
      hasTodoError: false,
    });
  };

  handleUserChange = (event) => {
    this.setState({
      newTodoUserId: +event.target.value,
      hasUserError: false,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      hasTodoError: !state.newTodoName,
      hasUserError: !state.newTodoUserId,
    }));

    const { newTodoName, newTodoUserId } = this.state;

    if (!newTodoUserId) {
      return;
    }

    if (!newTodoName) {
      return;
    }
    // eslint-disable-next-line
    this.props.onAdd(newTodoName, newTodoUserId);

    this.setState({
      newTodoName: '',
      newTodoUserId: '',
    });
  };

  render() {
    const {
      newTodoName,
      newTodoUserId,
      hasTodoError,
      hasUserError,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <div>
          <input
            placeholder="Enter Todo name here"
            className="form__field"
            type="text"
            value={newTodoName}
            onChange={this.handleTodoChange}
          />
          <br />
          {hasTodoError && (
            <span className="form__error">Please enter a Todo name</span>
          )}
        </div>

        <div>
          <select
            className="form__field"
            value={newTodoUserId}
            onChange={this.handleUserChange}
          >
            <option>Please choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <br />
          {hasUserError && (
            <span className="form__error">Please select a User</span>
          )}
        </div>

        <button className="form__button" type="submit">Add Todo</button>
      </form>
    );
  }
}

export default AddTodoForm;
