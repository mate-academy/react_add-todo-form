import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Container } from 'semantic-ui-react';
import { userType } from '../typedefs/userType';

class NewTodo extends Component {
  state = {
    userId: 0,
    title: '',
    isEmptyUser: false,
    isEmptyTitle: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    if (name === 'title') {
      const title = value.replace(/[^\w\s]/, '').slice(0, 30);

      this.setState({ title, isEmptyTitle: false });
    } else {
      this.setState({ [name]: +value, isEmptyUser: false });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(({ userId, title }) => {
      const errors = {};

      errors.isEmptyTitle = title.trim() === '';
      errors.isEmptyUser = userId === 0;

      if (!errors.isEmptyTitle && !errors.isEmptyUser) {
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
    const { userId, title, isEmptyUser, isEmptyTitle } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Button className="form__button" type="submit">Add</Form.Button>
        <Form.Group widths="equal">
          <Container className="form__inner">
            {isEmptyTitle && (
              <span className="form__error">Please enter the title</span>
            )}
            <Form.Field
              control="input"
              name="title"
              placeholder="Add New Todo"
              onChange={this.handleChange}
              value={title}
            />
          </Container>
          <Container className="form__inner">
            {isEmptyUser && (
              <span className="form__error">Please choose a user</span>
            )}
            <Form.Field
              control="select"
              name="userId"
              onChange={this.handleChange}
              value={userId}
            >
              <option value={0}>Choose a user</option>
              {users.map(({ name, id }) => (
                <option key={id} value={id}>
                  {`${id}. ${name}`}
                </option>
              ))}
            </Form.Field>
          </Container>
        </Form.Group>
      </Form>
    );
  };
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(userType).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
