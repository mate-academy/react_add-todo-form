import React from 'react';

import users from './api/users';
import { stat } from 'fs';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    errors: {
      user: '',
      title: '',
    }
  }

  submitNewPerson = (event) => {
    const form = event.target;
    const errors = {};

    event.preventDefault();
    this.setState(state => {
      if (!state.title) {
        errors.title = 'Please enter the title'
      }
      if (+state.userId === 0) {
        errors.user = 'Please choose a user'
      }

      if (Object.keys(errors).length > 0) {
        return { errors };
      }

      this.props.onSubmit({
        id: this.props.todos.length + 1,
        user: (+this.state.userId !== 0)
          ? users.find(user => +this.state.userId === +user.id)
          : {},
        title: this.state.title,
        complited: 'false',
      });
    }
    )

    this.setState({
      userId: 0,
      title: '',
    });
  }

  AddField = (event) => {
    const { name, value } = event.target;

    event.preventDefault();
    this.setState({
      [name]: value,
      errors: {
        user: '',
        title: '',
      }
    });
  }

  render() {
    const { title, userId, errors } = this.state;
    console.log(userId);
    return (
      <form onSubmit={this.submitNewPerson}>
        <div className='form-field'>
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
          <div>
            {errors.title && (<div className='error'>{errors.title}</div>)}
          </div>
        </div>
        <div className='form-field'>
          <select
            onChange={this.AddField}
            name='userId'
            value={userId}
            className='browser-default custom-select'
          >
            <option value={0}>Select a user</option>
            {users.map(user =>
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            )}
          </select>
          {errors.user && (<div className='error'>{errors.user}</div>)}
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-success"
          >
            Add
          </button>
        </div>
      </form>
    )
  }
}

export default NewTodo
