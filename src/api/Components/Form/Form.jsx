import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Massege from '../Massege/Massege';
import users from '../../users';
import { FormPropTypes } from './FormPropTypes';

export class MainForm extends React.PureComponent {
  state = {
    checkedLengthWord: false,
    isNameChoosen: false,
    dataFromInput: {
      title: '',
      name: 'Choose name',
      id: this.props.todosLength + 1,
    },
  }

  inputChange = (value) => {
    this.setState(prev => ({
      dataFromInput: {
        ...prev.dataFromInput,
        title: value,
      },
    }));
  }

  selectChange = (target) => {
    if (target.value !== 'Choose name') {
      this.setState(prev => ({
        ...prev,
        dataFromInput: {
          ...prev.dataFromInput,
          name: target.value,
        },
      }));
    }
  }

  handleSubmit = () => {
    this.setState(prev => ({
      isNameChoosen: (prev.dataFromInput.name === 'Choose name') && true,
      checkedLengthWord: (prev.dataFromInput.title.length === 0) && true,
    }));
    const { name, title } = this.state.dataFromInput;

    if (name !== 'Choose name' && title.length) {
      this.props.addNewPerson(this.state.dataFromInput);

      this.setState(prev => ({
        dataFromInput: {
          title: '',
          name: 'Choose name',
          id: prev.dataFromInput.id + 1,
        },
      }));
    }
  };

  render() {
    return (
      <>
        <Form
          className="form"
          onSubmit={event => event.preventDefault()}
        >
          <div>
            <Form.Control
              maxLength="30"
              type="text"
              placeholder="Title (Max length : 30 characters)"
              onChange={({ target }) => this.inputChange(target.value)}
              value={this.state.dataFromInput.title}
            />
          </div>
          <Form.Select
            onChange={({ target }) => this.selectChange(target)}
            value={this.state.dataFromInput.name}
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
              onClick={this.handleSubmit}
              type="submit"
              variant="info"
              size="md"
              className="button"
            >
              Attempt
            </Button>
          </div>
          <Massege
            checkedLengthWord={this.state.checkedLengthWord}
            isChoosen={this.state.isNameChoosen}
            titleLength={this.state.dataFromInput.title.length}
          />
        </Form>
      </>
    );
  }
}

MainForm.propTypes = FormPropTypes;
