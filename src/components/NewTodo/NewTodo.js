import React from 'react';
import users from '../../api/users';
import './NewTodo.css';
import { ShapeNewTodo } from '../Shapes';

export class NewTodo extends React.Component {
  state = {
    tempTodo: '',
    tempUser: {},
    initIndex: '0',
    isTitleValid: true,
    isUserSelected: true,
  }

  handleInput = (event) => {
    this.setState({
      tempTodo: event.target.value.replace(/[^\w\s]|^\s+$/g, ''),
      isTitleValid: true,
    });
  }

  handleUserAdd = (event) => {
    if (event.target.selectedIndex === 0) {
      this.setState({
        isUserSelected: true,
      });
    } else {
      const { value } = event.target.options[event.target.selectedIndex];
      const currentUser = users.find(user => user.name === value);

      this.setState({
        tempUser: currentUser,
        initIndex: value,
        isUserSelected: currentUser !== undefined,
      });
    }
  }

  handleNewTodo = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (prevState.tempTodo.length === 0) {
        return {
          isTitleValid: false,
        };
      }

      if ((typeof prevState.tempUser === 'object'
      && Object.keys(prevState.tempUser).length === 0)
      || prevState.tempUser === undefined) {
        return {
          isUserSelected: false,
        };
      }

      const newItem = {
        userId: prevState.tempUser.id,
        id: this.props.todoList.length + 1,
        title: prevState.tempTodo,
        completed: false,
        user: prevState.tempUser,
      };

      this.props.addTodo(newItem);

      return {
        tempTodo: '',
        initIndex: '',
        tempUser: {},
        isUserSelected: true,
        isTitleValid: true,
      };
    });
  };

  render() {
    const titleErrorMessage = this.state.isTitleValid
      ? '' : 'Please enter the title';
    const userSelectErrorMessage = this.state.isUserSelected
      ? '' : 'Please choose a user';

    return (
      <form onSubmit={this.handleNewTodo}>
        <label>
          <h3>New ToDo:</h3>
          <input
            className={(this.state.isTitleValid)
              ? 'input' : 'input input--error'}
            type="text"
            value={this.state.tempTodo}
            placeholder="New todo"
            onChange={this.handleInput}
          />
          <div className="error">{titleErrorMessage}</div>
        </label>
        <label>
          <h3>Select User:</h3>
          <select
            className={(this.state.isUserSelected)
              ? 'select' : 'select select--error'}
            value={this.state.initIndex}
            onChange={this.handleUserAdd}
          >
            <>
              <option>Select User</option>
              {users.map(user => (
                <option
                  key={user.name}
                >
                  {user.name}
                </option>
              ))}
            </>
          </select>
          <div className="error">{userSelectErrorMessage}</div>
        </label>
        <br />
        <button
          className="button"
          type="submit"
        >
          Add Todo
        </button>
        <br />
      </form>
    );
  }
}

NewTodo.propTypes = ShapeNewTodo;
