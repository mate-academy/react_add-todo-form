import React from 'react';
import users from '../../api/users';

export class NewTodo extends React.Component {
  state = {
    userId: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    // eslint-disable-next-line no-console
    }, () => console.log(this.state));
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { addTodo } = this.props;

    const options = users.map(user => (
      <option
        key={user.id}
        value={user.id}
      >
        {user.name}
      </option>
    ));

    const newTodo = {
      title: this.state.todoName,
      userId: this.state.userId,
    };

    return (
      <form
        name="addTodo"
        className="form"
        onSubmit={event => addTodo(event, newTodo)}
      >
        <label>
          Name of ToDo
          <input
            name="todoName"
            type="text"
            id="title"
            className="input"
            placeholder="Type TODO title"
            onChange={this.handleChange}
            value={this.state.todoTitle}
          />
        </label>
        <br />
        <label>
          that user doing:
          <select
            name="userId"
            value={this.state.userId}
            onChange={this.handleChange}
          >
            <option value="" disabled>--Please choose a user--</option>
            {options}
          </select>
        </label>
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}
