import React from 'react';
import PropTypes from 'prop-types';

class AddForm extends React.Component {
  state = {
    values: {
      title: '',
      userId: 0,
    },
    errors: {
      title: false,
      userId: false,
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: false,
      },
    }));
  }

  handleUserChange = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        userId: +value,
      },
      errors: {
        ...prevState.errors,
        UserId: false,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userId } = this.state.values;

    if (!title || !userId) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: !prevState.values.title,
          userId: !prevState.values.userId,
        },
      }));

      return;
    }

    this.setState({
      values: {
        title: '',
        userId: 0,
      },
      errors: {
        title: false,
        userId: false,
      },
    });

    this.props.addTodo(title, userId);
  }

  render() {
    const { users } = this.props;
    const { errors, values } = this.state;

    return (
      <form
        className="field__form"
        action=".api/form"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <div className="field__input">
          {errors.title && (
            <div className="error">
              Please enter a title
            </div>
          )}
          <label htmlFor="title">
            Title
          </label>
          {' '}
          <input
            className={errors.title ? 'invalid' : ''}
            type="text"
            name="title"
            id="title"
            placeholder="Please add a title"
            value={values.title}
            onChange={this.handleChange}
          />
        </div>

        <div className="field__input">
          {errors.userId && (
            <div className="error">
              Please choose a user
            </div>
          )}
          <label htmlFor="userId">
            User
          </label>
          {' '}

          <select
            className={errors.userId ? 'invalid' : ''}
            name="userId"
            id="userId"
            value={values.userId}
            onChange={this.handleUserChange}
          >
            <option>Please choose the user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="form__button"
        >
          Add
        </button>

      </form>
    );
  }
}

AddForm.propTypes = {
  users: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
  addTodo: PropTypes.func.isRequired,
};
export default AddForm;
