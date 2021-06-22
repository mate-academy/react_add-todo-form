import React from 'react';
import { shape } from 'prop-types';

import users from '../api/users';

export class AddTodoForm extends React.Component {
  state = {
    todoTitle: '',
    err: '',
    chosenUser: 0,
  }

  addTodo = () => {
    if (!this.state.todoTitle) {
      this.setState({ err: 'You can\'t create todo without title' });

      return;
    }

    if (!this.state.chosenUser) {
      this.setState({ err: 'Choose the user' });

      return;
    }

    this.props.addTodo({
      title: this.state.todoTitle,
      id: this.props.nextTodoId,
      user: users.find(user => +this.state.chosenUser === user.id),
    });

    this.setState({
      todoTitle: '',
      err: '',
    });
  };

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
            onClick={this.addTodo}
          >
            addTodo
          </button>
        </div>
        <div>
          <select
            value={this.state.chosenUser}
            onChange={
              ({ target }) => {
                this.setState({ chosenUser: target.value });
              }
            }
          >
            <option
              value=""
            >
              choose the user
            </option>
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
  app: shape().isRequired,
};
