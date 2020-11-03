import React from 'react';
import { FormShape } from './FormShape';
import './Form.css';
import { Input } from '../Input';
import { Select } from '../Select';

const initialState = {
  title: '',
  name: '',
  errorTitle: '',
  errorName: '',
};

export class Form extends React.PureComponent {
  state = initialState;

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.replace(/[^\w\s]/, ''),
      errorTitle: '',
      errorName: '',
    });
  };

  validate = () => {
    const { title, name } = this.state;

    if (!title) {
      this.setState({ errorTitle: 'Please enter the title' });

      return false;
    }

    if (!name) {
      this.setState({ errorName: 'Please choose a user' });

      return false;
    }

    return true;
  }

  handleSubmit = (event) => {
    const { addTodo, users, todosList } = this.props;
    const { title, name } = this.state;

    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      const selectedUser = users.find(person => person.name === name);
      const newTodo = {
        title,
        user: selectedUser,
        userId: selectedUser.id,
        id: todosList.length + 1,
        completed: false,
      };

      addTodo(newTodo);
      this.setState(initialState);
    }
  }

  render() {
    const { users } = this.props;
    const { title, name, errorTitle, errorName } = this.state;

    return (
      <form
        className="App__form"
        onSubmit={this.handleSubmit}
      >

        <Input
          title={title}
          callback={this.handleChange}
          error={errorTitle}
        />
        <Select
          name={name}
          callback={this.handleChange}
          error={errorName}
          users={users}
        />

        <button type="submit" className="App__button">
          Add task!
        </button>
      </form>
    );
  }
}

Form.propTypes = FormShape;
