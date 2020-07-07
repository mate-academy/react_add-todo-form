import React, { Component } from 'react';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { NamesShape } from '../../shapes/Shapes';
import { Error } from '../Error/Error';
import styles from './AddNewTodo.module.css';

const initialState = {
  input: {
    value: '',
    isValid: true,
  },
  select: {
    value: '',
    isValid: true,
  },
};

export class AddNewTodo extends Component {
  state = initialState;

  changeHandler = (name, text) => {
    this.setState(prevState => ({
      [name]: {
        value: text,
        isValid: true,
      },
    }));
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { select, input } = this.state;

    if (!input.value || !input.value.trim()) {
      return this.setState(prevState => ({
        input: {
          isValid: false,
        },
      }));
    }

    if (!select.value) {
      return this.setState(prevState => ({
        select: {
          isValid: false,
        },
      }));
    }

    this.props.addTodo({
      title: input.value, userId: select.value,
    });

    return this.setState(initialState);
  }

  render() {
    const { input, select } = this.state;
    const { names } = this.props;

    return (
      <form
        onSubmit={this.submitHandler}
        className={styles.form}
      >
        <div>
          {
            input.isValid
              ? null
              : <Error message="Please enter the title" />
          }
          <Input
            name="input"
            onChange={this.changeHandler}
            value={input.value}
          />
        </div>
        <div>
          {
            select.isValid
              ? null
              : <Error message="Please choose a user" />
          }
          <Select
            name="select"
            users={names}
            onChange={this.changeHandler}
            value={select.value}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

AddNewTodo.propTypes = NamesShape.isRequired;
