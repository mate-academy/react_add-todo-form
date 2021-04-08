import React from 'react';
import PropTypes from 'prop-types';

import './todoForm.css';

export class TodoForm extends React.Component {
  state = {
    isValidField: false,
    isValidSelect: false,
    value: '',
    selectValue: '',
  }

  handleSelectChange = (event) => {
    this.setState({
      selectValue: event.target.value,
      isValidSelect: false,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      value: event.target.value,
      isValidField: false,
    });
  }

  createNewPost = (event) => {
    event.preventDefault();

    const { value, selectValue } = this.state;

    if (!value || !selectValue) {
      this.setState(state => ({
        isValidField: !state.value,
        isValidSelect: !state.selectValue,
      }));
    } else {
      this.props.addTodo(value, selectValue);
      this.setState({
        value: '',
        selectValue: '',
      });
    }
  }

  render() {
    const {
      isValidField,
      isValidSelect,
      value,
      selectValue,
    } = this.state;

    const { usersList } = this.props;

    return (
      <form
        className="add"
        onSubmit={this.createNewPost}
      >
        <div className="select is-primary">
          <select
            id="select"
            value={selectValue}
            onChange={this.handleSelectChange}
          >
            <option value="">
              Select user
            </option>
            {
              usersList.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {
            isValidSelect && (
              <label
                className="tag is-warning"
                htmlFor="select"
              >
                Please, choose user
              </label>
            )
          }
        </div>
        <div>
          <input
            id="description"
            className="input is-primary"
            value={value}
            onChange={this.handleInputChange}
          />
          {
            isValidField && (
              <label
                htmlFor="description"
                className="tag is-warning"
              >
                Please, add text
              </label>
            )
          }
        </div>
        <button
          type="submit"
          className="button is-primary"
        >
          Add todo
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
