import React, { Component } from 'react';
import {
  Button,
  Form,
  GridColumn,
  GridRow,
  Input, Message,
  Select,
} from 'semantic-ui-react';
import users from '../../api/users';

class NewTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      userId: null,
      error: null,
    };

    this.titleChanged = this.titleChanged.bind(this);
    this.submitted = this.submitted.bind(this);
    this.selectUser = this.selectUser.bind(this);
  }

  titleChanged(evt) {
    this.setState({
      title: evt.target.value,
      error: null,
    });
  }

  selectUser(evt, data) {
    this.setState({
      userId: data.value,
      error: null,
    });
  }

  submitted(evt) {
    if (this.state.title === '' || this.state.userId === null) {
      this.setState({
        error: 'NOT_FILLED',
      });

      return;
    }

    this.props.onFormSubmit(this.state.title, this.state.userId);
    this.setState({
      title: '',
      userId: null,
    });
  }

  render() {
    const options = users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
    }));
    const { error } = this.state;

    return (
      <GridRow>
        <GridColumn>
          <Form onSubmit={this.submitted}>
            <Input
              type="text"
              placeholder="What do you want to do?"
              action
              fluid
              size="huge"
              value={this.state.title}
              onChange={this.titleChanged}
            >
              <input />
              <Select
                compact
                options={options}
                placeholder="Select user"
                onChange={this.selectUser}
                value={this.state.userId}
              />
              <Button
                type="submit"
              >
                Add task
              </Button>
            </Input>
          </Form>
          {error && (
            <Message
              floating
              negative
              content="All fields are required to fill"
            />
          )}
        </GridColumn>
      </GridRow>
    );
  }
}

export default NewTodo;
