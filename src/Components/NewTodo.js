import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './Form/TextInput';
import Select from './Form/Select';
import Checkbox from './Form/Checkbox';

class NewTodo extends Component {
  state = {
    userId: 0,
    title: '',
    completed: false,
    isValid: {
      display: false,
      title: false,
      userId: false,
    },
  }

  settings = {
    maxTitleLength: 60,
    pattern: /[^A_Za-z0-9.,!?:; ]/g,
  }

  errorTexts={
    title: 'Please enter the title',
    user: 'Please choose a user',
  }

  setTodoProp(key, value) {
    this.setValid(key, value);
    this.setState(state => ({
      ...state,
      [key]: value,
    }));
  }

  setValid(key, value) {
    if (key === 'title' && value.trim().length < 3) {
      return;
    }

    if (key === 'userId' && !Number(value)) {
      return;
    }

    this.setState(state => ({
      ...state,
      isValid: {
        ...state.isValid,
        [key]: true,
      },
    }));
  }

  handleFields = (field, value) => {
    if (typeof value === 'boolean') {
      this.setTodoProp(field, value);

      return;
    }

    const { pattern, maxTitleLength } = this.settings;
    let valueCleaned = value.replace(pattern, '').replace(/\s{2,}/g, ' ');

    if (valueCleaned.length > maxTitleLength) {
      valueCleaned = valueCleaned.slice(0, maxTitleLength);
    }

    this.setTodoProp(field, valueCleaned);
  };

  addNewTodo = (e) => {
    e.preventDefault();
    const { isValid } = this.state;

    this.setState(state => ({
      ...state,
      isValid: {
        ...state.isValid,
        display: true,
      },
    }));

    if (isValid.title && isValid.userId) {
      this.props.addNewTodo(this.state);
      this.resetState();
    }
  }

  resetState() {
    this.setState({
      userId: 0,
      title: '',
      completed: false,
      isValid: {
        display: false,
        title: false,
        userId: false,
      },
    });
  }

  render() {
    const { users } = this.props;
    const { userId, title, completed, isValid } = this.state;

    return (
      <form onSubmit={this.addNewTodo} className="todo__form">
        <TextInput
          header="New Todo"
          id="title"
          value={title}
          isValid={isValid}
          errorTexts={this.errorTexts.title}
          handler={this.handleFields}
        />

        <Select
          header="User"
          id="userId"
          value={userId}
          options={users}
          isValid={isValid}
          errorTexts={this.errorTexts.user}
          handler={this.handleFields}
        />

        <Checkbox
          header="Completed"
          id="completed"
          checked={completed}
          handler={this.handleFields}
        />

        <button type="submit" className="todo__button">Submit</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};

export default NewTodo;
