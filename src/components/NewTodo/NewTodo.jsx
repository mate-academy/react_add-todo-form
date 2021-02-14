import React from 'react';
import './NewTodo.css';
import { NewTodoType } from '../../types';

export class NewTodo extends React.Component {
  state = {
    title: '',
    user: '',
    titleError: false,
    userError: false,
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      titleError: false,
      userError: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, user } = this.state;

    if (!user) {
      this.setState({
        userError: true,
      });

      return;
    }

    if (!title.trim()) {
      this.setState({
        titleError: true,
      });

      return;
    }

    this.props.addTodos(title, user);

    this.setState({
      title: '',
      user: '',
    });
  }

  render() {
    const { title, user } = this.state;
    const { users } = this.props;

    return (
      <>
        <div className="ribbon" />
        <div className="wrapper">
          <h1>Let&apos;s get started.</h1>
          <form
            onSubmit={this.handleSubmit}
          >
            <div className="input">
              <div className="blockinput">
                <i className="icon-envelope-alt" />

                <input
                  type="text"
                  name="title"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={this.handleChange}
                />

                {this.state.titleError && (
                  <p className="errorMessage">
                    Please enter the title
                  </p>
                )}
              </div>

              <select
                className="select"
                name="user"
                value={user}
                onChange={this.handleChange}
              >
                <option value="">
                  Choose a user
                </option>
                {users.map(person => (
                  <option
                    key={person.id}
                    value={person.name}
                  >
                    {person.name}
                  </option>
                ))}
              </select>

              {this.state.userError && (
                <p className="errorMessage">
                  Please choose a user
                </p>
              )}
            </div>

            <button
              type="submit"
              className="button_add"
            >
              Add
            </button>
          </form>
        </div>
      </>
    );
  }
}

NewTodo.propTypes = NewTodoType;
