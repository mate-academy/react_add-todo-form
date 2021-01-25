import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

export class Form extends React.Component {
  state = {
    errors: {
      todo: null,
      personId: null,
    },
    todo: '',
    personId: null,
  }

  handleValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {
        todo: null,
        personId: null,
      },
    });
  }

  handleSubmit= (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (prevState.todo === '') {
        return { errors: {
          todo: 'Please, add a task',
          personId: null,
        } };
      }

      if (prevState.personId === null) {
        return { errors: {
          todo: null,
          personId: 'Please, choose a person',
        } };
      }

      const newTodo = {
        title: prevState.todo,
        userId: +prevState.personId,
      };

      this.props.onSubmit(newTodo);

      return ({
        errors: {
          todo: null,
          personId: null,
        },
        todo: '',
        personId: null,
      });
    });
  }

  render() {
    const { errors, todo, personId } = this.state;

    return (
      <form name="newTodo" onSubmit={this.handleSubmit}>
        <Input
          onChange={this.handleValue}
          name="todo"
          id="todo"
          labelText="Write new Todo"
          value={todo}
          error={errors.todo}
        />

        <Select
          name="personId"
          id="personId"
          labelText="Choose a user"
          value={personId}
          onChange={this.handleValue}
          error={errors.personId}
        />

        <button
          className="button is-success"
          type="submit"
        >
          Add new Todo
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
