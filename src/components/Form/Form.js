import React, { PureComponent } from 'react';

import './Form.scss';
import { UserShape } from '../../shapes/UserShape';

export class Form extends PureComponent {
  state = {
    userId: 0,
    title: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: name === 'userId' ? Number(value) : value,
    });
  }

  render() {
    const { users, addTodo } = this.props;
    const { userId, title } = this.state;

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        addTodo(title, userId);
        this.setState({
          userId: 0,
          title: '',
        });
      }}
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <select
          name="userId"
          value={userId}
          onChange={this.handleChange}
        >
          <option key={0} value={0}>
            Choose user
          </option>
          {users.map(({ name, id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <button type="submit">
          +
        </button>
      </form>
    );
  }
}

Form.propTypes = UserShape.isRequired;
