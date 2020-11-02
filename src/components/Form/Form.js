import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

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

    const { title, userId } = this.state;

    this.props.addTodo({
      title,
      userId,
    });
    this.setState({
      userId: 0,
      title: '',
    });
  }

  render() {
    const { userId, title, novalidateTitle, novalidateUser } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit} className="form">
          <Input
            value={title}
            name="title"
            onChange={this.handleChange}
          />
          <Select
            value={userId}
            name="userId"
            onChange={this.handleChange}
          />
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

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
