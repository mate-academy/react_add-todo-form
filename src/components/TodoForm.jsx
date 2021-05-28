import React from 'react';
import PropTypes from 'prop-types';

class TodoForm extends React.Component {
  state = {
    newUserId: 0,
    newTitle: '',
    titleError: false,
    userError: false,
  }

  addTitle = (event) => {
    this.setState({
      newTitle: event.target.value,
      titleError: false,
    });
  };

  addUserId = (event) => {
    this.setState({
      newUserId: +event.target.value,
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const { newUserId, newTitle } = this.state;

    this.setState({
      titleError: !newTitle.replace(/\s/g, ''),
      userError: !newUserId,
    });

    if (!newUserId) {
      return;
    }

    if (!newTitle.replace(/\s/g, '')) {
      return;
    }

    this.props.addTodo(newTitle, newUserId);

    this.setState({
      newUserId: 0,
      newTitle: '',
    });
  }

  render() {
    const { newUserId, newTitle, titleError, userError } = this.state;

    return (
      <form onSubmit={this.formSubmit}>
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={this.addTitle}
          />

          {titleError && <span className="error">Please enter the title</span>}
        </div>

        <div>
          <select
            value={newUserId}
            onChange={this.addUserId}
          >
            <option value="0">Choose a user</option>
            {this.props.users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit">Add</button>
      </form>
    );
  }
}

const TypeUsers = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(TypeUsers).isRequired,
};

export default TodoForm;
