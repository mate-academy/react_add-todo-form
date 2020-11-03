import React from 'react';
import { FormShape } from '../../Shapes/FormShape';
import './Form.css';
import { Input } from '../Input';
import { Select } from '../Select';

export class Form extends React.PureComponent {
  state = {
    enteredTodo: '',
    selectedUser: 'Choose a user',
    errorOnSelect: false,
    errorOnInput: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { selectedUser, enteredTodo } = this.state;

    this.props.addTodo(selectedUser, enteredTodo);

    this.setState({
      errorOnInput: enteredTodo === '',
      errorOnSelect: selectedUser === 'Choose a user',
    });

    if (selectedUser !== 'Choose a user' && enteredTodo !== '') {
      this.setState({
        selectedUser: 'Choose a user',
        enteredTodo: '',
      });
    }
  }

  handleChangeOnInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      errorOnInput: value === '',
      [name]: value,
    });
  };

  handleChangeOnSelect = (event) => {
    const { name, value } = event.target;

    this.setState({
      errorOnSelect: value === 'Choose a user',
      [name]: value,
    });
  };

  render() {
    const {
      enteredTodo,
      selectedUser,
      errorOnInput,
      errorOnSelect,
    } = this.state;

    const { preparedUsers } = this.props;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <Input
          enteredTodo={enteredTodo}
          errorOnInput={errorOnInput}
          handleChangeOnInput={this.handleChangeOnInput}
        />
        <Select
          selectedUser={selectedUser}
          preparedUsers={preparedUsers}
          errorOnSelect={errorOnSelect}
          handleChangeOnSelect={this.handleChangeOnSelect}
        />
        <button
          className="form__button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = FormShape;
