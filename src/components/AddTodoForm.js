import React from 'react';
import { AddTodoFormShape } from '../utils/Shapes';
import { InputArea } from './InputArea';
import { SelectArea } from './SelectArea';

export class AddTodoForm extends React.Component {
  state = {
    input: {
      value: '',
      flag: false,
      error: '',
    },
    select: {
      value: '',
      flag: false,
      error: '',
    },
  }

  handleInputChanges = ({ target: { name, value } }) => {
    let flagValue = false;
    const validatedValue = value.replace(/[^\w ]*/g, '');
    const isOnlySpaces = value.trim().length > 0;

    if (value !== '' && value !== '0' && isOnlySpaces) {
      flagValue = true;
    }

    return (
      this.setState({
        [name]: {
          value: validatedValue,
          flag: flagValue,
        },
      })
    );
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { input, select } = this.state;
    const { sendTodoData } = this.props;

    if (input.flag === false || select.flag === false) {
      if (input.flag === false && select.flag === false) {
        this.setState({
          input: {
            error: 'Please enter the title',
          },
          select: {
            error: 'Please choose a user',
          },
        });
      }

      if (select.flag === false) {
        this.setState({
          select: {
            error: 'Please choose a user',
          },
        });
      }

      if (input.flag === false) {
        this.setState({
          input: {
            error: 'Please enter the title',
          },
        });
      }

      return;
    }

    sendTodoData(input.value, select.value);

    this.setState({
      input: {
        value: '',
        flag: false,
        error: '',
      },
      select: {
        value: '',
        flag: false,
        error: '',
      },
    });

    this.props.selectOnChange('0');
  }

  render() {
    const { selectValue, selectOnChange, names } = this.props;
    const { value } = this.state.input;
    const inputError = this.state.input.error;
    const selectError = this.state.select.error;
    const onInputChange = this.handleInputChanges;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <InputArea
          inputError={inputError || ''}
          value={value || ''}
          onChange={onInputChange}
        />
        <SelectArea
          selectError={selectError || ''}
          options={names}
          selectValue={selectValue}
          onChange={selectOnChange}
          onActive={this.handleInputChanges}
        />
      </form>
    );
  }
}

AddTodoForm.propTypes = AddTodoFormShape.isRequired;
