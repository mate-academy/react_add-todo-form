import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import '../../App.css';

class NewTodo extends PureComponent {
  state = {
    users: this.props.users,
    title: '',
    userName: '',
    selectMsg: 'Choose a user',
    titleError: null,
  }

  titleInputChange = (event) => {
    event.target.value = event.target.value.replace(/[^\w\s]/gi, '');

    this.setState({
      title: event.target.value,
      titleError: null,
    });
  };

  usersSelectChange = (event) => {
    this.setState({
      userName: event.target.value,
      selectMsg: 'Choose a user',
    });
  }

  submitForm = (event) => {
    const { title, userName } = this.state;
    console.log(userName);

    if (title.trim() === '' && (userName === '' || userName === 'Choose a user' || userName === 'Please choose a user')) {
      this.setState({
        titleError: `Please enter the title`,
        selectMsg: 'Please choose a user',
      });

      return;
    }

    if (title.trim() === '') {
      this.setState({
        titleError: `Please enter the title`,
      });

      return;
    }

    if (userName === '' || userName === 'Choose a user' || userName === 'Please choose a user') {
      this.setState({
        selectMsg: 'Please choose a user',
      });

      return;
    }

    event.target.reset();
    this.props.submitFunction(title, userName);
    this.setState({
      title: '',
      userName: '',
      selectMsg: 'Choose a user',
      titleError: null,
    });
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <Form.Group widths="equal">
          {this.state.titleError ? (
            <Form.Input
              fluid
              label="Todo title"
              placeholder="Todo title"
              onChange={this.titleInputChange}
              error={{ content: this.state.titleError, pointing: 'below' }}
            />
          ) : (
            <Form.Input
              fluid
              label="Todo title"
              placeholder="Todo title"
              onChange={this.titleInputChange}
            />
          )
          }
        </Form.Group>
        <select onChange={this.usersSelectChange}>
          <option>{this.state.selectMsg}</option>
          {this.state.users.map(user => (
            <option>{user.name}</option>
          ))}
        </select>
        <Button>Submit</Button>
      </Form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  submitFunction: PropTypes.func.isRequired,
};

export default NewTodo;
