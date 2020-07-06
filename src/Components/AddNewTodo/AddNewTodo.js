import React, { Component } from 'react';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { NamesShape } from '../../shapes/Shapes';

export class AddNewTodo extends Component {
  state = {
    input: {
      value: '',
    },
    select: {
      value: 0,
    },
  }

  changeHandler = (name, text) => {
    this.setState({
      [name]: {
        value: text,
      },
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.addTodo({
      title: this.state.input.value, userId: this.state.select.value,
    });
  }

  render() {
    const { input, select } = this.state;
    const { names } = this.props;

    return (
      <form onSubmit={this.submitHandler}>
        <Input
          name="input"
          onChange={this.changeHandler}
          value={input.value}
        />
        <Select
          name="select"
          users={names}
          onChange={this.changeHandler}
          value={select.value}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

AddNewTodo.propTypes = NamesShape.isRequired;
