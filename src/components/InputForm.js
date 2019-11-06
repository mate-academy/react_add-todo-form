import React from 'react';
import {
  Form, Input, Button, Select,
} from 'semantic-ui-react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      userValue: null,
      errorTask: null,
      errorUser: null,
      id: this.props.todos.length,
    };
  }

  inputChanged = (event) => {
    this.setState({
      task: event.target.value,
    });
  }

  personChanged = (event) => {
    this.setState({
      userValue: event.target.innerText,
    });
  }

  submitted = (event) => {
    event.preventDefault();
    if (this.state.task.trim() === '') {
      this.setState({
        errorTask: {
          content: 'Please enter the title',
        },
      });

      return;
    }

    if (this.state.userValue === null) {
      this.setState({
        errorUser: {
          content: 'Please choose a user',
        },
      });

      return;
    }

    const newTodo = {
      user: {
        name: this.state.userValue,
      },
      title: this.state.task,
      id: this.state.id + 1,
    };

    this.props.onSubmitted(newTodo);

    this.setState(prev => ({
      task: '',
      userValue: null,
      errorTask: null,
      errorUser: null,
      id: prev.id + 1,
    }));
  }

  render() {
    return (
      <Form>
        <Form.Input
          id="form-input-control"
          onChange={this.inputChanged}
          error={this.state.errorTask}
          control={Input}
          label="Task to do"
          placeholder="Type a task"
          value={this.state.task}
        />
        <Form.Field
          control={Select}
          error={this.state.errorUser}
          options={this.props.customMenu}
          label={{ children: 'Select user' }}
          placeholder="User"
          onChange={this.personChanged}
          value={this.state.userValue}
        />
        <Form.Field
          id="form-button-control-public"
          control={Button}
          content="Add task"
          onClick={this.submitted}
        />
      </Form>
    );
  }
}

export default InputForm;
