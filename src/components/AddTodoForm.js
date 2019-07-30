import React from 'react';
import usersFromServer from '../api/users';

class AddTodoForm extends React.Component {
  state = {
    title: '',
    user: null,
    titleError: '',
    userError: '',
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value.replace(/[^ \wа-яА-Я]/g, ''),
      titleError: '',
    });
  };

  handleUserChange = (event) => {
    this.setState({
      user: usersFromServer.find(user => user.id === +event.target.value),
      userError: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, user } = this.state;

    this.setState({
      titleError: title ? '' : 'Please enter a title',
      userError: user ? '' : 'Please choose a user',
    });

    if (title && user) {
      this.props.onSubmit(title, user);
      this.setState({ title: '', user: null });
    }
  };

  render() {
    const { title, titleError, userError } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleTitleChange}
            className={titleError ? 'error' : ''}
          />
          {titleError && (
            <span style={{ color: 'red' }}>{titleError}</span>
          )}
        </div>
        <div>
          <select
            name="user"
            onChange={this.handleUserChange}
            className={userError ? 'error' : ''}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span style={{ color: 'red' }}>{userError}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={titleError || userError}
        >
          Add
        </button>
      </form>
    );
  }
}

export default AddTodoForm;
