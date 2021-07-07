import React from 'react';
import propTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    inputTitle: '',
    selectedPerson: 0,
    currentId: 3,
    inputError: false,
    unselectedPersonError: false,
  }

  changeInput = (event) => {
    this.setState({
      inputTitle: event.target.value,
      inputError: false,
    });
  }

  addTask = () => {
    const { inputTitle, selectedPerson, currentId } = this.state;

    if (inputTitle.trim().length === 0) {
      this.setState({ inputError: true });

      return;
    }

    if (selectedPerson === 0) {
      this.setState({ unselectedPersonError: true });

      return;
    }

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
    this.setState({
      selectedPerson: event.target.value,
      unselectedPersonError: false,
    });
  }

  render() {
    const { users } = this.props;
    const { inputTitle,
      selectedPerson,
      inputError,
      unselectedPersonError } = this.state;

    return (
      <fieldset className="fieldset">
        <legend>Add new Todo</legend>
        <form onSubmit={this.handleSubmit}>
          <div className="inputWrapper">
            <input
              type="text"
              maxLength={10}
              minLength={3}
              placeholder="Enter a new todo"
              value={inputTitle}
              onChange={this.changeInput}
              className="fieldset__input"
            />
            {inputError
              && <span className="error">Please input a valid todo</span>}
          </div>
          <div className="inputWrapper">
            <select
              onChange={this.handleSelectChange}
              value={selectedPerson}
              className="fieldset__select"
            >
              <option hidden>Choose a victim</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
            {unselectedPersonError
              && <span className="error">Please choose a victim</span>}
          </div>

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
