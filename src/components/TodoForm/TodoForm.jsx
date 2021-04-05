import React from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const {
      isValidField,
      isValidSelect,
      value,
      selectValue,
    } = this.state;

    const {
      usersList,
      addTodo,
    } = this.props;

    return (
      <div>
        <select
          value={selectValue}
          onChange={this.handleSelectChange}
        >
          <option value="">
            Select user
          </option>
          {
            usersList.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))
          }
        </select>
        {
          isValidSelect && <span>Choose user</span>
        }
        <input
          type="text"
          value={value}
          onChange={this.handleInputChange}
        />
        { isValidField && <span>add todo</span> }
        <button
          type="button"
          onClick={() => {
            if (!value || !selectValue) {
              this.setState(state => ({
                isValidField: !state.value,
                isValidSelect: !state.selectValue,
              }));
            } else {
              addTodo(value, selectValue);
              this.setState({
                value: '',
                selectValue: '',
              });
            }
          }}
        >
          Add todo
        </button>
      </div>
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
