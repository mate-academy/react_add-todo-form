import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectedValue: 0,
    titleError: false,
    userError: false,
  }

  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      titleError: false,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedValue: +event.target.value,
      userError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { inputValue, selectedValue } = this.state;

    if (!inputValue || !selectedValue) {
      this.setState({
        titleError: !inputValue,
        userError: !selectedValue,
      });

      return;
    }

    this.props.addTodo(inputValue, selectedValue);

    this.setState({
      inputValue: '',
      selectedValue: 0,
    });
  }

  render() {
    const { users } = this.props;
    const { inputValue, selectedValue } = this.state;

    return (
      <form
        className="newtodo"
        onSubmit={this.handleFormSubmit}
      >
        <section>
          Title: &nbsp;
          <input
            type="text"
            value={inputValue}
            onChange={this.handleInputChange}
          />
          {
            this.state.titleError
            && (<span className="error">Please enter the title!</span>)
          }
        </section>

        <section>
          User: &nbsp;
          <select
            value={selectedValue}
            onChange={this.handleSelectChange}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
            }
          </select>
          {
            this.state.userError
            && (<span className="error">Please choose a user!</span>)
          }
        </section>

        <button type="submit">
          Add todo to list
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
