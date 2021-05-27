import React from 'react';

export class Form extends React.Component {
  state = {
    newTodo: '',
    userName: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodo, userName } = this.state;

    this.props.onAdd(newTodo, userName);
  }

  render() {
    console.log(this.state);
    const { users } = this.props;
    const { newTodo, userName } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          placeholder="Write todo"
          name="newTodo"
          value={newTodo}
          onChange={this.handleChange}
        />
        <select
          name="userName"
          value={userName}
          onChange={this.handleChange}
        >
          <option disabled value="">Select user</option>
          {users.map(({ name, id }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          type="submit"
        >
          add
        </button>
      </form>
    );
  }
}
