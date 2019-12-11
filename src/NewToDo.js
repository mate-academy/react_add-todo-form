import React from 'react';
import PropTypes from 'prop-types';
import users from './api/users';

class NewToDo extends React.Component {
  state = {
    saveValue: '',
    selectedUser: 0,
    taskError: false,
    userError: false,
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { saveValue, selectedUser } = this.state;

    if (!saveValue || !selectedUser) {
      this.setState({
        taskError: !saveValue,
        userError: !selectedUser,
      });

      return;
    }

    this.props.add(saveValue, selectedUser);

    this.setState({
      saveValue: '',
      selectedUser: 0,

    });
  }

  handleChangeValue = (event) => {
    this.setState({
      saveValue: event.target.value,
      taskError: false,
    });
  }

  handleChangeSelect = (event) => {
    this.setState({
      selectedUser: event.target.value,
      userError: false,
    });
  }

  render() {
    const { saveValue, selectedUser, taskError, userError } = this.state;

    return (
      <form onSubmit={this.handleOnSubmit}>
        <p className="ToDo">Task:</p>
        <input
          className="input"
          type="text"
          value={saveValue}
          onChange={this.handleChangeValue}
        />
        {taskError && (<p className="error">Plese select your task</p>)}
        <p className="ToDo">Person:</p>
        <select
          className="select"
          value={selectedUser}
          onChange={this.handleChangeSelect}
        >
          <option value="0">Choose a person</option>
          {users.map(person => <option>{person.name}</option>)}
        </select>

        <button type="submit" className="button">ADD</button>
        {userError && (<p className="error">Plese select your name</p>)}
      </form>
    );
  }
}
NewToDo.propTypes = { add: PropTypes.func.isRequired };
export default NewToDo;
