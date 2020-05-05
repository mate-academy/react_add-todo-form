import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import users from './api/users';
import TodoList from './TodoList';

class NewTodo extends React.Component {
  state = {
    ListOfUsers: [...this.props.item],
    newTitle: '',
    status: false,
    Id: 0,
    hasTitleError: false,
    hasNameError: false,
  }

  handlNamechange = (event) => {
    this.setState({
      hasTitleError: false,
      newTitle: event.target.value,
    });
  }

  handlStatuschange = () => {
    this.setState({
      status: true,
    });
  }

  handluserIdchange = (event) => {
    this.setState({
      hasNameError: false,
      Id: +event.target.value,
    });
  }

  handlFormSubmit = (event) => {
    event.preventDefault();

    if (!this.state.newTitle || !this.state.Id) {
      this.setState(item => ({
        hasTitleError: !item.newTitle,
        hasNameError: !item.Id,
      }));

      return;
    }

    this.setState((state) => {
      const newTodo = {
        userId: state.Id,
        id: +new Date(),
        title: state.newTitle,
        completed: state.status,
        user: users.find(user => user.id === this.state.Id),
      };

      return {
        ListOfUsers: [...state.ListOfUsers, newTodo],
        newTitle: '',
        status: false,
        Id: 0,
        hasTitleError: false,
        hasNameError: false,
      };
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handlFormSubmit}>
          Chose Title
          <input
            type="text"
            value={this.state.newTitle}
            onChange={this.handlNamechange}
          />
          {this.state.hasTitleError
            && (<span style={{ color: 'red' }}> Please put title</span>)}
          <br />
          Status
          <input
            type="checkbox"
            checked={this.state.status}
            onChange={this.handlStatuschange}
          />
          <br />
          Chose the name
          <select onChange={this.handluserIdchange} value={this.state.Id}>
            <option value="" hidden>Please Select a name</option>
            {users.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
          {this.state.hasNameError
            && (<span style={{ color: 'red' }}> Please Select a name </span>)}
          <br />
          <button type="submit">ADD</button>
        </form>

        <TodoList items={this.state.ListOfUsers} />
      </>
    );
  }
}

NewTodo.propTypes = {
  item: PropTypes.string.isRequired,
};

export default NewTodo;
