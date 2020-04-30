import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './Form/TextInput';
import Select from './Form/Select';
import Checkbox from './Form/Checkbox';

class NewTodo extends Component {
  state={
    userId: 0,
    title: '',
    completed: false,
    isValid: {
      display: false,
      title: false,
      userId: false,
    },
    settings: {
      maxTitleLength: 60,
      pattern: /[^A_Za-z0-9.,:; ]/g,
    },
  }

  errorTexts={
    title: 'Please enter the title',
    user: 'Please choose a user',
  }

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
  };

  handleFields = (field, value) => {
    const { pattern, maxTitleLength } = this.state.settings;
    let valueCleaned = value.replace(pattern, '');

    if (valueCleaned.length > maxTitleLength) {
      valueCleaned = valueCleaned.slice(0, maxTitleLength);
    }

    this.setState(state => ({
      ...state,
      [field]: valueCleaned,
      isValid: {
        ...state.isValid,
        [field]: Boolean(valueCleaned),
      },
    }));
  };

  resetState = () => {
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
