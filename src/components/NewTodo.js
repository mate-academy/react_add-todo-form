import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textField: '',
      userSelect: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChangeSelect = (event) => {
    const { value } = event.target;
    const user = this.props.users.find(userId => userId.id === +value);

    this.setState({
      userSelect: user,
    });
  };

  handleChange(event) {
    this.setState({
      textField: event.target.value,
    });
  }

  render() {
    const { textField, userSelect } = this.state;
    const { users, addTodo } = this.props;

    return (
      <form onSubmit={this.hadleSubmit}>
        <select
          onChange={this.handleChangeSelect}
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
          onChange={this.handleChange}
          value={textField}
          name="textField"
        />
        <button
          className="btn btn primary"
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
