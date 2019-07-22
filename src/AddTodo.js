import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addTodo } from './redux/todos';

import FormError from './FormError';

class AddTodo extends React.Component {
  state = {
    values: {
      title: '',
      userName: '',
    },
    errors: {
      title: [],
      userName: [],
    },
    disabledSubmit: false,
  };

  hangeChangeInput = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'title') {
      newValue = value.match(/[a-zA-Z]|\s/g);
      newValue = value
        ? newValue
          .join('')
          .replace(/\s+/g, ' ')
        : '';
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: [],
      },
      disabledSubmit: false,
      values: {
        ...prevState.values,
        [name]: newValue,
      },
    }));
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { values: { title, userName } } = this.state;
    const errors = {
      title: [],
      userName: [],
    };
    let disabledSubmit = false;

    if (!title) {
      errors.title.push('Write a title');
      disabledSubmit = true;
    }

    if (title.length < 5) {
      errors.title.push('Length must be more then 5');
      disabledSubmit = true;
    }

    if (!userName) {
      errors.userName.push('Choose a user');
      disabledSubmit = true;
    }

    if (disabledSubmit) {
      this.setState({
        errors,
        disabledSubmit,
      });
    } else {
      const user = this.props.users.find(userObj => userObj.name === userName);

      this.props.addTodo({ title, user });
    }
  };

  render() {
    const { users } = this.props;

    const {
      values: { title, userName },
      errors: { title: errorsTitle, userName: errorsUser },
      disabledSubmit,
    } = this.state;

    return (
      <form
        className="add-person-form"
        onSubmit={this.handleFormSubmit}
        action=""
      >

        {
          errorsTitle && <FormError errors={errorsTitle} />
        }

        <label htmlFor="title-field">
          <input
            onChange={this.hangeChangeInput}
            name="title"
            id="title-field"
            type="text"
            placeholder="what you want to do?"
            value={title}
          />
        </label>

        {
          errorsUser && <FormError errors={errorsUser} />
        }

        <select
          onChange={this.hangeChangeInput}
          value={userName}
          id="user-select"
          name="userName"
        >

          <option value="">Choose a user</option>

          {
            users.map(user => (
              <option value={user.name} key={user.id}>{user.name}</option>
            ))
          }

        </select>

        <button
          className="add-person-form__submit"
          type="submit"
          disabled={disabledSubmit}
        >
          Add
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  users: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};

const mapState = state => ({
  users: state.users,
});

const mapActions = {
  addTodo,
};

export default connect(mapState, mapActions)(AddTodo);
