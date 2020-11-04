import React from 'react';
import { TodoFormInput } from '../TodoFormInput';
import { Select } from '../Select';

import './TodoForm.scss';
import { TodoFormShape } from '../../shapes/TodoFormShape';

export class TodoForm extends React.Component {
  state = {
    title: '',
    name: '',
    errorText: '',
    errorSelect: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  validate = () => {
    let errorText = '';
    let errorSelect = '';

    if (!this.state.title) {
      errorText = 'Please enter the title';
    }

    if (!this.state.name) {
      errorSelect = 'Please choose a user';
    }

    if (errorText || errorSelect) {
      this.setState({
        errorText, errorSelect,
      });

      return false;
    }

    return true;
  }

  onAdd = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    const { name, title } = this.state;
    const { addTask } = this.props;

    if (isValid) {
      addTask(title, name);
      this.setState({
        title: '',
        name: '',
        errorText: '',
        errorSelect: '',
      });
    }
  }

  render() {
    const { users } = this.props;
    const {
      title,
      name,
      errorText,
      errorSelect,
    } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.onAdd}
        >
          <TodoFormInput
            title={title}
            handleChange={this.handleChange}
            errorText={errorText}
          />

          <Select
            users={users}
            name={name}
            handleChange={this.handleChange}
            errorSelect={errorSelect}
          />

          <button
            type="submit"
            className="form__add-button"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

TodoForm.propTypes = TodoFormShape;
