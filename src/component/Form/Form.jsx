import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    enteredTitle: '',
    chosenUser: '',
    titleError: false,
    userError: false,
  }

  handleChangeForTitle = ({ target }) => {
    const { name, value } = target;

    this.setState({
      titleError: (value === ''),
      [name]: value,
    });
  }

  handleChangeForUser = ({ target }) => {
    const { name, value } = target;

    this.setState({
      userError: (value === ''),
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { enteredTitle, chosenUser } = this.state;
    const { addNewTodo } = this.props;

    if (!enteredTitle) {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (!chosenUser) {
      this.setState({
        userError: true,
      });

      return;
    }

    addNewTodo(chosenUser, enteredTitle);

    this.setState({
      enteredTitle: '',
      chosenUser: '',
    });
  }

  render() {
    const { enteredTitle, chosenUser, titleError, userError } = this.state;
    const { users } = this.props;

    return (
      <form className="ui form" name="addNewUser" onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="enteredTitle"
          value={enteredTitle}
          onChange={this.handleChangeForTitle}
        />

        {
          titleError
          && <div className="form__error">Please enter the title</div>
        }

        <label htmlFor="chooseUser">Choose a user</label>

        <select
          id="chooseUser"
          name="chosenUser"
          className="ui search dropdown"
          value={chosenUser}
          onChange={this.handleChangeForUser}
        >
          <option value=""> Select user</option>

          {
            users.map(name => (
              <option value={name} key={name}>{name}</option>
            ))
          }

        </select>

        {
          userError && <div className="form__error">Please choose a user</div>
        }
        <button className="ui primary button" type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};
