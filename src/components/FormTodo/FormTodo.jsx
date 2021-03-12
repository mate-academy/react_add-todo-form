import React from 'react';
import './FormTodo.css';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

const initialTodo = {
  title: '',
  userId: 0,
};

const initialError = {
  isTitle: true,
  isUser: true,
};

export class FormTodo extends React.Component {
  state = {
    todo: {
      title: '',
      userId: 0,
    },
    error: {
      isTitle: true,
      isUser: true,
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        [name]: value,
      },
      error: {
        ...prevState.error,
        isTitle: true,
      },
    }));
  }

  handleUserSelection = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        userId: +value,
      },
      error: {
        ...prevState.error,
        isUser: true,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addTodo } = this.props;
    const { title, userId } = this.state.todo;

    if (!title || !userId) {
      this.setState({
        error: {
          isTitle: false,
          isUser: false,
        },
      });

      return;
    }

    this.setState({
      todo: { ...initialTodo },
      error: { ...initialError },
    });

    addTodo(title, userId);
  }

  render() {
    const { userId, title } = this.state.todo;
    const { isUser, isTitle } = this.state.error;
    const { users } = this.props;

    return (
      <Form
        onSubmit={this.handleSubmit}
        error
      >
        {!isTitle && (
        <Message
          error
          header="Action Forbidden"
          content="Please enter the title!"
        />
        )}
        {!isUser && (
          <Message
            error
            header="Action Forbidden"
            content="Please choose a user!"
          />
        )}
        <Form.Group widths="equal">
          <Form.Input
            label="Title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            maxLength="15"

          />
          <div className="select">
            <select
              name="userId"
              value={userId}
              onChange={this.handleUserSelection}
            >
              <option>
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </Form.Group>
        <Form.Button>
          Submit
        </Form.Button>
      </Form>
    );
  }
}

FormTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  addTodo: PropTypes.func.isRequired,
};

FormTodo.defaultProps = {
  users: null,
};
