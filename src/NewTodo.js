import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
state = {
  tempTitle: '',
  tempUser: '',
  title: '',
  user: '',
  newtodos: [...this.props.todos],
}

handleSubmit = (event) => {
  event.preventDefault();
  const { newtodos } = this.state;
  const { saveChange } = this.props;

  if (this.state.tempTitle.split('').length === 0) {
    alert('Please enter the title!');
  } else if (this.state.tempUser.split('').length === 0) {
    alert('Please choose a user!');
  } else {
    this.setState(prevState => ({ title: prevState.tempTitle }));
    this.setState(prevState => ({ user: prevState.tempUser }));
    this.setState({ tempUser: '' });
    this.setState({ tempTitle: '' });
    this.setState(prevState => ({
      newtodos,
      ...newtodos.push({
        userId: +prevState.user, title: prevState.title,
      }),
    }));
    this.setState(() => saveChange(newtodos));
  }
}

handleChange = (event) => {
  this.setState({ tempTitle: event.target.value });
}

selectChange = (event) => {
  this.setState({ tempUser: event.target.value });
}

render() {
  const { tempTitle, tempUser } = this.state;
  const { users } = this.props;

  return (
    <form className="form" onSubmit={this.handleSubmit}>
      <label htmlFor="title">Please, write TODO:&nbsp;</label>
      <input
        value={tempTitle}
        type="text"
        id="title"
        onChange={this.handleChange}
      />
      <select
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
      <button type="submit">ADD</button>
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
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
  ).isRequired,
};

export default NewTodo;
