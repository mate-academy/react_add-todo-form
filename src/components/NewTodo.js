import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    errorInput: false,
    errorSelect: false,
  }

  selectUserName = ({ target: { value } }) => {
    this.setState({
      userId: value,
      errorSelect: false,
    });
  }

  handleChange = ({ target: { value } }) => {
    const title = value.replace(/^\s/, '');

    this.setState({
      title,
      errorInput: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;
    const { addTodo } = this.props;

    addTodo(title, userId);

    this.setState({
      title: '',
      userId: 0,
      errorInput: false,
      errorSelect: false,
    });
  }

  validateForm = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;

    if (!title) {
      this.setState({
        errorInput: true,
      });
    }

    if (!userId) {
      this.setState({
        errorSelect: true,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, userId, errorInput, errorSelect } = this.state;
    let errorMessageInput;
    let errorMessageSelect;

    if (!errorInput) {
      errorMessageInput = '';
    } else {
      errorMessageInput = 'Please enter the title';
    }

    if (!errorSelect) {
      errorMessageSelect = '';
    } else {
      errorMessageSelect = 'Choose a user';
    }

    return (
      <div className="field is-horizontal is-grouped">
        <form
          className="field-body"
          onSubmit={
            title && userId ? this.handleSubmit : this.validateForm
          }
        >
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Please enter the title"
                value={title}
                onChange={this.handleChange}
              />
              <p className="help is-danger">{errorMessageInput}</p>
            </div>
            <div className="control">
              <button className="button is-link" type="submit">
                Add
              </button>
            </div>
          </div>
          <div className="field-body">
            <div className="select">
              <select
                onChange={this.selectUserName}
                value={userId}
              >
                <option disabled value="0">
                  Choose a User
                </option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <p className="help is-danger">{errorMessageSelect}</p>
            </div>
          </div>
        </form>
      </div>
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
