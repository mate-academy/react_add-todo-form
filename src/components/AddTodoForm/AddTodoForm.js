import React from 'react';
import PropTypes from 'prop-types';

import './AddTodoForm.css';

export class AddTodoForm extends React.PureComponent {
  state={
    username: 'Choose a user',
    title:'',
    errortitle: false,
    errorusername: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const re = /[^\w ]+/;

    this.setState({
      [name]: value.replace(re, ''),
      [`error${name}`]: false,
    });
  }

  handleSubmit = (event) => {
    const { title, username } = this.state;
    const { addTodo, users } = this.props;

    event.preventDefault();

    if (!title.trim()){
      this.setState({
        errortitle: true
      });
    }

    if (username === 'Choose a user') {
      this.setState({
        errorusername: true
      });
    }

    if (title && username!=='Choose a user') {
      const foundUser = users.find(user => user.name === username);

      this.setState({
        title: '',
        username: 'Choose a user',
      });

      addTodo(title, foundUser);
    }
  }

  render() {
    const { username, errorusername, title, errortitle } = this.state;
    const { users } = this.props;

    return (
      <div className="form">
        <form
          onSubmit={this.handleSubmit}
        >
          <div className="form__input form-group">
            <label htmlFor="username" className="font-weight-bold">Username
            </label>
            <select
              name="username"
              id="username"
              className="form-control"
              value={username}
              onChange={this.handleChange}
            >
              <option>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {errorusername && <p className="text-danger">Please, choose a user</p>}
          </div>

          <div className="form__input form-group card-title">
            <label htmlFor="newtodo" className="font-weight-bold">
              New todo
            </label>
            <input
              type="text"
              name="title"
              id="newtodo"
              className="form-control"
              placeholder="todo title"
              value={title}
              onChange={this.handleChange}
            >
            </input>

            {errortitle && <p className="text-danger">Please, enter the title</p>}
          </div>

          <button type="submit" className="btn btn-dark w-50">Add</button>
        </form>
      </div>
    )
  }

}

AddTodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  addTodo: PropTypes.func.isRequired,
};
