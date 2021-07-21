import React from 'react';
import PropTypes from 'prop-types';
import { InputForTitle } from './InputForTitle';
import { AddButton } from './AddButton';
import { SelectUser } from './SelectUser';
import './FormToAddTodo.css';

export default class FormToAddTodo extends React.Component {
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
  
  changeUserNameAndUserId = event => this.setState({
    userName: event.target.value,
    userId: (this.props.names.indexOf(event.target.value) + 1),
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
          id: this.props.todos.length + 1,
        },
      }),
      () => this.props.onSubmit(this.state.newTodo));
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
        <SelectUser
        names={this.props.names}
          valueForSelect={userName}
          onChange={this.changeUserNameAndUserId}
          selectValidation={selectValidation}
        />
        <AddButton />
      </form>
    );
  }
}

FormToAddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};
