import React, { Component } from 'react';
import {
  Button,
  Form,
  GridColumn,
  GridRow,
  Input,
  Select,
} from 'semantic-ui-react';
import users from '../../api/users';

class NewTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      userId: null,
    };

    this.titleChanged = this.titleChanged.bind(this);
    this.submitted = this.submitted.bind(this);
    this.selectUser = this.selectUser.bind(this);
  }

  titleChanged(evt) {
    this.setState({
      title: evt.target.value,
    });
  }

  selectUser(evt, data) {
    this.setState({
      userId: data.value,
    });
  }

  submitted(evt) {
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
        </GridColumn>
      </GridRow>
    );
  }
}

export default NewTodo;
