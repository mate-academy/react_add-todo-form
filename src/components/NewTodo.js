import React from 'react';
import propTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    inputTitle: '',
    selectedPerson: '',
    currentId: 3,
  }

  changeInput = (event) => {
    this.setState({ inputTitle: event.target.value });
  }

  addTask = () => {
    const { inputTitle, selectedPerson, currentId } = this.state;

    if (inputTitle.trim() && selectedPerson) {
      this.props.addNewTask(inputTitle, selectedPerson, currentId);
      this.setState(prev => ({
        inputTitle: '',
        selectedPerson: '',
        currentId: prev.currentId + 1,
      }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.addTask();
  };

  handleSelectChange = (event) => {
    this.setState({ selectedPerson: event.target.value });
  }

  render() {
    const { users } = this.props;
    const { inputTitle, selectedPerson } = this.state;

    return (
      <fieldset>
        <legend>Add new Todo</legend>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter a new todo"
            value={inputTitle}
            onChange={this.changeInput}
          />
          <select onChange={this.handleSelectChange} value={selectedPerson}>
            <option hidden>Choose a victim</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          <button type="submit">Execute</button>
        </form>
      </fieldset>
    );
  }
}

NewTodo.propTypes = {
  addNewTask: propTypes.func.isRequired,
  users: propTypes.arrayOf(propTypes.objectOf(propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
  }))).isRequired,
};

export default NewTodo;
