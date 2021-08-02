import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './TodoForm.css';
import { Form, Button } from 'react-bootstrap';

import ErrorModal from '../ErrorModal/ErrorModal';

export default class TodoForm extends Component {
  state = {
    userName: '',
    textareaInput: '',
    setError: '',
  }

  handleUserName = (event) => {
    this.setState({
      userName: event.target.value,
      setError: null,
    });
  }

  handleTitle = (event) => {
    this.setState({
      textareaInput: event.target.value,
      setError: null,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.userName.length === 0
      || this.state.textareaInput.trim().length === 0) {
      this.setState({
        setError: 'Please fill up all fields',
      });

      return;
    }

    this.props.onAdd(this.state.userName, this.state.textareaInput);
    this.setState({
      userName: '',
      textareaInput: '',
    });
  }

  render() {
    return (
      <div>
        <h2>Select a user</h2>
        <Form
          onSubmit={this.handleFormSubmit}
          className="form todo__form"
        >
          <Form.Group
            className="mb-6 todo__form-group"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Print title</Form.Label>
            <Form.Control
              value={this.state.textareaInput}
              name="textarea"
              onChange={this.handleTitle}
              as="textarea"
              rows={3}
              style={{
                height: '100px',
                width: '300px',
              }}
            />
            {
              this.state.setError
              && <ErrorModal error={this.state.setError} />
            }
          </Form.Group>

          <Form.Group
            className="mb-3 todo__form-group"
            controlId="formBasicPassword"
          >
            <Form.Select
              onChange={this.handleUserName}
              value={this.state.userName}
              name="select"
              style={{
                width: '300px',
              }}
            >
              <option value="0">Choose a user</option>
              {this.props.userList.map(({ userId, name }) => (
                <option
                  value={name}
                  key={userId}
                >
                  {name}
                </option>
              ))}
            </Form.Select>
            {
              this.state.setError
              && <ErrorModal error={this.state.setError} />
            }
          </Form.Group>
          <Form.Group className="mb-3 todo__form-group">
            <Button
              className="todo-form__submit"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

TodoForm.propTypes = {
  userList: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
