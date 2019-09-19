import React, { Component } from 'react';

const initialState = {
  userId: {
    value: 0,
    error: '',
  },
  title: {
    value: '',
    error: '',
  },
};

class NewTodo extends Component {
  state = initialState;

  getFormValue() {
    return Object.entries(this.state)
      .reduce((acc, entry) => ({
        ...acc,
        [entry[0]]: entry[1].value,
      }), {});
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: {
        value,
        error: prevState[name].error,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addTodo } = this.props;
    const formValue = this.getFormValue();

    this.setState(initialState);
    addTodo(formValue);
  }

  render() {
    const { userId, title } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-field">
          <label htmlFor="new_todo">
            New Todo:
            <input
              id="new_todo"
              type="text"
              name="title"
              placeholder="Add new todo"
              value={title.value}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="user_select">
            User:
            <select
              id="user_select"
              name="userId"
              value={userId.value}
              onChange={this.handleChange}
            >
              <option value={0}>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default NewTodo;
