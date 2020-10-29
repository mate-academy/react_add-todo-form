import React, { PureComponent } from 'react';
import { UserShape } from '../../shapes/UserShape';
import './Form.scss';

export class Form extends PureComponent {
  state = {
    userId: 0,
    title: '',
    novalidateTitle: false,
    novalidateUser: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: name === 'userId' ? Number(value) : value,
      novalidateTitle: false,
      novalidateUser: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.title.trim()) {
      this.setState({
        novalidateTitle: true,
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        novalidateUser: true,
      });

      return;
    }

    this.props.addTodo(this.state.title, this.state.userId);
    this.setState({
      userId: 0,
      title: '',
    });
  }

  render() {
    const { users } = this.props;
    const { userId, title, novalidateTitle, novalidateUser } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter new task"
              value={title}
              onChange={this.handleChange}
              className="form__input"
            />
          </label>
          <label htmlFor="userId">
            <select
              name="userId"
              id="userId"
              value={userId}
              onChange={this.handleChange}
              className="form__select"
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
          </label>
          <button type="submit" className="form__btn">
            +
          </button>
        </form>
        {novalidateTitle && <span>Please enter the title</span>}
        {novalidateUser && <span>Please choose a user</span>}
      </>
    );
  }
}

Form.propTypes = UserShape.isRequired;
