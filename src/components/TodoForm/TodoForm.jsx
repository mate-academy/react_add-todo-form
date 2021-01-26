import React from 'react';
import PropTypes from 'prop-types';
import { userType } from '../Types/types';
import './TodoForm.scss';

export class TodoForm extends React.Component {
  state = {
    title: '',
    name: '',
    noTitle: false,
    noName: false,
  };

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }
  //
  // inputTitleField = (e) => {
  //   this.setState({
  //     title: e.target.value,
  //   });
  // };
  //
  // selectNameField = (e) => {
  //   this.setState({
  //     name: e.target.value,
  //   });
  // };

  addNewTodo = (e) => {
    e.preventDefault();
    const { title, name, noTitle, noName } = this.state;

    if (!title || !name) {
      this.setState({
        noTitle: !title,
        noName: !name,
      });

      return;
    }

    this.props.addNewTodo(title, name, noTitle, noName);
    this.setState({
      title: '',
      name: '',
      noTitle: false,
      noName: false,
    });
  }

  render() {
    const { users } = this.props;

    return (
      <form onSubmit={this.addNewTodo} className="form">

        <input
          className="field"
          type="text"
          placeholder="type a new todo"
          value={this.state.title}
          onChange={this.handleChange}
          name="title"
        />

        {this.state.noTitle && this.state.title === ''
          ? <span className="error">no todo, please write a new one</span>
          : ''}

        <select
          className="field"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option
              value={user.name}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {this.state.noName && this.state.name === ''
          ? <span className="error">no user, please select a new one</span>
          : ''}

        <button
          type="submit"
          className="btn"
        >
          <i className="material-icons">add</i>
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(userType).isRequired,
};
