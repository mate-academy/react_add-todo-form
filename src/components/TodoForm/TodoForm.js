import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class TodoForm extends React.Component {
  state = {
    newTodo: {
      todoTitle: '',
      userName: '',
    },
    errors: {
      todoError: false,
      userError: false,
    },
  }

  changeHandler = (e) => {
    const { name, value } = e.target;

    this.setState(state => ({
      newTodo: {
        ...state.newTodo,
        [name]: value,
      },
    }));
  }

  validateNewTodo = (todo, user) => {
    if (!todo) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          todoError: true,
        },
      }));

      return false;
    }

    if (!user) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          userError: true,
        },
      }));

      return false;
    }

    this.setState({
      errors: {
        todoError: false,
        userError: false,
      },
    });

    return true;
  }

  render() {
    const {
      newTodo: { todoTitle, userName },
      errors: { todoError, userError },
    } = this.state;

    const { onAdd } = this.props;

    return (
      <Form
        action=""
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          if (this.validateNewTodo(todoTitle, userName)) {
            onAdd(this.state.newTodo);
            this.setState({
              newTodo: {
                todoTitle: '',
                userName: '',
              },
            });
          }
        }}
      >
        <Form.Group>
          <Form.Label htmlFor="todo">
            What to do:
            {' '}
          </Form.Label>
          {todoError && (
            <Alert variant="danger">
              <Alert.Heading>Please, set a todo</Alert.Heading>
            </Alert>
          )}
          <Form.Control
            type="text"
            id="todo"
            placeholder="todo"
            name="todoTitle"
            value={todoTitle}
            onChange={this.changeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="todo-user">
            Who should do:
          </Form.Label>
          {userError && (
            <Alert variant="danger">
              <Alert.Heading>Please, choose a user</Alert.Heading>
            </Alert>
          )}
          <Form.Control
            as="select"
            name="userName"
            id="todo-user"
            value={userName}
            onChange={this.changeHandler}
          >
            <option value={null}>Choose user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button
          style={{
            width: '18rem', marginBottom: '25px',
          }}
          type="submit"
        >
          Add new todo
        </Button>
      </Form>
    );
  }
}

TodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
