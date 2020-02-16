import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    inputWasSubmitted: false,
    selectWasSubmitted: false,
  };

  handleInputChange = (evt) => {
    const { onInputChange } = this.props;

    onInputChange(evt);
    this.setState({ inputWasSubmitted: false });
  };

  handleSelectChange = (evt) => {
    const { onSelectChange } = this.props;

    onSelectChange(evt);
    this.setState({ selectWasSubmitted: false });
  };

  handleFormSubmit = (evt) => {
    const { onFormSubmit, inputValue, selectValue } = this.props;

    evt.preventDefault();

    this.setState({
      inputWasSubmitted: true,
      selectWasSubmitted: true,
    });

    if (!inputValue || selectValue === '0') {
      return;
    }

    onFormSubmit();

    // if success set initial state
    this.setState({
      inputWasSubmitted: false,
      selectWasSubmitted: false,
    });
  };

  render() {
    const { inputWasSubmitted, selectWasSubmitted } = this.state;
    const { inputValue, selectValue, users } = this.props;

    const inputErrorMessageClassName = (inputWasSubmitted && !inputValue)
      ? 'error-message'
      : 'error-message u-hidden';

    const selectErrorMessageClassName
      = (selectWasSubmitted && selectValue === '0')
        ? 'error-message'
        : 'error-message u-hidden';

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>
            Todo Title:
            {' '}
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
            />
          </label>
          <p className={inputErrorMessageClassName}>Please enter the title</p>
        </div>

        <div className="form-group">
          <label>
            User Name:
            {' '}
            <select
              value={selectValue}
              onChange={this.handleSelectChange}
            >
              <option value="0">Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          <p className={selectErrorMessageClassName}>Please choose a user</p>
        </div>

        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  inputValue: PropTypes.string,
  selectValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  onFormSubmit: PropTypes.func.isRequired,
};

NewTodo.defaultProps = {
  inputValue: '',
  selectValue: '0',
  users: [],
};
