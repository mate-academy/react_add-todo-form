import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

export class AddTodoForm extends React.Component {
  state = {
    todoTitle: '',
    err: '',
    chosenUser: 0,
  }

  render() {
    return (
      <>
        <h1>Add todo form</h1>
        <div className="addTodoFormBlock">
          <input
            className="addTodoForm"
            value={this.state.todoTitle}
            onChange={
              (event) => {
                this.setState({ todoTitle: event.target.value });
              }
            }
            placeholder="What do you need to do?"
          />
          <button
            type="button"
            className="addTodoButton"
            onClick={this.props.addTodo(this)}
          >
            addTodo
          </button>
        </div>
        <div>
          <select
            value={this.state.chosenUser}
            onChange={
              ({ target }) => {
                this.setState({ chosenUser: +target.value });
              }
            }
          >
            <option
              key={0}
              value=""
            >
              choose the user
            </option>
            {users.map(user => (
              <option
                key={`u${user.id}`}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ErrBlock">
          <em>
            {this.state.err}
          </em>
        </div>
      </>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
