import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state={
    newUserId: '',
    newTitle: '',
    newCompleted: false,
    inputError: false,
    selectError: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.newUserId) {
      this.setState({
        selectError: true,
      });

      return;
    }

    if (this.state.newTitle.length > 30 || this.state.newTitle.length < 4) {
      this.setState({
        inputError: true,
      });

      return;
    }

    this.props.addTask({
      userId: this.state.newUserId,
      id: this.props.newTodoId,
      title: this.state.newTitle,
      completed: this.state.newCompleted,
      user: this.props.users
        .find(person => (person.id === this.state.newUserId)),
    });
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      newUserId: '',
      newTitle: '',
      newCompleted: false,
    });
  }

  chooseUser = (e) => {
    if (!e.target.value) {
      return;
    }

    const selectUser = this.props.users
      .find(user => user.id === +e.target.value);

    this.setState({
      newUserId: selectUser.id,
      selectError: false,
    });
  }

  writeDownTask = (e) => {
    this.setState({
      newTitle: e.target.value.replace(/[^a-zA-ZА-Яа-я0-9\s]/g, ''),
      inputError: false,
    });
  }

  chooseStatus = (e) => {
    this.setState({ newCompleted: e.target.value });
  }

  render() {
    const { users } = this.props;
    const defaultValue = `Choose a user`;

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newUser">{defaultValue}</label>
          <select
            value={this.state.newUserId}
            id="newUser"
            onChange={this.chooseUser}
          >
            <option value="">{defaultValue}</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <div className="error">
            {this.state.selectError
              ? `User hasn't choosen`
              : ``}
          </div>

          <label htmlFor="newTodo">New task</label>
          <input
            type="text"
            id="newTodo"
            value={this.state.newTitle}
            autoComplete="off"
            onChange={this.writeDownTask}
          />
          <div className="error">
            {this.state.inputError
              ? `Length of task from 4 to 30`
              : ``}
          </div>

          <label htmlFor="newStatus">Completed </label>
          <select
            value={this.state.newCompleted}
            id="newStatus"
            onChange={this.chooseStatus}
          >
            <option
              value={false}
            >
              Do
            </option>
            <option
              value
            >
              Done
            </option>
          </select>

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

NewTodo.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  newTodoId: PropTypes.number.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default NewTodo;
