import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
state = {
  tempTitle: '',
  tempUser: '',
  inputError: false,
  selectError: false,
  longTitle: false,
  activeButton: false,
}

handleSubmit = (event) => {
  event.preventDefault();

  if (this.state.tempTitle.split('').length === 0) {
    this.setState({ inputError: true });
  } else if (this.state.tempUser.split('').length === 0) {
    this.setState({ selectError: true });
  } else {
    this.setState({
      tempUser: '', tempTitle: '',
    });
    this.props.saveChange({
      userId: +this.state.tempUser,
      title: this.state.tempTitle,
      user: this.props.users.find(user => user.id === +this.state.tempUser),
      id: this.props.length + 1,
    });
  }
}

handleChange = (event) => {
  this.setState({
    tempTitle: event.target.value,
    inputError: false,
  });
  if (this.state.tempTitle.split('').length > 10) {
    this.setState({
      longTitle: true,
      activeButton: true,
    });
  } else {
    this.setState({
      longTitle: false,
      activeButton: false,
    });
  }
}

selectChange = (event) => {
  this.setState({
    tempUser: event.target.value,
    selectError: false,
  });
}

render() {
  const { tempTitle, tempUser } = this.state;
  const { users } = this.props;

  return (
    <form className="form" onSubmit={this.handleSubmit}>
      <label htmlFor="title">Please, write TODO:&nbsp;</label>
      {this.state.inputError && (<span className="inputError">Please enter the title:</span>)}
      {this.state.longTitle && (<span className="inputError">Very long title!</span>)}
      <input
        className={this.state.inputError ? 'error' : ''}
        value={tempTitle}
        type="text"
        id="title"
        onChange={this.handleChange}
      />
      <label htmlFor="select" className="inputError">{this.state.selectError && (<span>Please choose a user!</span>)}</label>
      <select
        id="select"
        value={tempUser}
        onChange={this.selectChange}
      >
        <option>Choose a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button disabled={this.state.activeButton} type="submit">ADD</button>
    </form>
  );
}
}

NewTodo.propTypes = {

  saveChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  ).isRequired,
  length: PropTypes.number.isRequired,
};

export default NewTodo;
