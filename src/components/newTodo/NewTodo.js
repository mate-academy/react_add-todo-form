import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'semantic-ui-react';

class NewTodo extends React.Component {
  state = {
    title: '',
    user: null,
    titleError: null,
    userError: null,
  }

  handleInputChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
      titleError: null,
    });
  };

  handleSelectChange = ({ target }) => {
    const { value } = target.value;

    this.setState({
      user: value,
      userError: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userSelect } = event.target;
    const { todos, users, addTodo } = this.props;

    if (
      !userSelect.value
      && title.value.length === 0
    ) {
      this.setState({
        userError: 'Enter user',
        titleError: 'Enter title',
      });
    } else if (!userSelect.value) {
      this.setState({
        userError: 'Enter user',
      });
    } else if (title.value.length === 0) {
      this.setState({
        titleError: 'Enter title',
      });
    } else {
      const newTodo = {
        title: title.value,
        completed: false,
        user: users[userSelect.value],
        id: todos.length + 1,
        userId: users[userSelect.value].id,
      };

      this.setState({
        title: '',
        user: '',
      });

      addTodo(newTodo);
    }
  };

  render() {
    const { users } = this.props;
    const {
      title,
      user,
      userError,
      titleError,
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field
          maxLength={25}
          type="text"
          name="title"
          control={Input}
          label="ToDo"
          placeholder="Write your title"
          onChange={this.handleInputChange}
          value={title}
        />
        {titleError && (
          <p>{titleError}</p>
        )}
        <select
          name="userSelect"
          id="userSelect"
          value={user}
          onChange={this.handleSelectChange}
          className="ui dropdown"
        >
          <option selected value="">
            Choose a user
          </option>
          {users.map((userSelected, index) => (
            <option value={index}>{userSelected.name}</option>
          ))}
        </select>
        {userError && (
          <p>{userError}</p>
        )}
        <Button
          type="submit"
          color="green"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
