import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    valueUserId: 0,
    valueTitle: '',
    titleError: false,
    nameError: false,

  }

  selectChangeHandler = (event) => {
    this.setState({ valueUserId: +event.target.value, nameError: false });
  };

  inputChangeHandler = (event) => {
    this.setState({ valueTitle: event.target.value, titleError: false });
  };

  submitFormHandler = (event) => {
    event.preventDefault();
    const { valueTitle, valueUserId } = this.state;

    if (!valueUserId || !valueTitle) {
      this.setState({
        titleError: !valueTitle,
        nameError: !valueUserId,
      });

      return;
    }

    this.props.setNewTodo(valueUserId, valueTitle);

    this.setState({
      valueUserId: 0,
      valueTitle: '',
    });
  };

  render() {
    const { userList } = this.props;
    const { valueTitle, titleError, nameError } = this.state;

    return (
      <>
        <div className="todo-form__error">
          {titleError && (
            <span className="todo-form__error">please enter todo-task </span>
          )}
          {nameError && (
            <span className="todo-form__error">please choose user </span>
          )}
        </div>
        <form
          onSubmit={this.submitFormHandler}
          className="todo-form__add-form"
        >
                      TODO:
          <input
            className="todo-form__add-form--title"
            type="text"
            placeholder=" write your TODO here "
            onChange={this.inputChangeHandler}
            value={valueTitle}
          />
          <select
            onChange={this.selectChangeHandler}
            className="todo-form__add-form--user"
          >
            <option value="0">Choose a user</option>
            {userList.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <input
            type="submit"
            value="add"
            className="todo-form__add-form--button"
          />
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  setNewTodo: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default NewTodo;
