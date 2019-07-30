import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: '',
      userSelect: '',
    };
  }

  handleUserSelect = (event) => {
    const { users } = this.props;
    const { value } = event.target;
    const user = users.find(userId => userId.id === +value);

    this.setState({
      userSelect: user,
    });
  };

  handleTitleChange = (event) => {
    const { value } = event.target;

    this.setState({
      textField: value,
    });
  };

  render() {
    const { textField, userSelect } = this.state;
    const { users, addTodo } = this.props;

    return (
      <form onSubmit={this.hadleSubmit}>
        <select
          onChange={this.handleUserSelect}
          name="changeUser"
        >
          <option value="user">
            choose a user
          </option>
          { users.map(
            user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            )
          )
          }
        </select>
        <input
          type="text"
          onChange={this.handleTitleChange}
          value={textField}
          name="textField"
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => addTodo(textField, userSelect)}
        >
          Add title
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
