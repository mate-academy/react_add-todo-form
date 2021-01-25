import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { UserPropTypes } from '../propTypes/UserPropTypes'; // ?
import TodoInput from './TodoInput';
import UserInput from './UserInput';

class NewTodo extends Component {
  state = {
    userId: 0,
    title: '',
    isUserUndefined: false,
    isTitleUndefined: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    if (name === 'title') {
      const title = value.replace(/[^\w\s]/, '');

      this.setState({
        title,
        isTitleUndefined: false,
      });
    } else {
      this.setState({
        [name]: +value,
        isUserUndefined: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(({ userId, title }) => {
      const errors = {};

      errors.isTitleUndefined = title.trim() === '';
      errors.isUserUndefined = userId === 0;

      if (!errors.isTitleUndefined && !errors.isUserUndefined) {
        this.props.addTodo({
          userId,
          title,
          completed: false,
        });

        return {
          title: '',
          userId: 0,
        };
      }

      return errors;
    });
  }

  render = () => {
    const { users } = this.props;
    const { userId, title, isUserUndefined, isTitleUndefined } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Button className="form__button" type="submit">Add</Form.Button>
        <Form.Group widths="equal">
          <TodoInput
            value={title}
            isTitleUndefined={isTitleUndefined}
            handleChange={this.handleChange}
          />
          <UserInput
            userId={userId}
            isUserUndefined={isUserUndefined}
            handleChange={this.handleChange}
            users={users}
          />
        </Form.Group>
      </Form>
    );
  };
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(UserPropTypes).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
