import React from 'react';
import './FormAddTodo.css';
import PropTypes from 'prop-types';

export class FormAddTodo extends React.Component {
  state = {
    user: '',
    titleTodo: '',
    isFinishTodo: false,
    validUser: true,
    validTitleTodo: true,
  }

  resetForm = () => (
    this.setState({
      user: '',
      titleTodo: '',
      isFinishTodo: false,
    })
  );

  validForm = () => {
    let response = true;
    const { user, titleTodo } = this.state;

    if (!user) {
      this.setState({ validUser: false });
      response = false;
    }

    if (titleTodo.trim() === '') {
      this.setState({ validTitleTodo: false });
      response = false;
    }

    return response;
  };

  addNewTodo = (e) => {
    const { user, titleTodo, isFinishTodo } = this.state;

    e.preventDefault();

    if (!this.validForm()) {
      return;
    }

    this.props.getNewListTodos({
      userId: +user,
      id: (Math.max.apply(null,
        this.props.listTodos.map(
          todo => todo.id,
        )) + 1),
      title: titleTodo,
      completed: isFinishTodo,
    });

    this.resetForm();
  };

  handleChange = ({ target }) => {
    const value = target.value.replace(/\W/g, ' ');

    if (target.type === 'checkbox') {
      return this.setState({ [target.id]: target.checked });
    }

    let validStateInput;

    if (target.id === 'titleTodo') {
      validStateInput = 'validTitleTodo';
    }

    if (target.id === 'user') {
      validStateInput = 'validUser';
    }

    return this.setState({
      [target.id]: value,
      [validStateInput]: true,
    });
  };

  render() {
    const {
      user, titleTodo,
      isFinishTodo, validUser, validTitleTodo,
    } = this.state;
    const { users } = this.props;

    return (
      <form className="form--new-Todo">
        <h3>
          Add new todo :)
        </h3>
        <label>
          {validUser
            ? 'Choose a user:'
            : (
              <strong className="form--error">
                Please choose User!!!
              </strong>
            )}

          <select
            name="user"
            id="user"
            value={user}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>

            {users.map(iterationUser => (
              <option
                key={iterationUser.id}
                value={iterationUser.id}
              >
                {iterationUser.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          {validTitleTodo
            ? 'Title todo:'
            : (
              <strong className="form--error">
                Please enter title todo!!!
              </strong>
            )}
          <input
            name="titleTodo"
            id="titleTodo"
            placeholder="enter title todo :)"
            value={titleTodo}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Is finish todo:
          <input
            type="checkbox"
            name="isFinishTodo"
            id="isFinishTodo"
            placeholder="enter title todo :)"
            checked={isFinishTodo}
            onChange={this.handleChange}
          />
        </label>

        <button
          type="button"
          onClick={this.addNewTodo}
        >
          Add new todo
        </button>
      </form>
    );
  }
};

FormAddTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
