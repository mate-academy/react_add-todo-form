import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

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
        <Input
          value={enteredTitle}
          error={titleError}
          handleChange={this.handleChangeForTitle}
        />
        <Select
          value={chosenUser}
          handleChange={this.handleChangeForUser}
          users={users}
          error={userError}
        />
        <button className="ui primary button" type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};
