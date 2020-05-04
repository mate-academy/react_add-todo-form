
import React from 'react';
import PropTypes from 'prop-types';

class NewToDo extends React.Component {
  state = {
    title: '',
    completed: false,
    userName: '',
    userNameError: ' \n ',
    titleError: '',
  }

  handleSubmit = (event) => {
    let isWrongData = false;
    let userNameError = ' \n ';
    let titleError = '';

    event.preventDefault();

    if (this.state.userName.trim() === '') {
      userNameError = 'You must enter User Name';
      isWrongData = true;
    }

    if (this.state.title.trim() === '') {
      titleError = 'You must enter what should be done';
      isWrongData = true;
    }

    if (isWrongData) {
      this.setState({
        titleError,
        userNameError,
      });

      return;
    }

    this.props.addToDoFunction(this.state);
    this.setState({
      title: '',
      complited: false,
      userName: '',
    });
  }

  handleFormFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: '',

    });
  }

  render() {
    const { userName, userNameError, title, titleError } = this.state;

    return (
      <form className="new-user-form" onSubmit={this.handleSubmit}>

        New user`s name:
        <input
          type="text"
          list="users"
          name="userName"
          onChange={this.handleFormFieldChange}
          value={userName}
          placeholder="Choose user name"
        />
        <span className="user-name-error">{userNameError}</span>
        <datalist id="users">
          {this.props.usersNames.map(name => (
            <option key={name}>{name}</option>
          ))}
        </datalist>
        <br />
        New &apos;What to do&apos;:
        <textarea
          name="title"
          onChange={this.handleFormFieldChange}
          value={title}
          placeholder="Input here, what should be done."
        />
        <span className="title-error">{titleError}</span>
        <br />
        <button type="submit">submit</button>
      </form>
    );
  }
}

NewToDo.propTypes = {
  addToDoFunction: PropTypes.func.isRequired,
  usersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

};

export default NewToDo;
