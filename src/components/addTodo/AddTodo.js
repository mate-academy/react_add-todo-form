import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

const titleErrorVar = 'Yo have to write a title';
const selectUserErrorVar = 'Yo have to choose a user too';
const selectUser = 'Choose a user';

class AddTodo extends Component {
  state = {
    users: this.props.users,
    title: '',
    userName: '',
    userSelectMessage: selectUser,
    titleError: null,
  };

  titleInputChange = (event) => {
    const eventVar = event.target.value.replace(/[^\w\s]/gi, '');

    this.setState({
      title: eventVar,
      titleError: null,
    });
  };

  usersSelectChange = (event) => {
    this.setState({
      userName: event.target.value,
      userSelectMessage: selectUser,
    });
  };

  submitForm = (event) => {
    const { title, userName } = this.state;

    if (title.trim() === '' && (userName === '' || userName === selectUser || userName === selectUserErrorVar)) {
      this.setState({
        titleError: titleErrorVar,
        userSelectMessage: selectUserErrorVar,
      });

      return;
    }

    if (title.trim() === '') {
      this.setState({
        titleError: titleErrorVar,
      });

      return;
    }

    if (userName === '' || userName === selectUser || userName === selectUserErrorVar) {
      this.setState({
        userSelectMessage: selectUserErrorVar,
      });

      return;
    }

    event.target.reset();
    this.props.addTodoFunction(title, userName);
    this.setState({
      title: '',
      userName: '',
      userSelectMessage: selectUser,
      titleError: null,
    });
  };

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <Form.Group widths="equal">
          {this.state.titleError ? (
            <Form.Input
              placeholder="Write todo title"
              onChange={this.titleInputChange}
              error={{ content: this.state.titleError }}
            />
          ) : (
            <Form.Input
              placeholder="Write todo title"
              onChange={this.titleInputChange}
            />
          )
          }
        </Form.Group>
        <select onChange={this.usersSelectChange}>
          <option>{this.state.userSelectMessage}</option>
          {this.state.users.map(user => (
            <option key={user.id}>{user.name}</option>
          ))}
        </select>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddTodo;
