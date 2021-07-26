import React from 'react';
import PropTypes from 'prop-types';

export class NewToDoForm extends React.Component {
  state = {
    todoTitle: '',
    selectedUserId: '',
    selectError: false,
    inputError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const errorType = (name === 'todoTitle') ? 'inputError' : 'selectError';

    this.setState({
      [name]: value,
      [errorType]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { todoTitle, selectedUserId } = this.state;
    const { onAdd, users } = this.props;

    if (!todoTitle.trim()) {
      this.setState({
        inputError: true,
      });

      return;
    }

    if (!selectedUserId) {
      this.setState({
        selectError: true,
      });

      return;
    }

    const currentUser = users.find(user => user.id === Number(selectedUserId));

    onAdd(todoTitle, currentUser);

    this.setState({
      todoTitle: '',
      selectedUserId: '',
      selectError: false,
      inputError: false,
    });
  }

  render() {
    const { todoTitle, inputError, selectError, selectedUserId } = this.state;
    const { users } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="ui input input">
          <input
            type="text"
            placeholder="write todo title here"
            name="todoTitle"
            value={todoTitle}
            onChange={this.handleChange}
            maxLength="50"
          />
          {inputError
            && <b className="error">Please enter the title</b>}
        </div>

        <div>
          <select
            className="ui selection dropdown"
            value={selectedUserId}
            name="selectedUserId"
            onChange={this.handleChange}
          >
            <option value="" disabled selected>Choose a user</option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {selectError
            && <b className="error">Please choose a user</b>}
        </div>

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
