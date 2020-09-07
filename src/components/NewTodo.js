import React from 'react';
import PropTypes from 'prop-types';

const init = {
  title: '',
  selectedOption: 0,
  showErrors: false,
};

export class NewTodo extends React.PureComponent {
  state = init;

  handleSelect = (event) => {
    const userId = +event.target.value;

    this.setState({ selectedOption: userId });
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, selectedOption } = this.state;
    const { addTodo } = this.props;

    if (title === init.title || selectedOption === init.selectedOption) {
      this.setState({ showErrors: true });

      return;
    }

    addTodo(title, selectedOption);

    this.setState(init);
  }

  render() {
    const { users } = this.props;
    const { showErrors, title, selectedOption } = this.state;

    return (

      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label>
          <input
            className="input"
            type="text"
            value={title}
            onChange={this.handleTitleChange}
            placeholder=" please enter the title of todo"
          />
        </label>
        {showErrors && title === '' && (
          <span className="error">Please enter the title</span>
        )}

        <select
          value={selectedOption}
          onChange={this.handleSelect}
        >
          {users.length > 0 && (
            <option
              value="0"
              hidden
            >
              Choose a user
            </option>
          )}
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {showErrors && !(selectedOption > 0) && (
          <span className="error">Please choose a user</span>
        )}
        <button
          className="button"
          type="submit"
        >
          Add
        </button>

      </form>

    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
