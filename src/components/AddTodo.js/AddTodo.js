/* eslint-disable arrow-body-style */
/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export class AddTodo extends React.Component {
  state = {
    title: '',
    select: '',
    errors: {
      select: '',
      title: '',
    },
  };

  validateForm = (formData) => {
    const errors = {};

    if (!formData.title) {
      errors.title = 'Please enter the title';
    }

    if (!formData.select) {
      errors.select = 'Please choose a user';
    }

    return errors;
  };

  onChange = ({ target }) => {
    const { name, value } = target;

    this.setState((state) => ({
      [name]: value,
      errors: {
        ...state.errors,
        [name]: '',
      },
    }));
  };

  onSubmit = (e) => {
    const { users, addTodo } = this.props;
    const { title, select } = this.state;
    const user = users.find((item) => item.id === +select);
    const errorsObj = this.validateForm(this.state);

    e.preventDefault();

    if (Object.keys(errorsObj).length > 0) {
      this.setState({ errors: errorsObj });
    } else {
      addTodo({
        title,
        id: uuidv4(),
        user,
      });
      this.setState({
        select: '',
        title: '',
        errors: {
          select: '',
          title: '',
        },
      });
    }
  };

  render() {
    const { users } = this.props;
    const { title, select, errors } = this.state;

    return (
      <form className="form" onSubmit={(e) => this.onSubmit(e)}>
        <input
          type="text"
          value={title}
          name="title"
          onChange={this.onChange}
          placeholder="Add title"
          className="title"
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <select
          value={select}
          name="select"
          onChange={this.onChange}
          className="select"
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.select && <span className="error">{errors.select}</span>}

        <button type="submit" className="add">
          Add
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

AddTodo.defaultProps = { users: [] };
