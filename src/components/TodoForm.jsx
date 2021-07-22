import React from 'react';
import PropTypes from 'prop-types';
import { InputForTitle } from './InputForTitle';
import { AddButton } from './AddButton';
import { Select } from './SelectUser';
import './FormToAddTodo.css';

export default class TodoForm extends React.Component {
  state = {
    todoTitle: '',
    userName: '',
    inputValidation: false,
    selectValidation: false,
    userId: 0,
    newTodo: null,
  }

  changeTodoTitle = event => this.setState({
    todoTitle: event.target.value.replace(/[^\w\s]/g, ''),
    inputValidation: (event.target.value.length < 0),
  })
  
  changeUserName = event => this.setState({
    userName: event.target.value,
    selectValidation: (event.target.value.length < 0),
  })

  makeNewTodo = (event) => {
    event.preventDefault();

    if(this.state.userName && this.state.todoTitle) { 

      this.setState(prevState => ({
        todoTitle: '',
        userName: '',
        inputValidation: false,
        selectValidation: false,
        newTodo: {
          name: prevState.userName,
          title: prevState.todoTitle,
          completed: false,
          userId: prevState.userId,
          id: this.props.todos + 1,
        },
      }),
      () => this.props.addTodo(this.state.newTodo));
    }
  
    if(!this.state.userName) {
      this.setState({
        selectValidation: true,
      });
    }
  
    if(!this.state.todoTitle) {
      this.setState({
        inputValidation: true,
      });
    }
  }

  render() {
    const {
      todoTitle,
      userName,
      inputValidation,
      selectValidation,
    } = this.state

    return (
      <form
        className="add-form"
        onSubmit={this.makeNewTodo}
      >
        <InputForTitle
          onChange={this.changeTodoTitle}
          value={todoTitle}
          inputValidation={inputValidation}
        />
        <Select
          names={this.props.names}
          value={userName}
          onChange={this.changeUserName}
          selectValidation={selectValidation}
        />
        <AddButton />
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  names: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
