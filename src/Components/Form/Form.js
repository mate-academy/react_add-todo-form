import React from 'react';
import { FormShape } from '../../Shapes/FormShape';
import './Form.css';

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
      errorOnSelect: selectedUser === 'Choose a user',
      errorOnInput: enteredTodo === '',
      enteredTodo: '',
      selectedUser: 'Choose a user',
    });
  }

  handleChangeOnInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      errorOnInput: !(value !== ''),
      [name]: value,
    });
  };

  handleChangeOnSelect = (event) => {
    const { name, value } = event.target;

    this.setState({
      errorOnSelect: !(value !== ''),
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
        <label
          className="form__label"
          htmlFor="todo"
        >
          Task to do:
        </label>
        <input
          className="form__input"
          id="todo"
          type="text"
          name="enteredTodo"
          value={enteredTodo}
          onChange={this.handleChangeOnInput}
        />
        {errorOnInput
          && <div className="form__error">Please enter the title</div>}
        <select
          className="form__select"
          name="selectedUser"
          value={selectedUser}
          onChange={this.handleChangeOnSelect}
        >
          <option value="Choose a user">Choose a user</option>
          {preparedUsers.map(user => (
            <option
              value={user}
              key={user}
            >
              {user}
            </option>
          ))}
        </select>
        {errorOnSelect
          && <div className="form__error">Please choose a user</div>}
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
