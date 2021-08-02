import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Message from '../Message/Message';
import users from '../../users';
import { FormPropTypes } from './FormPropTypes';

export class MainForm extends React.PureComponent {
  state = {
    checkedLengthWord: false,
    isNameChoosen: false,
    title: '',
    name: 'Choose name',
  }

  onInputChange = (value) => {
    this.setState({ title: value });
  }

  onSelectChange = (target) => {
    if (target.value !== 'Choose name') {
      this.setState({ name: target.value });
    }
  }

  handleSubmit = () => {
    this.setState(prev => ({
      isNameChoosen: (prev.name === 'Choose name'),
      checkedLengthWord: (prev.title.length === 0),
    }));
    const { name, title } = this.state;

    if (name !== 'Choose name' && title.length) {
      const todo = {
        title, name, id: this.props.todosLength + 1,
      };

      this.props.addNewTodo(todo);

      this.setState(prev => ({
        title: '',
        name: 'Choose name',
        id: prev.id + 1,
      }));
    }
  };

  render() {
    return (
      <Form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          this.handleSubmit();
        }}
      >
        <div>
          <Form.Control
            maxLength="30"
            type="text"
            placeholder="Title (Max length : 30 characters)"
            onChange={({ target }) => this.onInputChange(target.value)}
            value={this.state.title}
          />
        </div>
        <Form.Select
          onChange={({ target }) => this.onSelectChange(target)}
          value={this.state.name}
        >
          <option>Choose name</option>
          {users.map(item => (
            <option
              key={item.id}
            >
              {item.name}
            </option>
          ))}
        </Form.Select>
        <div>
          <Button
            type="submit"
            variant="info"
            size="md"
            className="button"
          >
            Attempt
          </Button>
        </div>
        <Message
          checkedLengthWord={this.state.checkedLengthWord}
          isItChoosen={this.state.isNameChoosen}
          titleLength={this.state.title.length}
        />
      </Form>
    );
  }
}

MainForm.propTypes = FormPropTypes;
