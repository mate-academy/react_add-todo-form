import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class Form extends React.Component {
  state = {
    errors: {
      todo: null,
      personId: null,
    },
    todo: '',
    personId: 0,
  }

  handleValue = property => (event) => {
    this.setState({
      [property]: event.target.value,
      errors: {
        todo: null,
        personId: null,
      },
    });
  }

  handleSubmit= (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (prevState.todo === '') {
        return { errors: {
          todo: 'Please, add a task',
          personId: null,
        } };
      }

      if (prevState.personId === 0) {
        return { errors: {
          todo: null,
          personId: 'Please, choose a person',
        } };
      }

      const newTodo = {
        title: prevState.todo,
        userId: +prevState.personId,
      };

      this.props.onSubmit(newTodo);

      return ({
        errors: {
          todo: null,
          personId: null,
        },
        todo: '',
        personId: 0,
      });
    });
  }

  render() {
    return (
      <form name="newTodo" onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="todo">Write new Todo</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="todo"
              id="todo"
              value={this.state.todo}
              placeholder="new Todo"
              onChange={this.handleValue('todo')}
            />
          </div>
          <p className="help is-danger">{this.state.errors.todo}</p>
        </div>

        <div className="field">
          <label className="label" htmlFor="personId">Choose user</label>
          <div className="control">
            <div className="select">
              <select
                value={this.state.personId}
                name="personId"
                id="personId"
                onChange={this.handleValue('personId')}
              >
                <option disabled value={0}>Choose person</option>
                {users.map(
                  user => (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>
          <p className="help is-danger">{this.state.errors.personId}</p>
        </div>

        <button
          className="button is-success"
          type="submit"
        >
          Add new Todo
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
