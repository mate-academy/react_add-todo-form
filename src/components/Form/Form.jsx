import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    newTodo: '',
    userName: '',
    errorInput: false,
    errorSelect: false,
  }

  clearState = () => (
    this.setState({
      newTodo: '',
      userName: '',
      errorInput: false,
      errorSelect: false,
    })
  )

  handleChangeInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorInput: false,
    });
  }

  handleChangeSelect = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorSelect: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newTodo, userName } = this.state;

    this.setState(state => ({
      errorSelect: !state.userName,
      errorInput: !state.newTodo,
    }));

    if (!this.state.newTodo || !this.state.userName) {
      return;
    }

    this.props.onAdd(newTodo, userName);
    this.clearState();
  }

  render() {
    const { users } = this.props;
    const { newTodo, userName, errorSelect, errorInput } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} className="form">
        <input
          className="form__input"
          type="text"
          placeholder="Write todo"
          name="newTodo"
          value={newTodo}
          onChange={this.handleChangeInput}
        />
        {errorInput
          && (
          <span className="form__error">
            * Please, enter your todo
          </span>
          )
        }
        <select
          className="form__select"
          name="userName"
          value={userName}
          onChange={this.handleChangeSelect}
        >
          <option disabled value="">Select user</option>
          {users.map(({ name, id }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errorSelect
          && (
          <span className="form__error">
            * Please choose name
          </span>
          )
        }
        <button
          className="form__button"
          type="submit"
        >
          add
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};
