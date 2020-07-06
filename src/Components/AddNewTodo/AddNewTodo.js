import React, { Component } from 'react';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { NamesShape } from '../../shapes/Shapes';

export class AddNewTodo extends Component {
  state = {
    input: {
      value: '',
    },
  }

  changeHandler = (text) => {
    this.setState({
      input: {
        value: text,
      },
    });
  }

  render() {
    const { value } = this.state.input;
    const { names } = this.props;

    return (
      <form>
        <Input
          onChange={this.changeHandler}
          value={value}
        />
        <Select users={names} />
      </form>
    );
  }
}

AddNewTodo.propTypes = NamesShape.isRequired;
