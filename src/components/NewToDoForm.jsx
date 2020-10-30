import React from 'react';
import PropTypes from 'prop-types';

export class NewToDoForm extends React.Component {
  state = {
    toDoTitle: '',
    selectedUserId: '',
    selectError: false,
    inputError: false,
  }

  addTitle = (event) => {
    this.setState({
      toDoTitle: event.target.value,
      inputError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { toDoTitle, selectedUserId } = this.state;

    if (!toDoTitle && !selectedUserId) {
      this.setState({
        inputError: true,
        selectError: true,
      });

      return;
    }

    if (!toDoTitle && selectedUserId) {
      this.setState({
        inputError: true,
      });

      return;
    }

    if (toDoTitle && !selectedUserId) {
      this.setState({
        selectError: true,
      });

      return;
    }

    const { onAdd, users } = this.props;
    const newUser = users.find(user => user.id === Number(selectedUserId));

    onAdd(toDoTitle, newUser);
    this.setState({
      toDoTitle: '',
      selectedUserId: '',
      selectError: false,
      inputError: false,
    });
  }

  handleChange = (event) => {
    this.setState({
      selectedUserId: event.target.value,
      selectError: false,
    });
  }

  render() {
    const { toDoTitle, inputError, selectError, selectedUserId } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="ui input"
      >
        <input
          type="text"
          placeholder="write todo title here"
          value={toDoTitle}
          onChange={this.addTitle}
          maxLength="50"
        />
        {inputError
          && <b className="error">Please enter the title</b>}

        <select
          className="ui selection dropdown"
          value={selectedUserId}
          onChange={this.handleChange}
        >
          <option defaultValue>Choose a user</option>
          {this.props.users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {selectError
          && <b className="error">Please choose a user</b>}

        <button
          className="ui button"
          type="submit"
        >
          Add ToDo
        </button>
      </form>
    );
  }
}

NewToDoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
