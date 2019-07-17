import React from 'react';

import users from './api/users';

class NewTodo extends React.Component {
  state = {
    user: '',
    title: '',
  }

  submitNewPerson = (event) => {
    const form = event.target;

    event.preventDefault();
    this.props.onSubmit({
      id: this.props.todos.length + 1,
      user: users.find(user => this.state.user === user.name),
      title: form.elements.title.value,
      complited: 'false',
    });

    this.setState({
      user: '',
      title: '',
    });
  }

  AddField = (event) => {
    const { name, value } = event.target;

    event.preventDefault();
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { title, user } = this.state;

    return (
      <form onSubmit={this.submitNewPerson}>
        <label>
          <input
            onChange={this.AddField}
            name='title'
            value={title}
            className='form-group'
            type='text'
            placeholder='Enter title todo'
          />
        </label>
        <select
          onChange={this.AddField}
          name='user'
          value={user}
          className='browser-default custom-select'
        >
          <option selected>Select a user</option>
          {users.map(user =>
            <option
              value={user.name}
              key={user.id}
            >
              {user.name}
            </option>
          )}
        </select>
        <button
          type="submit"
          className="btn btn-success"
        >
          Add
          </button>
      </form>
    )
  }
}

export default NewTodo
