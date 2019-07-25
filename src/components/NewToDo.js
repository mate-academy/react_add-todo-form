/* eslint-disable */
import React from 'react';

class NewToDo extends React.Component {
  state = {
    todoInput: '',
    selectedUserId: '',
    errorTitle: false,
    errorSelect: false,
  };

  preventDefault = (event) => {
    event.preventDefault();
  };

  inputHandle = (event) => {
    const { value } = event.target;
    this.setState({
      todoInput: value,
    });
    if(value !== ''){
      this.setState({
        errorTitle: false,
      })
    }
  };

  selectHandle = (event) => {
    const userId = event.target.value;
    this.setState({
      selectedUserId: userId,
    });
    if(userId !== 0 || userId !== ''){
      this.setState({
        errorSelect: false,
      })
    }
  };
  
  clearForm = () => {
    this.setState({
      selectedUserId: 0,
      todoInput: ''
    })
  };
  
  checkIfFillForm = () => {
    const { todoInput, selectedUserId } = this.state;
    switch (true) {
      case todoInput === '' && selectedUserId === '':
        this.setState({
          errorTitle: true,
          errorSelect: true,
        });
        break;
      case todoInput === '':
        this.setState({
          errorTitle: true,
        });
        break;
      case selectedUserId === '':
        this.setState({
          errorSelect: true,
        });
        break;
      default: this.saveTodo()
    }
  };

  saveTodo = () => {
    const { todoInput, selectedUserId } = this.state;
    const todo = {
      userId: Number(selectedUserId),
      title: todoInput,
      completed: false,
    };
    this.setState({
      errorTitle: false,
      errorSelect: false,
    });
    this.props.addUserAndTodo(todo);
    this.clearForm();
  };

  render() {
    return (
      <form
        className="addTodoForm"
        onSubmit={this.preventDefault}
      >
        <label
          htmlFor="title-input"
          className={this.state.errorTitle !== true
          ? 'addTodoForm__label'
          : 'error-label'}
        >
          Enter title
        </label>
          <input
            id="title-input"
            className={this.state.errorTitle !== true
              ? 'addTodoForm__title'
              : 'error-input'}
            type="text"
            value={this.state.todoInput}
            onChange={this.inputHandle}
          />
        <label
          htmlFor="user-select"
          className={this.state.errorSelect !== true
            ? 'addTodoForm__label'
            : 'error-label'}
        >
          Select user
        </label>
          <select
            id="user-select"
            className={this.state.errorSelect !== true
              ? 'addTodoForm__user-select'
              : 'error-input'}
            value={this.state.selectedUserId}
            onChange={this.selectHandle}
          >
            <option value={''}> </option>
            {this.props.users.map(item => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        <button type="submit" onClick={this.checkIfFillForm}>Save</button>
      </form>
    );
  }
}

export default NewToDo;
