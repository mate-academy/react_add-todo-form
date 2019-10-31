import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import '../../App.css';

class NewTodo extends PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: null,
    submit: false,
    correctValue: null,
    selectOptions: this.props.users.map(user => ({
      text: user.name,
      value: user.name,
    })),
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
      userName: event.target.textContent,
      submit: false,
      correctValue: event.target.textContent,
    });
  }

  submitForm = (event) => {
    const { title, userName } = this.state;

    if (title.trim() === '' && (userName === '' || userName === 'Choose a user' || userName === 'Please choose a user')) {
      this.setState({
        titleError: `Please enter the title`,
        submit: true,
      });

      return;
    }

    if (title.trim() === '') {
      this.setState({
        titleError: `Please enter the title`,
        submit: true,
      });

      return;
    }

    if (userName === '' || userName === 'Choose a user' || userName === 'Please choose a user') {
      this.setState({
        submit: true,
      });

      return;
    }

    event.target.reset();
    this.props.submitFunction(title, userName);
    this.setState({
      title: '',
      userName: '',
      titleError: null,
      correctValue: null,
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
        {
          this.state.submit ? (
            <Form.Select
              options={this.state.selectOptions}
              placeholder="Select user"
              value={null}
              onChange={this.usersSelectChange}
              error
            />
          ) : (
            <Form.Select
              options={this.state.selectOptions}
              placeholder="Select user"
              onChange={this.usersSelectChange}
              value={this.state.correctValue}
            />
          )
        }

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
