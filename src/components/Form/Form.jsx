import React from 'react';
import PropTypes from 'prop-types';

import './form.css';

export class Form extends React.PureComponent {
  state ={
    valueSelector: 'Choose user',
    valueText: '',
    errorSelector: 'none',
    errorText: 'none',
  }

  handleChangeSelector = (e) => {
    const newValue = e.target.value;

    this.setState({
      valueSelector: newValue,
      errorSelector: 'none',
    });
  }

  handleChangeText = (e) => {
    const newValue = e.target.value;

    this.setState({
      valueText: newValue,
      errorText: 'none',
    });
  }

  add = (e) => {
    const { valueText, valueSelector } = this.state;
    const { users, addInList } = this.props;

    e.preventDefault();

    if (valueSelector === 'Choose user') {
      this.setState({
        errorSelector: 'flex',
      });
    }

    if (valueText === '') {
      this.setState({
        errorText: 'flex',
      });
    }

    if ((valueSelector !== 'Choose user') && (valueText !== '')) {
      const newTodo = {
        user: users.find(person => person.name === valueSelector),
        title: valueText,
        completed: false,
      };

      addInList(newTodo);

      this.setState({
        valueSelector: 'Choose user',
        valueText: '',
      });
    }
  }

  render() {
    const { valueSelector, valueText, errorText, errorSelector } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.add} className="form">
        <div className="inputLine">
          <select
            value={valueSelector}
            onChange={this.handleChangeSelector}
            className="input"
          >
            <option value="Choose user" disabled>Choose user</option>
            {users.map(user => (
              <option value={user.name} key={user.id}>{user.name}</option>
            ))}
          </select>
          <div
            className="error"
            style={{ display: errorSelector }}
          >
            Please choose a user
          </div>
        </div>
        <div className="inputLine">
          <input
            className="input"
            value={valueText}
            onChange={this.handleChangeText}
            type="text"
          />
          <div
            className="error"
            style={{ display: errorText }}
          >
            Please enter the title
          </div>
        </div>
        <button
          type="submit"
          className="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  addInList: PropTypes.func.isRequired,
};
