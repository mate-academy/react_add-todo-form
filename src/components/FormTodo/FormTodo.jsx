import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

export class FormTodo extends React.PureComponent {
  state = {
    title: '',
    userId: 0,
    isTitle: false,
    isUser: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitle: true,
    });
  }

  handleUser = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      isUser: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { handleTodo } = this.props;
    const { title, userId } = this.state;

    if (!title || !userId) {
      return;
    }

    this.setState({
      title: '',
      userId: 0,
      isUser: false,
      isTitle: false,
    });

    handleTodo(title, userId);
  }

  render() {
    const { userId, title, isUser, isTitle } = this.state;
    const { users } = this.props;

    /* const options = users.map(user => ({
      key: user.id,
      value: user.id,
      text: user.name,
    })); */

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
          <select
            className="select"
            name="userId"
            value={userId}
            onChange={this.handleUser}
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

          {/* <Form.Select
            placeholder="Choose a user"
            label="User"
            name="userId"
            value={userId}
            options={options}
            onChange={this.handleUser}
          /> */}
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
  handleTodo: PropTypes.func.isRequired,
};

FormTodo.defaultProps = {
  users: null,
};
