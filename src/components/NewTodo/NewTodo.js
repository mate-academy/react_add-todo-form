import React from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

class NewTodo extends React.PureComponent {
  state = {
    selectUserId: 0,
    inputTitle: '',
    isErrorInput: false,
    isErrorSelect: false,
  }

  handleChangeUser = (evt) => {
    const id = Number(evt.target.value);

    this.setState({
      selectUserId: id,
      isErrorSelect: false,
    });

    this.props.handleChange(id);
  }

  handleChangeTitle = (evt) => {
    const title = evt.target.value.match(/\w/g);

    if (!Object.is(null, title)) {
      this.setState({
        inputTitle: title.join(''),
        isErrorInput: false,
      });
    } else {
      this.setState({
        inputTitle: '',
        isErrorInput: false,
      });
    }
  }

  handleSubmitForm = (evt) => {
    evt.preventDefault();

    if (!this.state.inputTitle) {
      this.setState({
        isErrorInput: true,
      });
    }

    if (!this.state.selectUserId) {
      this.setState({
        isErrorSelect: true,
      });
    }

    if (this.state.inputTitle && this.state.selectUserId) {
      this.props.handleSubmit(this.state.selectUserId, this.state.inputTitle);

      this.setState({
        inputTitle: '',
      });
    }
  }

  render() {
    return (
      <form className="App__Form Form" onSubmit={this.handleSubmitForm}>
        <label className="Form__label" htmlFor="select">
          {this.state.isErrorSelect ? 'Please choose a user' : ''}
        </label>
        <select
          className="Form__select"
          id="select"
          value={this.state.selectUserId}
          onChange={this.handleChangeUser}
        >
          <option value={0}>Choose a user</option>
          {this.props.users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <label className="Form__label" htmlFor="input">
          {this.state.isErrorInput ? 'Please enter the title' : ''}
        </label>
        <input
          className="Form__input"
          placeholder="Title"
          id="input"
          value={this.state.inputTitle}
          onChange={this.handleChangeTitle}
        />
        <button className="Form__button" type="submit">Add</button>
      </form>
    );
  }
}

export default NewTodo;

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    company: PropTypes.object.isRequired,
  }).isRequired).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
