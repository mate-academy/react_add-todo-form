/* eslint-disable */
import React from 'react';

class NewToDo extends React.Component {
  state = {
    todoInput: '',
    selectedUserId: '',
  };

  preventDefault = (event) => {
    event.preventDefault();
  };

  inputHandle = (event) => {
    const { value } = event.target;
    this.setState({
      todoInput: value,
    });
  };

  selectHandle = (event) => {
    const userId = event.target.value;
    this.setState({
      selectedUserId: userId,
    });
  };
  
  clearForm = () => {
    this.setState({
      selectedUserId: 0,
      todoInput: ''
    })
  };

  saveTodo = () => {
    const { todoInput, selectedUserId } = this.state;
    const todo = {
      userId: Number(selectedUserId),
      title: todoInput,
      completed: false,
    };

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
          className="addTodoForm__title"
        >
          title
          <input
            id="title-input"
            type="text"
            value={this.state.todoInput}
            onChange={this.inputHandle}
          />
        </label>
        <label
          htmlFor="user-select"
          className="addTodoForm__user-select"
        >
          user
          <select
            id="user-select"
            value={this.state.selectedUserId}
            onChange={this.selectHandle}
          >
            <option value={0}> </option>
            {this.props.users.map(item => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <button type="submit" onClick={this.saveTodo}>Save</button>
      </form>
    );
  }
}

export default NewToDo;
