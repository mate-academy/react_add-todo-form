
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

    event.preventDefault();
    if (this.state.userName === '') {
      this.setState({
        userNameError: 'You must enter User Name',
      });
      isWrongData = true;
    }

    if (this.state.title === '') {
      this.setState({
        titleError: 'You must enter what should be done',
      });
      isWrongData = true;
    }

    if (isWrongData) {
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
    this.setState({
      [event.target.name]: event.target.value,
      [`${event.target.name}Error`]: '',

    });
  }

  render() {
    return (
      <form className="new-user-form" onSubmit={this.handleSubmit}>

        New user`s name:
        <input
          type="text"
          list="users"
          name="userName"
          onChange={this.handleFormFieldChange}
          value={this.state.userName}
          placeholder="Choose user name"
        />
        <span className="userNameError">{this.state.userNameError}</span>
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
          value={this.state.title}
          placeholder="Input here, what should be done."
        />
        <span className="titleError">{this.state.titleError}</span>
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
