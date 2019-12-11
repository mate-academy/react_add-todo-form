import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    userId: null,
    id: 3,
    defaultOption: 0,
    selectEmpty: true,
    selectError: false,
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.selectEmpty) {
      this.setState({ selectError: true });
    } else {
      this.props.addTodo({
        title: this.state.inputValue,
        userId: +this.state.userId,
        id: this.state.id,
      });
      this.setState(state => ({
        id: state.id + 1,
        inputValue: '',
        defaultOption: 0,
        userId: null,
        selectEmpty: true,
      }));
    }
  }

  handleSelectChange = (event) => {
    this.setState({
      userId: event.target.value,
      defaultOption: +event.target.value,
      selectEmpty: false,
      selectError: false,
    });
  }

  render() {
    const { defaultOption, selectError, inputValue } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          inputValue={inputValue}
          handleInputChange={this.handleInputChange}
        />
        <Select
          defaultOption={defaultOption}
          handleSelectChange={this.handleSelectChange}
          users={users}
          error={selectError}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTodo;
