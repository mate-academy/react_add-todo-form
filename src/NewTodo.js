import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SelectOption from './SelectOptions';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectedUser: 0,
    errors: {
      titleError: false,
      userError: false,
    },
  };

  handleSelectedUser = e => (
    this.setState({
      selectedUser: +e.target.value,
      errors: {
        userError: false,
      },
    })
  );

  handleInputChange = e => (
    this.setState({
      inputValue: e.target.value,
      errors: {
        titleError: false,
      },
    })
  );

  checkErrorsThenAdd = () => this.setState((prevState) => {
    const errors = {};

    errors.titleError = prevState.inputValue.trim().length === 0;
    errors.userError = prevState.selectedUser === 0;

    if (!errors.titleError && !errors.userError) {
      this.setState({
        inputValue: '',
        selectedUser: 0,
      });

      return this.props.addTodo(prevState);
    }

    return { errors };
  });

  render() {
    const { inputValue, selectedUser, errors } = this.state;
    const { users } = this.props;

    return (
      <form className={cn('App__form', 'form')}>
        <section className={cn('form__section')}>
          <label
            className={cn('form__label')}
            htmlFor="newTodo"
          >
            Todo Title:
            <input
              className={
                cn('form__input', { 'form__input--error': errors.titleError })
              }
              id="newTodo"
              onChange={e => this.handleInputChange(e)}
              type="text"
              placeholder="write todo here..."
              value={inputValue}
            />
          </label>
          {
            errors.titleError
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
              cn('form__select', { 'form__select--error': errors.userError })
            }
            value={selectedUser}
            onChange={e => this.handleSelectedUser(e)}
          >
            <option value="0">{}</option>
            {users.map(user => (<SelectOption key={user.id} user={user} />))}
          </select>
          {errors.userError
          && (
            <span className={cn('form--error')}>
              User is not selected
            </span>
          )}
        </section>
        <button
          className={cn('form__button')}
          type="button"
          onClick={this.checkErrorsThenAdd}
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
