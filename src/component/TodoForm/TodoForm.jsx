import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends PureComponent {
  state = {
    isValidField: false,
    isValidSelect: false,
    value: '',
    selected: '',
  }

  handleSumbitForm = (event) => {
    event.preventDefault();

    const { value, selected } = this.state;

    if (!value || !selected) {
      this.setState(state => ({
        isValidField: !state.value,
        isValidSelect: !state.selected,
      }));

      return;
    }

    this.props.addTodo(value, selected);
    this.setState({
      value: '',
      selected: '',
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      selected: event.target.value,
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
      selected,
    } = this.state;

    const { userList } = this.props;

    return (
      <form
        className="form"
        onSubmit={this.handleSumbitForm}
      >
        <div>
          <select
            value={selected}
            onChange={this.handleSelectChange}
          >
            <option value="">
              Select user
            </option>
            {
              userList.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
          {isValidSelect && (
            <span>
              Please, chose user
            </span>
          )
          }
        </div>
        <div>
          <input
            className="input"
            value={value}
            onChange={this.handleInputChange}
          />
          {isValidField && (
            <span>
              Please, add todo
            </span>
          )
          }
        </div>

        <button
          type="submit"
          className="button"
        >
          Add todo
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
