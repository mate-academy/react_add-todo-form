import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import users from './api/users';

class NewTodo extends React.Component {
  state = {
    newTitle: '',
    status: false,
    id: 0,
    hasTitleError: false,
    hasNameError: false,
  }

  handlNamechange = (event) => {
    this.setState({
      hasTitleError: false,
      newTitle: event.target.value.trim(),
    });
  }

  handlStatuschange = () => {
    this.setState(item => ({
      status: !item.status,
    }));
  }

  handluserIdchange = (event) => {
    this.setState({
      hasNameError: false,
      id: +event.target.value,
    });
  }

  handlFormSubmit = (event) => {
    event.preventDefault();

    if (!this.state.newTitle || !this.state.id) {
      this.setState(item => ({
        hasTitleError: !item.newTitle,
        hasNameError: !item.id,
      }));

      return;
    }

    this.setState((state) => {
      const newTodo = {
        userId: state.id,
        id: +new Date(),
        title: state.newTitle,
        completed: state.status,
        user: users.find(user => user.id === this.state.id),
      };

      this.props.addTodo(newTodo);

      return {
        newTitle: '',
        status: false,
        id: 0,
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
          <select onChange={this.handluserIdchange} value={this.state.id}>
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
      </>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
