import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

class NewTodo extends React.Component {
  state = {
    title: '',
    titleError: '',
    userError: '',
  }

  changeInput = (event) => {
    const title = event.target.value;

    this.setState({
      title,
      titleError: null,
    });
  };


  selectUser = (event) => {
    const name = event.target.value.name;

    this.setState({
      user: name,
      userError: null,
    });
  };

  submiteInput = (event) => {
    event.preventDefault();
    const { title, userSelect } = event.target;
    const { todos, users, addTodo } = this.props;

    if (
      !userSelect.value
      && title.value.length === 0
    ) {
      this.setState({
        userError: 'Please choose a user',
        titleError: 'Please enter the title',
      });
    } else if (!userSelect.value) {
      this.setState({
        userError: 'Please choose a user',
      });
    } else if (title.value.length === 0) {
      this.setState({
        titleError: 'Please enter the title',
      });
    } else {
      const newTodo = {
        userId: users[userSelect.value].id,
        id: todos.length + 1,
        title: title.value,
        completed: false,
        user: users[userSelect.value],
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
    const { title, user, userError, titleError } = this.state;

    return (
      <Form onSubmit={this.submiteInput}>
        <Form.Input
          value={title}
          onChange={this.changeInput}
          type="text"
          name="title"
          placeholder="Write a title"
        />
        {titleError && (
          <p class="error">{titleError}</p>
        )}
        <select
          id="userSelect"
          name="userSelect"
          value={user}
          onChange={this.selectUser}
        >
          <option selected value="">
            Choose a user
          </option>
          {users.map((userSelected, index) => (
            <option value={index}>{userSelected.name}</option>
          ))}
        </select>
        {userError && (<p class="error">{userError}</p>)}
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
