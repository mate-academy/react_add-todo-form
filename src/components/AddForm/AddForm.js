import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';
import './AddForm.css';

export class AddForm extends React.Component {
  state = {
    newTodoTitle: '',
    newTodoUserId: 0,
    hasTitleError: false,
    notCheckedUser: false,
  }

  handleSubmit = (event) => {
    const {
      newTodoTitle,
      newTodoUserId,
    } = this.state;

    event.preventDefault();

    this.setState({
      hasTitleError: !newTodoTitle,
      notCheckedUser: !newTodoUserId,
    });

    if (!newTodoTitle) {
      return;
    }

    if (!newTodoUserId) {
      return;
    }

    this.props.onAdd(newTodoTitle, newTodoUserId);

    this.setState({
      newTodoTitle: '',
      newTodoUserId: 0,
    });
  }

  render() {
    const {
      newTodoTitle,
      newTodoUserId,
      hasTitleError,
      notCheckedUser,
    } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="field"
          type="text"
          placeholder="Enter the title of TODO"
          value={newTodoTitle}
          onChange={(event) => {
            this.setState({
              newTodoTitle: event.target.value,
              hasTitleError: false,
            });
          }}
        />
        {hasTitleError
          && (<div className="error">Please enter the title</div>)
        }
        <br />
        <select
          className="field"
          value={newTodoUserId}
          onChange={(event) => {
            this.setState({
              newTodoUserId: +event.target.value,
              notCheckedUser: false,
            });
          }}
        >
          <option>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {notCheckedUser
          && (<div className="error">Please choose a user</div>)
        }
        <br />
        <button className="field" type="submit">Add</button>
      </form>
    );
  }
}

AddForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
