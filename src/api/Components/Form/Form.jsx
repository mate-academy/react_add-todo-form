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
    todo: {
      title: '',
      name: 'Choose name',
      id: this.props.todosLength + 1,
    },
  }

  inputChange = (value) => {
    this.setState(prev => ({
      todo: {
        ...prev.todo,
        title: value,
      },
    }));
  }

  selectChange = (target) => {
    if (target.value !== 'Choose name') {
      this.setState(prev => ({
        ...prev,
        todo: {
          ...prev.todo,
          name: target.value,
        },
      }));
    }
  }

  handleSubmit = () => {
    this.setState(prev => ({
      isNameChoosen: (prev.todo.name === 'Choose name') && true,
      checkedLengthWord: (prev.todo.title.length === 0) && true,
    }));
    const { name, title } = this.state.todo;

    if (name !== 'Choose name' && title.length) {
      this.props.addNewPerson(this.state.todo);

      this.setState(prev => ({
        todo: {
          title: '',
          name: 'Choose name',
          id: prev.todo.id + 1,
        },
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
            onChange={({ target }) => this.inputChange(target.value)}
            value={this.state.todo.title}
          />
        </div>
        <Form.Select
          onChange={({ target }) => this.selectChange(target)}
          value={this.state.todo.name}
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
          isChoosen={this.state.isNameChoosen}
          titleLength={this.state.todo.title.length}
        />
      </Form>
    );
  }
}

MainForm.propTypes = FormPropTypes;
