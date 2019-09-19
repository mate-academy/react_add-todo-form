import React, { Component } from 'react';
import './NewTodo.css';

const initialState = {
  userId: {
    value: 0,
    error: '',
  },
  title: {
    value: '',
    error: '',
  },
};

class NewTodo extends Component {
  state = initialState;

  getFormValue() {
    return Object.entries(this.state)
      .reduce((acc, entry) => ({
        ...acc,
        [entry[0]]: entry[1].value,
      }), {});
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: {
        value,
        error: prevState[name].error,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { userId, title } = this.state;
    const { addTodo } = this.props;
    const formValue = this.getFormValue();

    this.validateInput();
    this.validateSelect();

    if (title.value && userId.value > 0) {
      addTodo(formValue);
      this.setState(initialState);
    }
  }

  validateInput = () => {
    this.setState(({ title }) => (
      (title.value !== '')
        ? {
          title: {
            value: title.value,
            error: '',
          },
        }
        : {
          title: {
            value: title.value,
            error: 'Field title is required',
          },
        }
    ));
  }

  validateSelect = () => {
    this.setState(({ userId }) => (
      (userId.value > 0)
        ? {
          userId: {
            value: userId.value,
            error: '',
          },
        }
        : {
          userId: {
            value: userId.value,
            error: 'Choose a user',
          },
        }
    ));
  }

  render() {
    const { userId, title } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="field">
          <label className="label">New Todo:</label>
          <div className="control has-icons-right">
            <input
              className={`input ${title.error ? 'is-danger' : ''}`}
              id="new_todo"
              type="text"
              name="title"
              placeholder="Add new todo"
              value={title.value}
              onChange={(event) => {
                this.handleChange(event);
                this.validateInput();
              }}
              onBlur={this.validateInput}
            />
            {title.error && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
          </div>
          {title.error && (
            <p className="help is-danger">{title.error}</p>
          )}
        </div>

        <div className="field">
          <div className="control">
            <div className={`select ${userId.error ? 'is-danger' : ''}`}>
              <select
                name="userId"
                value={userId.value}
                onChange={(e) => {
                  this.handleChange(e);
                  this.validateSelect();
                }}
                onBlur={this.validateSelect}
              >
                <option value={0}>Choose a user</option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {userId.error && (
            <p className="help is-danger">{userId.error}</p>
          )}
        </div>
        <button type="submit" className="button is-primary">Add Todo</button>
      </form>
    );
  }
}

export default NewTodo;
