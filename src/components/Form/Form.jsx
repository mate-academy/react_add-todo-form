import React from 'react';
import PropTypes from 'prop-types';

import './form.scss';

export class Form extends React.Component {
  state = {
    isValidInput: false,
    isValidSelect: false,
    titleValue: '',
    selectValue: '',
  }

  handleInputChange = ({ target }) => {
    this.setState({
      titleValue: target.value,
      isValidInput: false,
    });
  }

  handleSelectChange = ({ target }) => {
    this.setState({
      selectValue: target.value,
      isValidSelect: false,
    });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();

    const { titleValue, selectValue } = this.state;

    if (!titleValue || !selectValue) {
      this.setState({
        isValidInput: !titleValue,
        isValidSelect: !selectValue,
      });

      return;
    }

    this.props.addTodo(titleValue, selectValue);
    this.setState({
      titleValue: '',
      selectValue: '',
    });
  }

  render() {
    const {
      isValidInput,
      isValidSelect,
      titleValue,
      selectValue,
    } = this.state;

    const { usersList } = this.props;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmitForm}
      >
        <select
          value={selectValue}
          onChange={this.handleSelectChange}
          id="select"
          className="form__select"
        >
          <option value="" disabled>
            Choose a user
          </option>
          {usersList.map(user => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>
        {isValidSelect && (
          <label
            className="form__warning-select"
            htmlFor="select"
          >
            Please choose a user
          </label>
        )}
        <div className="form__input-block">
          <input
            type="text"
            placeholder="Enter the title"
            className="form__input"
            id="title"
            value={titleValue}
            onChange={this.handleInputChange}
          />
          {isValidInput && (
            <label
              htmlFor="title"
              className="form__warning-input"
            >
              Please enter the title
            </label>
          )}
        </div>

        <button
          type="submit"
          className="form__submit"
        >
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
