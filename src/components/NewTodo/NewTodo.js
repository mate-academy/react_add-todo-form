import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    selectErrorClassName: false,
    placeholder: '',
  }

  selectName = (event) => {
    this.setState({
      userId: event.target.value,
      selectErrorClassName: false,
    });
  }

  handleTaskChange = (event) => {
    const pattern = /\w|\s/g;
    const matches = event.target.value.match(pattern);

    this.setState({
      title: matches ? matches.join('') : '',
      placeholder: '',
    });
  }

  validatedForm = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;

    if (!title) {
      this.setState({
        placeholder: 'Please enter the title',
      });
    }

    if (!userId) {
      this.setState({
        selectErrorClassName: true,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;
    const { addTodo } = this.props;

    addTodo(title, userId);

    this.setState({
      title: '',
      userId: 0,
      placeholder: '',
      selectErrorClassName: false,
    });
  }

  render() {
    const { users } = this.props;
    const { title, userId, selectErrorClassName, placeholder } = this.state;

    return (
      <form
        className={classNames({
          form: true, 'form__select-error': selectErrorClassName,
        })}
        onSubmit={
          title && userId ? this.handleSubmit : this.validatedForm
        }
      >
        <input
          className="form__input"
          type="text"
          placeholder={placeholder}
          value={title}
          onChange={this.handleTaskChange}
        />
        <select
          className="form__select"
          onChange={this.selectName}
          onClick={this.clearedError}
          value={userId}
        >
          <option disabled value="0">
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button className="form__button" type="submit">
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
