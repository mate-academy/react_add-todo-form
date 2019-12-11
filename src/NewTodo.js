import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SelectOption from './SelectOptions';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectedUser: 0,
    titleError: false,
    userError: false,
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
      titleError: false,
    });
  };

  handleSelectedUser = (e) => {
    this.setState({
      selectedUser: +e.target.value,
      userError: false,
    });
  };

  validateForm = (e) => {
    e.preventDefault();

    const errors = {};
    const { inputValue, selectedUser } = this.state;

    errors.titleError = inputValue.trim().length === 0;
    errors.userError = selectedUser === 0;

    if (!errors.titleError && !errors.userError) {
      this.props.addTodo(inputValue, selectedUser);

      this.setState({
        inputValue: '',
        selectedUser: 0,
      });
    } else {
      this.setState(errors);
    }
  };

  render() {
    const { inputValue, selectedUser, titleError, userError } = this.state;
    const { users } = this.props;

    return (
      <form
        className={cn('App__form', 'form')}
        onSubmit={this.validateForm}
      >
        <section className={cn('form__section')}>
          <label
            className={cn('form__label')}
            htmlFor="newTodo"
          >
            Todo Title:
            <input
              className={
                cn('form__input', { 'form__input--error': titleError })
              }
              id="newTodo"
              onChange={this.handleInputChange}
              type="text"
              placeholder="write todo here..."
              value={inputValue}
            />
          </label>
          {
            titleError
            && (
              <span className={cn('form--error')}>
                Enter normal title dude!
              </span>
            )
          }
        </section>

        <section className={cn('form__section')}>
          <select
            className={
              cn('form__select', { 'form__select--error': userError })
            }
            value={selectedUser}
            onChange={this.handleSelectedUser}
          >
            <option value="0">{}</option>
            {users.map(user => (<SelectOption key={user.id} user={user} />))}
          </select>
          {userError
          && (
            <span className={cn('form--error')}>
              User is not selected
            </span>
          )}
        </section>

        <button
          className={cn('form__button')}
          type="submit"
        >
          Add new TODO
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
